import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { movieCategories } from '@/api/movies';
import type { ResponseType } from '@/types/index';
import NavGroup from '../nav-group/NavGroup';

type Props = {
  onChange: (categoryParams: CategoryParams) => void;
};

type Category = {
  categories: {
    name: string;
    children: {
      name: never;
    }[];
  }[];
  genres: { name: string }[];
  countries: { name: string }[];
  years: { name: string }[];
};

type CategoryParams = {
  category: string;
  genre: string;
  country: string;
  year: string;
};

function Nav(props: Props): React.ReactElement {
  const [category, setCategory] = useState<Category>({
    categories: [],
    genres: [],
    countries: [],
    years: []
  });

  const getMovieCategories = () => {
    movieCategories()
      .then((res: ResponseType<Category>) => {
        if (res.code === 200) {
          res.data?.countries.unshift({ name: '全部' });
          res.data?.years.unshift({ name: '全部' });

          setCategory({
            categories: res.data?.categories || [],
            genres: [],
            countries: res.data?.countries || [],
            years: res.data?.years || []
          });
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getMovieCategories();
  }, []);

  // 初始化第二分类
  useEffect(() => {
    if (!category?.categories) {
      return;
    }

    const genres: Category['genres'] = handlerGroup('全部');

    setCategory({ ...category, genres });
  }, [category?.categories]);

  const [categoryParams, setCategoryParams] = useState<CategoryParams>({
    category: '全部',
    genre: '全部',
    country: '全部',
    year: '全部'
  });

  const navChange = (group: string, name: string) => {
    if (group === 'category') {
      const genres: Category['genres'] = handlerGroup(name);

      setCategory({ ...category, genres });
      setCategoryParams({ ...categoryParams, category: name, genre: '全部' });
      return;
    }

    setCategoryParams({ ...categoryParams, [group]: name });

    props.onChange({ ...categoryParams, [group]: name });
  };

  function handlerGroup(name: string): Category['genres'] {
    const genres: Category['genres'] = [];

    genres.unshift({ name: '全部' });

    category?.categories?.forEach(item => {
      if (name === '全部') {
        item?.children.forEach(i => {
          if (!genres.includes(i.name)) {
            genres.push({ name: i.name });
          }
        });

        return false;
      }

      if (name === item.name) {
        item?.children.forEach(i => {
          genres.push({ name: i.name });
        });
      }
    });

    return genres;
  }

  return (
    <View style={styles.nav}>
      <NavGroup
        group={'category'}
        category={category.categories}
        active={categoryParams.category}
        onChange={navChange}
      />
      <NavGroup
        group={'genre'}
        category={category.genres}
        active={categoryParams.genre}
        onChange={navChange}
      />
      <NavGroup
        group={'country'}
        category={category.countries}
        active={categoryParams.country}
        onChange={navChange}
      />
      <NavGroup
        group={'year'}
        category={category.years}
        active={categoryParams.year}
        onChange={navChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    paddingTop: 10,
    backgroundColor: '#fff'
  }
});

export default Nav;
