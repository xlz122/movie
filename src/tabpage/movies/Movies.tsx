import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { moviesList } from '@/api/movies';
import type { ListRenderItemInfo } from 'react-native';
import type { Navigation } from '@/types/index';
import Nav from './nav/Nav';
import ScrollRefresh from '@/components/scroll-refresh/ScrollRefresh';

type ItemType = {
  id: number;
  poster: string;
  episode_count: number;
  rating: number;
  title: string;
};

function Movies(): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const [params, setParams] = useState({
    category: '全部',
    genre: '全部',
    country: '全部',
    year: '全部'
  });

  const timer = useRef<NodeJS.Timeout>();

  const handleNavChange = (categoryParams: typeof params): void => {
    timer.current && clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setParams({ ...params, ...categoryParams });
    }, 500);
  };

  useEffect(() => {
    return () => timer.current && clearTimeout(timer.current);
  }, []);

  const renderItem = ({ item }: ListRenderItemInfo<ItemType>) => (
    <Pressable onPress={() => navigation.push('MovieDetail', { id: item.id })}>
      <View style={styles.item}>
        <Image
          source={{ uri: item.poster }}
          resizeMode="stretch"
          style={styles.itemImage}
        />
        {Number(item.episode_count) > 0 && (
          <Text style={styles.itemEpisode}>全{item.episode_count}集</Text>
        )}
        {Number(item.rating) > 0 && (
          <Text style={styles.itemRating}>{item.rating}</Text>
        )}
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
          {item.title}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.page}>
      <Nav onChange={handleNavChange} />
      <ScrollRefresh
        initialNumToRender={15}
        requestParams={{
          category: params.category,
          genre: params.genre,
          country: params.country,
          year: params.year,
          page: 1,
          pageSize: Math.floor(Dimensions.get('window').width / 104) * 5
        }}
        sortParams={{
          category: params.category,
          genre: params.genre,
          country: params.country,
          year: params.year
        }}
        request={moviesList}
        renderItem={renderItem}
        numColumns={Math.floor(Dimensions.get('window').width / 104)}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        listStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff'
  },
  list: {
    flexGrow: 1,
    paddingTop: 10,
    marginHorizontal: 10
  },
  item: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    width: 104,
    paddingBottom: 10
  },
  itemImage: {
    width: 104,
    height: 152,
    borderRadius: 3
  },
  itemEpisode: {
    position: 'absolute',
    top: 132,
    left: 8,
    fontSize: 11,
    color: '#cccccc'
  },
  itemRating: {
    position: 'absolute',
    top: 132,
    right: 8,
    fontSize: 11,
    color: 'orange'
  },
  itemText: {
    color: '#333333',
    fontSize: 12.5
  }
});

export default Movies;
