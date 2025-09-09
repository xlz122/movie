import React from 'react';
import { FlatList, View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { ListRenderItemInfo } from 'react-native';
import type { Navigation } from '@/types/index';

type Props = {
  list: MovieItem[];
};

export type MovieItem = {
  id: number;
  title: string;
  poster: string;
  category: string;
  rating: string;
  wish_count: number;
  release_date: number;
};

function MovieList(props: Props): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const renderItem = ({ item }: ListRenderItemInfo<MovieItem>) => (
    <Pressable onPress={() => navigation.push('MovieDetail', { id: item.id })}>
      <View style={styles.item}>
        <Image resizeMode="stretch" source={{ uri: item.poster }} style={styles.itemImage} />
        {item.category && item.category !== '电影' && (
          <Text style={styles.itemTag}>{item.category}</Text>
        )}
        <Text style={styles.itemRating}>{item.rating ? `${item.rating}分` : '暂无评分'}</Text>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.itemText}>
          {item.title}
        </Text>
        {Boolean(item.wish_count) && <Text style={styles.itemWish}>{item.wish_count} 想看</Text>}
        {Boolean(item.release_date) && <Text style={styles.itemDate}>{item.release_date}</Text>}
      </View>
    </Pressable>
  );

  return (
    <FlatList
      horizontal
      initialNumToRender={10}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      data={props.list}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    marginHorizontal: 10,
    marginBottom: 10
  },
  item: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    width: 88,
    height: 'auto'
  },
  itemImage: {
    width: 88,
    height: 124,
    borderRadius: 3
  },
  itemTag: {
    position: 'absolute',
    top: 4,
    right: 4,
    paddingVertical: 1,
    paddingHorizontal: 2,
    backgroundColor: 'rgba(255, 165, 0, 0.7)',
    fontSize: 9,
    color: '#ffffff',
    borderRadius: 3
  },
  itemRating: {
    position: 'absolute',
    top: 106,
    right: 4,
    fontSize: 11,
    color: 'orange'
  },
  itemWish: {
    position: 'absolute',
    top: 106,
    left: 4,
    fontSize: 11,
    color: '#ffffff'
  },
  itemText: {
    fontSize: 12.5,
    color: '#333333'
  },
  itemDate: {
    marginTop: -5,
    fontSize: 10.5,
    color: '#888888'
  },
  separator: {
    width: 8,
    height: '100%'
  }
});

export default MovieList;
