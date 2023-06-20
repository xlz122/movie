import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deviceWidth } from '@/utils/screen';
import { moviesList } from '@/api/movies';
import type { Navigation } from '@/types/index';
import type { MovieParams } from '@/api/movies';
import Nav from './nav/Nav';
import ScrollRefresh from '@/components/scroll-refresh/ScrollRefresh';

type ItemType = {
  id: number;
  poster: string;
  episode_count?: number;
  rating?: number;
  title: string;
};

function Movies(): React.ReactElement {
  const navigation: Navigation = useNavigation();

  // 刷新列表
  const [resetRefresh, setResetRefresh] = useState(false);

  const handleRefreshSuccess = () => {
    setResetRefresh(false);
  };

  const [navParams, setNavParams] = useState({
    category: '全部',
    genre: '全部',
    country: '全部',
    year: '全部'
  });

  const timer = useRef<NodeJS.Timeout>();

  const navChange = (categoryParams: Partial<MovieParams>) => {
    setNavParams({ ...navParams, ...categoryParams });

    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setResetRefresh(true);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const renderItem = ({ item }: { item: ItemType }) => (
    <Pressable
      onPress={() => navigation.push('MovieDetail', { id: item.id })}
      style={styles.item}
    >
      <Image
        source={{ uri: item.poster }}
        resizeMode={'stretch'}
        style={[styles.itemImage]}
      />
      {Number(item?.episode_count) > 0 && (
        <Text style={styles.itemEpisode}>全{item?.episode_count}集</Text>
      )}
      {Number(item?.rating) > 0 && (
        <Text style={styles.itemRating}>{item?.rating}</Text>
      )}
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
        {item.title}
      </Text>
    </Pressable>
  );

  return (
    <>
      <Nav onChange={navChange} />
      <View style={styles.page}>
        {/* 单项宽度105 */}
        <ScrollRefresh
          requestParams={{
            page: 1,
            pageSize: Math.floor(deviceWidth / 105) * 5,
            category: navParams.category,
            genre: navParams.genre,
            country: navParams.country,
            year: navParams.year
          }}
          request={moviesList}
          renderItem={renderItem}
          initialNumToRender={15}
          resetRefresh={resetRefresh}
          refreshSuccess={handleRefreshSuccess}
          numColumns={Math.floor(deviceWidth / 105)}
          columnWrapperStyle={{
            justifyContent: 'space-between'
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 7,
    backgroundColor: '#fff'
  },
  item: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: 105,
    paddingBottom: 10,
    marginHorizontal: 5,
    textAlign: 'center'
  },
  itemImage: {
    width: 105,
    height: 154,
    borderRadius: 3
  },
  itemEpisode: {
    position: 'absolute',
    left: 8,
    bottom: 38,
    fontSize: 11.2,
    color: '#ccc'
  },
  itemRating: {
    position: 'absolute',
    right: 8,
    bottom: 38,
    fontSize: 11,
    color: 'orange'
  },
  itemText: {
    marginTop: 6,
    color: '#333',
    fontSize: 12
  }
});

export default Movies;
