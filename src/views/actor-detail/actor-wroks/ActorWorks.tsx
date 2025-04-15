import React from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { ListRenderItemInfo } from 'react-native';
import type { Navigation } from '@/types/index';

type Props = {
  list: ActorWorkItem[];
};

export type ActorWorkItem = {
  id: number;
  title: string;
  poster: string;
  category: string;
  rating: string;
  release_date: number;
};

function ActorWorks(props: Props): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const renderItem = ({ item }: ListRenderItemInfo<ActorWorkItem>) => (
    <Pressable onPress={() => navigation.push('MovieDetail', { id: item.id })}>
      <View style={styles.item}>
        <Image
          source={{ uri: item.poster }}
          resizeMode="stretch"
          style={styles.itemImage}
        />
        {item.category && item.category !== '电影' && (
          <Text style={styles.itemTag}>{item.category}</Text>
        )}
        {item.rating !== null && Number(item.rating) === 0 && (
          <Text style={styles.itemRating}>暂无评分</Text>
        )}
        {Number(item.rating) > 0 && (
          <Text style={styles.itemRating}>{item.rating}分</Text>
        )}
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
          {item.title}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      horizontal
      initialNumToRender={10}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => String(index)}
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
    width: 86,
    height: 'auto'
  },
  itemImage: {
    width: 86,
    height: 122,
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
    top: 104,
    right: 4,
    fontSize: 11,
    color: 'orange'
  },
  itemText: {
    fontSize: 12.5,
    color: '#333333'
  },
  separator: {
    width: 8,
    height: '100%'
  }
});

export default ActorWorks;
