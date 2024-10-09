import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { movieTheater } from '@/api/home';
import type { ListRenderItemInfo } from 'react-native';
import type { Navigation } from '@/types/index';
import ScrollRefresh from '@/components/scroll-refresh/ScrollRefresh';

type ItemType = {
  id: number;
  poster: string;
  title: string;
  category: string;
  year: number;
  genres: string;
  countries: string;
  rating: string;
};

function Theater(): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const renderItem = ({ item }: ListRenderItemInfo<ItemType>) => (
    <Pressable onPress={() => navigation.push('MovieDetail', { id: item.id })}>
      <View style={styles.item}>
        <Image
          source={{ uri: item.poster }}
          resizeMode="stretch"
          style={styles.itemImage}
        />
        <View style={styles.itemInfo}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemTitle}>
            {item.title}
          </Text>
          <View style={styles.itemTag}>
            {item.category && item.category !== '电影' && (
              <Text style={styles.tag}>{item.category}</Text>
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
        {Number(item.rating) > 0 && (
          <View style={styles.itemRating}>
            <Text style={styles.ratingWeight}>{item.rating}</Text>
            <Text style={styles.ratingText}>分</Text>
          </View>
        )}
      </View>
    </Pressable>
  );

  return (
    <View style={styles.page}>
      <ScrollRefresh
        initialNumToRender={10}
        requestParams={{
          page: 1,
          pageSize: 10
        }}
        request={movieTheater}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
    marginHorizontal: 14
  },
  itemImage: {
    width: 82,
    height: 110,
    borderRadius: 3
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  },
  itemTitle: {
    fontSize: 14,
    color: '#333333'
  },
  itemTag: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  tag: {
    paddingVertical: 1,
    paddingHorizontal: 2,
    backgroundColor: 'rgba(254, 179, 0, 0.15)',
    fontSize: 10,
    color: '#feb300',
    borderRadius: 3
  },
  itemText: {
    fontSize: 11.5,
    color: '#999999'
  },
  itemRating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2
  },
  ratingWeight: {
    fontWeight: '700',
    color: '#f16c00',
    fontSize: 12.5
  },
  ratingText: {
    fontSize: 10,
    color: '#f16c00'
  }
});

export default Theater;
