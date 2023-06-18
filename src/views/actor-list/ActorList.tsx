import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { movieActor } from '@/api/movies';
import type { RouteProp } from '@react-navigation/native';
import type { Navigation, ResponseType } from '@/types/index';
import styles from './actor-list.css';

type Route = RouteProp<{ params: { movieId: number } }>;

type MovieType = {
  list: ItemType[];
  stickyIndex: number[];
};

type ItemType = {
  stickyTitle?: string;
  id?: number;
  avatar?: string;
  name?: string;
  name_en?: string;
  gender?: string;
  country?: string;
  count?: number;
  isLastItem?: boolean;
};

function ActorList(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();

  const [actor, setActor] = useState<MovieType>({
    list: [],
    stickyIndex: []
  });

  const getMovieActor = (): void => {
    movieActor({ id: route.params.movieId })
      .then((res: ResponseType<any[]>) => {
        if (res.code === 200) {
          const list: ItemType[] = [];
          const stickyIndex: number[] = [];

          res.data?.forEach(item => {
            const isExist = list.find(t => t.name === item.name);

            // 吸顶标题、索引
            if (!isExist) {
              list.push({
                stickyTitle: item.name,
                count: item.children.length
              });
              stickyIndex.push(list.length - 1);
            }

            // 列表项
            item?.children?.forEach((i: ItemType, ind: number) => {
              if (ind === item.children.length - 1) {
                list.push({ ...i, isLastItem: true });
                return false;
              }

              list.push(i);
            });
          });

          setActor({ list, stickyIndex });
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getMovieActor();
  }, []);

  const renderItem = ({ item }: { item: ItemType }) => (
    <>
      {item.stickyTitle && (
        <View style={styles.sticky}>
          <View style={styles.stickySpot} />
          <Text style={styles.stickyText}>{item.stickyTitle}</Text>
          <Text style={styles.stickyCount}>({item.count})</Text>
        </View>
      )}
      {!item.stickyTitle && (
        <Pressable
          onPress={() => navigation.push('ActorDetail', { id: item.id })}
        >
          <View
            style={[
              styles.item,
              item.isLastItem ? styles.lastItem : styles.item
            ]}
          >
            <Image
              source={{ uri: item.avatar }}
              resizeMode={'stretch'}
              style={[styles.itemImage]}
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemText}>{item.name_en}</Text>
              <Text style={styles.itemText}>
                {item?.gender}
                {Boolean(item?.country) && (
                  <>
                    <Text> · </Text>
                    <Text>{item?.country}</Text>
                  </>
                )}
              </Text>
            </View>
          </View>
        </Pressable>
      )}
    </>
  );

  return (
    <View style={styles.page}>
      {actor.list.length > 0 && (
        <FlatList
          stickyHeaderIndices={actor.stickyIndex}
          keyExtractor={(item: object, index: number) => String(index)}
          data={actor.list}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

export default ActorList;
