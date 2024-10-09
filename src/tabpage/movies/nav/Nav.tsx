import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { movieCategories } from '@/api/movies';
import type { ResponseType } from '@/types/index';
import NavGroup from '../nav-group/NavGroup';

type Props = {
  onChange: (categoryParams: CategoryParams) => void;
};

type CategoryParams = {
  category: string;
  genre: string;
  country: string;
  year: string;
};

type Category = {
  categories: {
    name: string;
    children?: {
      name: never;
    }[];
  }[];
  genres: { name: string }[];
  countries: { name: string }[];
  years: { name: string }[];
};

function Nav(props: Props): React.ReactElement {
  const [category, setCategory] = useState<Partial<Category>>({});

  const getMovieCategories = (): void => {
    movieCategories()
      .then((res: ResponseType<Category>) => {
        if (res?.code !== 200) {
          return;
        }

        res.data?.categories?.unshift({ name: '全部' });
        res.data?.countries?.unshift({ name: '全部' });
        res.data?.years?.unshift({ name: '全部' });

        setCategory({
          categories: res.data?.categories ?? [],
          genres: [],
          countries: res.data?.countries ?? [],
          years: res.data?.years ?? []
        });
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getMovieCategories();
  }, []);

  const handlerGroup = (name: string): Category['genres'] => {
    const genres: Category['genres'] = [{ name: '全部' }];

    category.categories?.forEach?.(item => {
      if (name === '全部') {
        item.children?.forEach?.(i => {
          if (!genres.includes(i.name)) {
            genres.push({ name: i.name });
          }
        });

        return;
      }

      if (name === item.name) {
        item.children?.forEach?.(i => genres.push({ name: i.name }));
      }
    });

    return genres;
  };

  // 初始化第二分类
  useEffect(() => {
    if (!category.categories) {
      return;
    }

    const genres = handlerGroup('全部');

    setCategory({ ...category, genres });
  }, [category.categories]);

  const [categoryParams, setCategoryParams] = useState<CategoryParams>({
    category: '全部',
    genre: '全部',
    country: '全部',
    year: '全部'
  });

  const navChange = (group: string, name: string): void => {
    if (group === 'category') {
      const genres: Category['genres'] = handlerGroup(name);

      setCategory({ ...category, genres });
      setCategoryParams({ ...categoryParams, category: name, genre: '全部' });
      props.onChange({ ...categoryParams, category: name, genre: '全部' });
      return;
    }

    setCategoryParams({ ...categoryParams, [group]: name });
    props.onChange({ ...categoryParams, [group]: name });
  };

  return (
    <View style={styles.nav}>
      {category.categories && category.categories.length !== 0 && (
        <NavGroup
          group={'category'}
          active={categoryParams.category}
          list={category.categories}
          onChange={navChange}
        />
      )}
      {category.genres && category.genres.length !== 0 && (
        <NavGroup
          group={'genre'}
          active={categoryParams.genre}
          list={category.genres}
          onChange={navChange}
        />
      )}
      {category.countries && category.countries.length !== 0 && (
        <NavGroup
          group={'country'}
          active={categoryParams.country}
          list={category.countries}
          onChange={navChange}
        />
      )}
      {category.years && category.years.length !== 0 && (
        <NavGroup
          group={'year'}
          active={categoryParams.year}
          list={category.years}
          onChange={navChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    paddingTop: 10,
    paddingLeft: 10,
    backgroundColor: '#ffffff'
  }
});

export default Nav;
