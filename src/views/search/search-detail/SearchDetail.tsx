import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { searchDetail } from '@/api/search';
import type { Navigation } from '@/types/index';
import ScrollRefresh from '@/components/scroll-refresh/ScrollRefresh';
import styles from './search-detail.css';

type Props = {
  keyword: string;
};

type MovieItemType = {
  id: number;
  poster: string;
  title: string;
  category: string;
  year: number;
  genres: string;
  countries: string;
  rating: string;
};
type ActorItemType = {
  id: number;
  avatar: string;
  name: string;
  name_en: string;
  gender: string;
};
type RoleItemType = {
  id: number;
  avatar: string;
  name: string;
  name_en: string;
};

function SearchDetail(props: Props): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const [sort, setSort] = useState({
    active: 'movie',
    list: [
      {
        title: '影视',
        type: 'movie'
      },
      {
        title: '影人',
        type: 'actor'
      },
      {
        title: '角色',
        type: 'role'
      }
    ]
  });

  const toggleSort = (value: string): void => {
    setSort({ ...sort, active: value });
  };

  // 电影项
  const MovieItem = ({ item }: { item: MovieItemType }) => (
    <Pressable onPress={() => navigation.push('MovieDetail', { id: item.id })}>
      <View style={styles.item}>
        {item.poster && (
          <Image
            source={{ uri: item.poster }}
            resizeMode={'stretch'}
            style={[styles.itemImage]}
          />
        )}
        <View style={styles.itemInfo}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemTitle}>
            {item.title}
          </Text>
          <View style={styles.itemTag}>
            {item?.category && item?.category !== '电影' && (
              <Text style={styles.tag}>{item?.category}</Text>
            )}
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.itemText}
            >
              {item.year}
            </Text>
          </View>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.genres}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.countries}
          </Text>
        </View>
        {Number(item?.rating) > 0 && (
          <Text style={styles.itemRating}>
            <Text style={styles.itemRatingWeight}>{item?.rating}</Text> 分
          </Text>
        )}
      </View>
    </Pressable>
  );

  // 影人项
  const ActorItem = ({ item }: { item: ActorItemType }) => (
    <Pressable onPress={() => navigation.push('ActorDetail', { id: item.id })}>
      <View style={styles.item}>
        {item.avatar && (
          <Image
            source={{ uri: item.avatar }}
            resizeMode={'stretch'}
            style={[styles.itemImage]}
          />
        )}
        <View style={styles.itemInfo}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemTitle}>
            {item.name}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.name_en}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.gender}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  // 角色项
  const RoleItem = ({ item }: { item: RoleItemType }) => (
    <Pressable onPress={() => navigation.push('RoleDetail', { id: item.id })}>
      <View style={styles.item}>
        {item.avatar && (
          <Image
            source={{ uri: item.avatar }}
            resizeMode={'stretch'}
            style={[styles.itemImage]}
          />
        )}
        <View style={styles.itemInfo}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemTitle}>
            {item.name}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.name_en}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  // 无数据模板
  const ListEmptyComponent = (): React.ReactElement => (
    <View style={styles.emptyData}>
      <Text style={styles.emptyDataText}>未找到相关内容</Text>
    </View>
  );

  return (
    <View style={styles.page}>
      <View style={styles.tab}>
        {sort.list.map((item, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => toggleSort(item.type)}
              style={styles.tabItem}
            >
              <Text style={styles.tabItemText}>{item.title}</Text>
              <View
                style={item.type === sort.active ? styles.tabActiveLine : null}
              />
            </Pressable>
          );
        })}
      </View>
      <ScrollRefresh
        requestParams={{
          page: 1,
          pageSize: 10,
          keyword: props.keyword,
          type: sort.active
        }}
        sortParams={{ type: sort.active }}
        request={searchDetail}
        renderItem={({ item }: { item: unknown }) => {
          if (sort.active === 'movie') {
            return <MovieItem item={item as MovieItemType} />;
          }
          if (sort.active === 'actor') {
            return <ActorItem item={item as ActorItemType} />;
          }
          if (sort.active === 'role') {
            return <RoleItem item={item as RoleItemType} />;
          }

          return null;
        }}
        initialNumToRender={6}
        ListEmptyComponent={<ListEmptyComponent />}
      />
    </View>
  );
}

export default SearchDetail;
