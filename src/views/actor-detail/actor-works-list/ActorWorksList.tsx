import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { deviceWidth } from '@/utils/screen';
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

  // 作品数
  const [total, setTotal] = useState(0);
  // 刷新列表
  const [resetRefresh, setResetRefresh] = useState(false);

  const [sort, setSort] = useState({
    active: 'hot',
    list: [
      {
        title: '热度',
        type: 'hot'
      },
      {
        title: '时间',
        type: 'year'
      },
      {
        title: '评分',
        type: 'rating'
      }
    ]
  });

  const toggleSort = (value: string): void => {
    setResetRefresh(true);
    setSort({ ...sort, active: value });
  };

  const getActorsList = ({
    page,
    per_page
  }: {
    page: number;
    per_page: number;
  }): Promise<unknown[]> => {
    return new Promise((resolve, reject) => {
      actorWorks({
        id: route.params.id,
        page,
        per_page,
        sortby: sort.active
      })
        .then((res: ResponseType<unknown[]>) => {
          if (res.code === 200) {
            setResetRefresh(false);
            setTotal((res as { total: number })?.total);
            resolve(res.data!);
          } else {
            reject();
          }
        })
        .catch(() => ({}));
    });
  };

  const renderItem = ({ item }: ListRenderItemInfo<ItemType>) => (
    <Pressable onPress={() => navigation.push('MovieDetail', { id: item.id })}>
      <View style={styles.item}>
        <Image
          source={{ uri: item.poster }}
          resizeMode={'stretch'}
          style={[styles.itemImage]}
        />
        {item?.category && item?.category !== '电影' && (
          <Text style={styles.itemTag}>{item?.category}</Text>
        )}
        {item?.rating !== null && Number(item?.rating) === 0 && (
          <Text style={styles.itemRating}>暂无评分</Text>
        )}
        {Number(item?.rating) > 0 && (
          <Text style={styles.itemRating}>{item?.rating}分</Text>
        )}
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
          {item.title}
        </Text>
      </View>
    </Pressable>
  );
  return (
    <View style={styles.page}>
      <View style={styles.title}>
        <Text style={styles.titleText}>作品 {total}</Text>
        <View style={styles.titleTab}>
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
      </View>
      {/* 单项宽度105 */}
      <ScrollRefresh
        page={1}
        pageSize={Math.floor(deviceWidth / 105) * 5}
        request={getActorsList}
        initialNumToRender={15}
        numColumns={Math.floor(deviceWidth / 105)}
        columnWrapperStyle={{
          justifyContent: 'space-between'
        }}
        renderItem={renderItem}
        resetRefresh={resetRefresh}
        listStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  );
}

export default ActorWorksDetail;
