import React, { useState } from 'react';
import { View, Text, Image, Pressable, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { actorWorks } from '@/api/actor';
import type { ListRenderItemInfo } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import type { Navigation, ResponseType } from '@/types/index';
import ScrollRefresh from '@/components/scroll-refresh/ScrollRefresh';
import styles from './actor-works-list.css';

type Route = RouteProp<{ params: { id: number } }>;

type ItemType = {
  id: number;
  title: string;
  poster: string;
  category: string;
  rating: string;
  release_date: number;
};

function ActorWorksDetail(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();

  const [params, setParams] = useState({
    type: 'hot',
    page: 1,
    per_page: 10
  });

  const [tab] = useState([
    { title: '热度', type: 'hot' },
    { title: '时间', type: 'year' },
    { title: '评分', type: 'rating' }
  ]);

  const tabChange = (value: string): void => {
    setParams({ ...params, type: value });
  };

  // 作品总数
  const [count, setCount] = useState(0);

  const handleResponseSuccess = (res: ResponseType & { total?: number }) => {
    setCount(res.total ?? 0);
  };

  const renderItem = ({ item }: ListRenderItemInfo<ItemType>) => (
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
    <View style={styles.page}>
      <View style={styles.count}>
        <Text style={styles.countText}>作品 {count}</Text>
        <View style={styles.tab}>
          {tab.map?.((item, index) => {
            return (
              <Text
                key={index}
                onPress={() => tabChange(item.type)}
                style={params.type === item.type ? styles.tabActiveItem : styles.tabItem}
              >
                {item.title}
              </Text>
            );
          })}
        </View>
      </View>
      <View style={styles.list}>
        <ScrollRefresh
          initialNumToRender={15}
          requestParams={{
            id: route.params.id,
            sortby: params.type,
            page: params.page,
            pageSize: Math.floor(Dimensions.get('window').width / 104) * 5
          }}
          sortParams={{ sortby: params.type }}
          request={actorWorks}
          responseSuccess={handleResponseSuccess}
          renderItem={renderItem}
          numColumns={Math.floor(Dimensions.get('window').width / 104)}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
      </View>
    </View>
  );
}

export default ActorWorksDetail;
