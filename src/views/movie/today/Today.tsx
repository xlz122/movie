import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { movieToday } from '@/api/home';
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

function Today(): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const [params, setParams] = useState({
    type: 'hot',
    page: 1,
    per_page: 10
  });

  const [tab] = useState([
    { title: '热度排序', type: 'hot' },
    { title: '时间排序', type: 'date' }
  ]);

  const tabChange = (value: string): void => {
    setParams({ ...params, type: value });
  };

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
      <View style={styles.tab}>
        {tab.map?.((item, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => tabChange(item.type)}
              style={styles.tabItem}
            >
              <Text style={params.type === item.type ? styles.tabActiveText : styles.tabText}>
                {item.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <ScrollRefresh
        initialNumToRender={10}
        requestParams={{
          sortby: params.type,
          page: params.page,
          pageSize: params.per_page
        }}
        sortParams={{ sortby: params.type }}
        request={movieToday}
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
  tab: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 44,
    borderBottomWidth: 0.48,
    borderStyle: 'solid',
    borderColor: '#e5e5e5'
  },
  tabItem: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabText: {
    fontSize: 12.5,
    color: '#303133'
  },
  tabActiveText: {
    fontSize: 12.5,
    color: '#e54847'
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

export default Today;
