import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { movieActor } from '@/api/movies';
import type { RouteProp } from '@react-navigation/native';
import type { Navigation, ResponseType } from '@/types/index';
import styles from './actor-list.css';

type Route = RouteProp<{ params: { id: number } }>;

type ActorType = {
  stickyIndex: number[];
  list: ItemType[];
};

type ItemType = {
  id: number;
  name: string;
  name_en: string;
  count: number;
  avatar: string;
  gender: string;
  country: string;
};

function ActorList(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();

  const [actor, setActor] = useState<ActorType>({
    stickyIndex: [],
    list: []
  });

  const getMovieActor = (): void => {
    movieActor({ id: route.params.id })
      .then((res: ResponseType) => {
        if (res?.code !== 200) {
          return;
        }

        const stickyIndex: number[] = [];
        const list: ItemType[] = [];

        res.data?.forEach?.((item: ItemType & { children: ItemType[] }) => {
          list.push(...[item, ...item.children]);
        });
        list.forEach?.((item, index) =>
          item.hasOwnProperty('children') && stickyIndex.push(index)
        );

        setActor({ stickyIndex, list });
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getMovieActor();
  }, []);

  const RenderItem = ({ item, index }: { item: ItemType; index: number }) => (
    <>
      {item.hasOwnProperty('children') && (
        <View style={styles.sticky}>
          <View style={styles.stickySpot} />
          <Text style={styles.stickyText}>{item.name}</Text>
          <Text style={styles.stickyCount}>({item.count})</Text>
        </View>
      )}
      {!item.hasOwnProperty('children') && (
        <Pressable onPress={() => navigation.push('ActorDetail', { id: item.id })}>
          <View style={styles.item}>
            <Image
              source={{ uri: item.avatar }}
              resizeMode="stretch"
              style={styles.itemImage}
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemText}>{item.name_en}</Text>
              <Text style={styles.itemText}>
                {item.gender}
                {item.country && (
                  <>
                    <Text> · </Text>
                    <Text>{item.country}</Text>
                  </>
                )}
              </Text>
            </View>
          </View>
          <View style={actor.stickyIndex.includes(index + 1) ? null : styles.divider} />
        </Pressable>
      )}
    </>
  );

  return (
    <ScrollView stickyHeaderIndices={actor.stickyIndex} style={styles.page}>
      {actor.list.map?.((item, index) => {
        return <RenderItem key={index} item={item} index={index} />;
      })}
    </ScrollView>
  );
}

export default ActorList;
