import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { Navigation } from '@/types/index';
import styles from './video-info.css';

type Props = {
  detail: Partial<{
    author: {
      avatar: string;
      username: string;
      video_count: number;
    };
    title: string;
    created_at: string;
    play_count: number;
    movie: Partial<{
      id: number;
      poster: string;
      title: string;
      rating: string;
      year: number;
      countries: string;
      genres: string;
    }>;
  }>;
};

function VideoInfo(props: Props): React.ReactElement {
  const navigation: Navigation = useNavigation();

  return (
    <View style={styles.videoInfo}>
      <View style={styles.author}>
        <View style={styles.authorWarp}>
          {props.detail.author?.avatar && (
            <Image
              source={{ uri: props.detail.author?.avatar }}
              resizeMode="stretch"
              style={styles.authorAvatar}
            />
          )}
          <View style={styles.authorInfo}>
            <Text style={styles.infoName}>{props.detail.author?.username}</Text>
            <Text style={styles.infoCount}>
              上传视频 {props.detail.author?.video_count} 个
            </Text>
          </View>
        </View>
        <Text style={styles.report}>举报</Text>
      </View>
      <Text style={styles.title}>{props.detail.title}</Text>
      <View style={styles.intro}>
        <Text style={styles.introText}>发布于 {props.detail.created_at}</Text>
        <Text style={styles.introText}>{props.detail.play_count} 次播放</Text>
      </View>
      <Pressable
        onPress={() => navigation.push('MovieDetail', { id: props.detail.movie?.id })}
        style={styles.movie}
      >
        {props.detail.movie?.poster && (
          <Image
            source={{ uri: props.detail.movie?.poster }}
            resizeMode="stretch"
            style={styles.movieImage}
          />
        )}
        <View style={styles.movieInfo}>
          <View style={styles.infoTitle}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.titleText}
            >
              {props.detail.movie?.title}
            </Text>
            <Text style={styles.titleRating}>
              {props.detail.movie?.rating}分
            </Text>
          </View>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.infoIntro}>
            <Text>{props.detail.movie?.year}</Text>
            <Text>·</Text>
            <Text>{props.detail.movie?.countries}</Text>
            <Text>·</Text>
            <Text>{props.detail.movie?.genres}</Text>
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default VideoInfo;
