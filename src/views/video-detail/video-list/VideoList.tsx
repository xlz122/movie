import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  FlatList
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { timeStampToDuration, formatDate } from '@/utils/utils';
import { videosDetailList } from '@/api/videos';
import type { ListRenderItemInfo } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import type { ResponseType, Navigation } from '@/types/index';
import styles from './video-list.css';

type Route = RouteProp<{ params: { id: number } }>;

type Props = {
  movieId?: number;
};

type ItemType = {
  type?: string;
  count?: number;
  duration?: number;
  children?: {
    id: number;
    title: string;
    poster: string;
    duration: number;
    like_count: number;
    play_count: number;
    created_at: string;
  }[];
};

function VideoList(props: Props): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();

  const [videos, setVideos] = useState<Array<ItemType>>([]);

  const getVideoList = () => {
    videosDetailList({ id: props.movieId! })
      .then((res: ResponseType) => {
        if (res.code === 200) {
          setVideos(res.data.videos);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    if (!props.movieId) {
      return;
    }

    getVideoList();
  }, [props.movieId]);

  const [navIndex, setNavIndex] = useState(0);

  const renderItem = ({ item, index }: ListRenderItemInfo<ItemType>) => (
    <Pressable onPress={() => setNavIndex(index)}>
      <Text
        style={[
          styles.navItem,
          index === navIndex ? styles.navActiveItem : null
        ]}
      >
        {item.type} {item.count}
      </Text>
    </Pressable>
  );

  return (
    <ScrollView style={styles.videoList}>
      <View style={styles.nav}>
        <FlatList
          horizontal
          initialNumToRender={5}
          showsHorizontalScrollIndicator={false}
          data={videos}
          renderItem={renderItem}
        />
      </View>
      {videos[navIndex]?.children?.map((item, index) => {
        return (
          <Pressable
            key={index}
            onPress={() => navigation.replace('VideoDetail', { id: item.id })}
            style={styles.videoItem}
          >
            <View style={styles.itemCover}>
              <Image
                source={{ uri: item?.poster }}
                resizeMode={'stretch'}
                style={[styles.coverImage]}
              />
              <Text style={styles.coverText}>
                {timeStampToDuration(item.duration)}
              </Text>
              {item.id === route.params.id && (
                <View style={styles.coverMask}>
                  <Text style={styles.coverMaskText}>播放中</Text>
                </View>
              )}
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.infoTitle}>{item.title}</Text>
              <View style={styles.infoDesc}>
                <Text style={styles.descText}>
                  {item.like_count}
                  <Text>赞</Text>
                  <Text> · </Text>
                  {item.play_count}
                  <Text>播放</Text>
                </Text>
                <Text style={styles.descText}>
                  {formatDate(item.created_at)}
                </Text>
              </View>
            </View>
          </Pressable>
        );
      })}
      {videos[navIndex]?.children?.length === 0 && (
        <Text style={styles.noDataText}>暂无视频</Text>
      )}
    </ScrollView>
  );
}

export default VideoList;
