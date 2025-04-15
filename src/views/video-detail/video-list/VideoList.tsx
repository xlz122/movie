import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { timeStampToDuration, formatDistance } from '@/utils/utils';
import { videosDetailList } from '@/api/videos';
import type { ListRenderItemInfo } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import type { Navigation, ResponseType } from '@/types/index';
import styles from './video-list.css';

type Route = RouteProp<{ params: { id: number } }>;

type Props = {
  movieId?: number;
};

type VideoItem = {
  type: string;
  count: number;
  children: {
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

  const [navIndex, setNavIndex] = useState(0);
  const [videos, setVideos] = useState<VideoItem[]>([]);

  const getVideoList = (): void => {
    videosDetailList({ id: props.movieId! })
      .then((res: ResponseType) => {
        if (res?.code !== 200) {
          return;
        }

        setVideos(res.data?.videos ?? []);
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    if (!props.movieId) {
      return;
    }

    getVideoList();
  }, [props.movieId]);

  const renderItem = ({ item, index }: ListRenderItemInfo<VideoItem>) => (
    <Pressable onPress={() => setNavIndex(index)}>
      <Text style={index === navIndex ? styles.navActiveItem : styles.navItem}>
        {item.type} {item.count}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.videoList}>
      <FlatList
        horizontal
        initialNumToRender={10}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => String(index)}
        data={videos}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      {videos[navIndex]?.children?.map?.((item, index) => {
        return (
          <Pressable
            key={index}
            onPress={() => navigation.replace('VideoDetail', { id: item.id })}
            style={styles.videoItem}
          >
            <View style={styles.itemCover}>
              <Image
                source={{ uri: item.poster }}
                resizeMode="stretch"
                style={styles.itemImage}
              />
              <Text style={styles.itemDuration}>
                {timeStampToDuration(item.duration)}
              </Text>
              {item.id === route.params.id && (
                <View style={styles.itemMask}>
                  <Text style={styles.maskText}>播放中</Text>
                </View>
              )}
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <View style={styles.intro}>
                <Text style={styles.introText}>
                  <Text>{item.like_count}</Text>
                  <Text>赞</Text>
                  <Text> · </Text>
                  <Text>{item.play_count}</Text>
                  <Text>播放</Text>
                </Text>
                <Text style={styles.introText}>
                  {formatDistance(item.created_at)}
                </Text>
              </View>
            </View>
          </Pressable>
        );
      })}
      {videos[navIndex]?.children?.length === 0 && (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>暂无视频</Text>
        </View>
      )}
    </View>
  );
}

export default VideoList;
