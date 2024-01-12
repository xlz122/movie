import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { movieComing } from '@/api/home';
import type { Navigation, ResponseType } from '@/types/index';
import styles from './coming.css';

type MovieType = {
  list: MovieItem[];
  stickyIndex: number[];
};

type MovieItem = {
  stickyTitle?: string;
  id?: number;
  poster?: string;
  title?: string;
  release_date?: string;
  wish_count?: number;
  genres?: string;
  countries?: string;
};

function Coming(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const [coming, setComing] = useState<MovieType>({
    list: [],
    stickyIndex: []
  });

  const getMovieComing = () => {
    movieComing({ page: 1, per_page: 100 })
      .then((res: ResponseType) => {
        if (res.code === 200) {
          const list: MovieItem[] = [];
          const stickyIndex: number[] = [];

          res.data?.forEach((item: { release_date: string }) => {
            const isExist = list.find(
              t => t.release_date === item.release_date
            );

            // 吸顶标题、索引
            if (!isExist) {
              list.push({ stickyTitle: item.release_date });
              stickyIndex.push(list.length - 1);
            }

            // 列表项
            list.push(item);
          });

          setComing({ list, stickyIndex });
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getMovieComing();
  }, []);

  const renderItem = ({ item }: { item: MovieItem }) => (
    <>
      {item.stickyTitle && (
        <View style={styles.sticky}>
          <Text style={styles.stickyText}>{item.stickyTitle}</Text>
        </View>
      )}
      {!item.stickyTitle && (
        <Pressable
          onPress={() => navigation.push('MovieDetail', { id: item.id })}
        >
          <View style={styles.item}>
            <Image
              source={{ uri: item.poster }}
              resizeMode={'stretch'}
              style={[styles.itemImage]}
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
    <View style={styles.page}>
      {coming.list.length > 0 && (
        <FlatList
          stickyHeaderIndices={coming.stickyIndex}
          keyExtractor={(item, index) => String(index)}
          renderItem={renderItem}
          data={coming.list}
        />
      )}
    </View>
  );
}

export default Coming;
