import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { movieTop } from '@/api/home';
import type { Navigation } from '@/types/index';
import ScrollRefresh from '@/components/scroll-refresh/ScrollRefresh';

type ItemType = {
  id: number;
  title: string;
  poster: string;
  year: number;
  genres: string;
  countries: string;
  rating: string;
};

function HighScore(): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const renderItem = ({ item, index }: { item: ItemType; index: number }) => (
    <Pressable onPress={() => navigation.push('MovieDetail', { id: item.id })}>
      <View style={styles.item}>
        <View style={styles.itemCover}>
          <Image
            source={{ uri: item.poster }}
            resizeMode="stretch"
            style={styles.itemImage}
          />
          {index === 0 && (
            <View style={[styles.itemCoverBg, styles.coverBg1]} />
          )}
          {index === 1 && (
            <View style={[styles.itemCoverBg, styles.coverBg2]} />
          )}
          {index === 2 && (
            <View style={[styles.itemCoverBg, styles.coverBg3]} />
          )}
          {index > 2 && <View style={styles.itemCoverBg} />}
          <Text style={styles.coverText}>{index + 1}</Text>
        </View>
        <View style={styles.itemInfo}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemTitle}>
            {item.title}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.year}
          </Text>
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
        request={movieTop}
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
  itemCover: {
    position: 'relative',
    width: 82,
    height: 110,
    borderRadius: 3,
    overflow: 'hidden'
  },
  itemImage: {
    width: 82,
    height: 110,
    borderRadius: 3
  },
  itemCoverBg: {
    position: 'absolute',
    top: -18,
    left: -14,
    width: 30,
    height: 48,
    backgroundColor: '#adadad',
    transform: [{ rotate: '-135deg' }]
  },
  coverBg1: {
    backgroundColor: 'red'
  },
  coverBg2: {
    backgroundColor: '#ff4500'
  },
  coverBg3: {
    backgroundColor: '#f4a460'
  },
  coverText: {
    position: 'absolute',
    top: 2,
    left: 4,
    zIndex: 1,
    fontSize: 10,
    color: '#ffffff'
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

export default HighScore;
