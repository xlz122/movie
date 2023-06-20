import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { viewHeight } from '@/utils/screen';
import { movieToday } from '@/api/home';
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

  const [sort, setSort] = useState({
    active: 'hot',
    list: [
      {
        title: '热度排序',
        type: 'hot'
      },
      {
        title: '时间排序',
        type: 'date'
      }
    ]
  });

  const toggleSort = (value: string): void => {
    setSort({ ...sort, active: value });
  };

  const renderItem = ({ item }: { item: ItemType }) => (
    <Pressable onPress={() => navigation.push('MovieDetail', { id: item.id })}>
      <View style={styles.item}>
        <Image
          source={{ uri: item.poster }}
          resizeMode={'stretch'}
          style={[styles.itemImage]}
        />
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
            <Text style={styles.itemRatingWeight}>{item?.rating}</Text>
            <Text> 分</Text>
          </Text>
        )}
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.tab}>
        {sort.list.map((item, index) => {
          return (
            <Text
              key={index}
              onPress={() => toggleSort(item.type)}
              style={[
                styles.tabItem,
                item.type === sort.active
                  ? styles.tabActiveItem
                  : styles.tabItem
              ]}
            >
              {item.title}
            </Text>
          );
        })}
      </View>
      <ScrollRefresh
        requestParams={{
          page: 1,
          pageSize: 10,
          sortby: sort.active
        }}
        sortParams={{ sortby: sort.active }}
        request={movieToday}
        renderItem={renderItem}
        initialNumToRender={6}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingBottom: Platform.OS !== 'web' ? 10 : 0,
    // web端需要减去标题高度
    height: Platform.OS === 'web' ? viewHeight - 42 : viewHeight,
    backgroundColor: '#fff'
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#eee'
  },
  tabItem: {
    flex: 1,
    height: 44,
    lineHeight: 44,
    fontSize: 12,
    color: '#303133',
    textAlign: 'center'
  },
  tabActiveItem: {
    color: '#e54847'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 18,
    marginRight: -20,
    marginLeft: 16
  },
  itemImage: {
    width: 93,
    height: 124,
    borderRadius: 3
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 15,
    marginLeft: 13
  },
  itemTitle: {
    marginBottom: 1,
    fontSize: 14,
    color: '#333'
  },
  itemTag: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  tag: {
    paddingVertical: 0.5,
    paddingHorizontal: 1.8,
    marginTop: 8.5,
    marginRight: 5,
    backgroundColor: 'rgba(254, 179, 0, .15)',
    fontSize: 10,
    color: '#feb300',
    textAlign: 'center',
    borderRadius: 2
  },
  itemText: {
    marginTop: 8,
    fontSize: 11,
    color: '#999'
  },
  itemRating: {
    width: 68,
    fontSize: 8,
    color: '#f16c00'
  },
  itemRatingWeight: {
    fontSize: 12,
    fontWeight: '700'
  }
});

export default Today;
