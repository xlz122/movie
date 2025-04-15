import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { movieComing } from '@/api/home';
import type { Navigation, ResponseType } from '@/types/index';
import styles from './coming.css';

type ComingType = {
  stickyIndex: number[];
  list: ItemType[];
};

type ItemType = {
  stickyTitle?: string;
  id: number;
  poster: string;
  title: string;
  release_date: string;
  wish_count: number;
  genres: string;
  countries: string;
};

function Coming(): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const [coming, setComing] = useState<ComingType>({
    stickyIndex: [],
    list: []
  });

  const getMovieComing = (): void => {
    movieComing({ page: 1, per_page: 100 })
      .then((res: ResponseType) => {
        if (res?.code !== 200) {
          return;
        }

        const stickyIndex: number[] = [];
        const list: ItemType[] = [];

        res.data?.forEach?.((item: ItemType) => {
          const isExist = list.find(v => item.release_date === v.release_date);

          if (!isExist) {
            list.push({ ...item, stickyTitle: item.release_date }, item);
            return;
          }

          list.push(item);
        });
        list.forEach?.((item, index) =>
          item.hasOwnProperty('stickyTitle') && stickyIndex.push(index)
        );

        setComing({ stickyIndex, list });
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getMovieComing();
  }, []);

  const RenderItem = ({ item }: { item: ItemType }) => (
    <>
      {item.hasOwnProperty('stickyTitle') && (
        <View style={styles.sticky}>
          <Text style={styles.stickyText}>{item.stickyTitle}</Text>
        </View>
      )}
      {!item.hasOwnProperty('stickyTitle') && (
        <Pressable onPress={() => navigation.push('MovieDetail', { id: item.id })}>
          <View style={styles.item}>
            <Image
              source={{ uri: item.poster }}
              resizeMode="stretch"
              style={styles.itemImage}
            />
            <View style={styles.itemInfo}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.itemTitle}
              >
                {item.title}
              </Text>
              <Text style={styles.itemText}>
                <Text style={styles.itemCountText}>{item.wish_count}</Text>
                <Text>人想看</Text>
              </Text>
              <Text style={styles.itemText}>{item.genres}</Text>
              <Text style={styles.itemText}>{item.countries}</Text>
            </View>
          </View>
        </Pressable>
      )}
    </>
  );

  return (
    <ScrollView stickyHeaderIndices={coming.stickyIndex} style={styles.page}>
      {coming.list.map?.((item, index) => {
        return <RenderItem key={index} item={item} />;
      })}
    </ScrollView>
  );
}

export default Coming;
