import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, View, Text, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const inset = useSafeAreaInsets();

  const [params, setParams] = useState({
    category: '全部',
    genre: '全部',
    country: '全部',
    year: '全部'
  });

  const timer = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleNavChange = (categoryParams: typeof params) => {
    timer.current && clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setParams({ ...params, ...categoryParams });
    }, 500);
  };

  useEffect(() => {
    return () => timer.current && clearTimeout(timer.current);
  }, []);

  useFocusEffect(() => {
    StatusBar.setBarStyle('dark-content');
  });

  const renderItem = ({ item }: ListRenderItemInfo<ItemType>) => (
    <Pressable onPress={() => navigation.push('MovieDetail', { id: item.id })}>
      <View style={styles.item}>
        <Image resizeMode="stretch" source={{ uri: item.poster }} style={styles.itemImage} />
        {Boolean(item.episode_count) && (
          <Text style={styles.itemEpisode}>全{item.episode_count}集</Text>
        )}
        <Text style={styles.itemRating}>{item.rating}</Text>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.itemText}>
          {item.title}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={[styles.page, { paddingTop: inset.top }]}>
      <Nav onChange={handleNavChange} />
      <ScrollRefresh
        initialNumToRender={15}
        params={{
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
        style={styles.list}
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
