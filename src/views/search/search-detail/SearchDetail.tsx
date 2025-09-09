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

type MovieItem = {
  id: number;
  poster: string;
  title: string;
  category: string;
  year: number;
  genres: string;
  countries: string;
  rating: string;
};
type ActorItem = {
  id: number;
  avatar: string;
  name: string;
  name_en: string;
  gender: string;
};
type RoleItem = {
  id: number;
  avatar: string;
  name: string;
  name_en: string;
};

function SearchDetail(props: Props): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const [params, setParams] = useState({
    type: 'movie',
    page: 1,
    per_page: 10
  });

  const [tabs] = useState([
    { title: '影视', type: 'movie' },
    { title: '影人', type: 'actor' },
    { title: '角色', type: 'role' }
  ]);

  const handleTabChange = (value: string) => {
    setParams({ ...params, type: value });
  };

  const MovieItem = ({ item }: { item: MovieItem }) => (
    <Pressable onPress={() => navigation.push('MovieDetail', { id: item.id })}>
      <View style={styles.item}>
        <Image resizeMode="stretch" source={{ uri: item.poster }} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.itemTitle}>
            {item.title}
          </Text>
          <View style={styles.itemTag}>
            {item.category && item.category !== '电影' && (
              <Text style={styles.tag}>{item.category}</Text>
            )}
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.itemText}>
              {item.year}
            </Text>
          </View>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.itemText}>
            {item.genres}
          </Text>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.itemText}>
            {item.countries}
          </Text>
        </View>
        {Boolean(item.rating) && (
          <View style={styles.itemRating}>
            <Text style={styles.ratingWeight}>{item.rating}</Text>
            <Text style={styles.ratingText}>分</Text>
          </View>
        )}
      </View>
    </Pressable>
  );

  const ActorItem = ({ item }: { item: ActorItem }) => (
    <Pressable onPress={() => navigation.push('ActorDetail', { id: item.id })}>
      <View style={styles.item}>
        <Image resizeMode="stretch" source={{ uri: item.avatar }} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.itemTitle}>
            {item.name}
          </Text>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.itemText}>
            {item.name_en}
          </Text>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.itemText}>
            {item.gender}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  const RoleItem = ({ item }: { item: RoleItem }) => (
    <Pressable onPress={() => navigation.push('RoleDetail', { id: item.id })}>
      <View style={styles.item}>
        <Image resizeMode="stretch" source={{ uri: item.avatar }} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.itemTitle}>
            {item.name}
          </Text>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.itemText}>
            {item.name_en}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  const ListEmptyComponent = (): React.ReactElement => (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>未找到相关内容</Text>
    </View>
  );

  return (
    <View style={styles.searchDetail}>
      <View style={styles.tabs}>
        {tabs.map?.((item, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => handleTabChange(item.type)}
              style={styles.tabItem}
            >
              <Text style={styles.tabText}>{item.title}</Text>
              <View style={params.type === item.type ? styles.tabActiveLine : null} />
            </Pressable>
          );
        })}
      </View>
      <ScrollRefresh
        initialNumToRender={10}
        params={{
          keyword: props.keyword,
          type: params.type,
          page: params.page,
          pageSize: params.per_page
        }}
        sortParams={{ type: params.type }}
        request={searchDetail}
        renderItem={({ item }) => {
          // 影视
          if (params.type === 'movie') {
            return <MovieItem item={item} />;
          }
          // 影人
          if (params.type === 'actor') {
            return <ActorItem item={item} />;
          }
          // 角色
          if (params.type === 'role') {
            return <RoleItem item={item} />;
          }

          return null;
        }}
        ListEmptyComponent={<ListEmptyComponent />}
      />
    </View>
  );
}

export default SearchDetail;
