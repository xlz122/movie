import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { Navigation } from '@/types/index';
import styles from './video-info.css';

type Props = {
  detail: {
    author?: {
      avatar?: string;
      username?: string;
      video_count?: number;
    };
    title?: string;
    created_at?: string;
    play_count?: number;
    movie?: {
      id?: number;
      poster?: string;
      title?: string;
      rating?: string;
      year?: number;
      countries?: string;
      genres?: string;
    };
  };
};

function VideoInfo(props: Props): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const { detail } = props;

  return (
    <View style={styles.videoInfo}>
      <View style={styles.authorWarp}>
        <View style={styles.author}>
          {detail?.author?.avatar && (
            <Image
              source={{ uri: detail?.author?.avatar }}
              resizeMode={'stretch'}
              style={[styles.authorAvatar]}
            />
          )}
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{detail?.author?.username}</Text>
            <Text style={styles.authorCount}>
              上传视频 {detail?.author?.video_count} 个
            </Text>
          </View>
        </View>
        <Text style={styles.report}>举报</Text>
      </View>
      <Text style={styles.title}>{detail.title}</Text>
      <View style={styles.otherWarp}>
        <Text style={styles.otherText}>发布于 {detail.created_at}</Text>
        <Text style={styles.otherText}>{detail.play_count} 次播放</Text>
      </View>
      <Pressable
        onPress={() =>
          navigation.push('MovieDetail', { id: detail?.movie?.id })
        }
        style={styles.movie}
      >
        {detail?.movie?.poster && (
          <Image
            source={{ uri: detail?.movie?.poster }}
            resizeMode={'stretch'}
            style={[styles.movieImage]}
          />
        )}
        <View style={styles.movieInfo}>
          <View style={styles.infoTitle}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.titleText}
            >
              {detail.movie?.title}
            </Text>
            <Text style={styles.titleRating}>{detail.movie?.rating}分</Text>
          </View>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.infoDesc}>
            <Text>{detail?.movie?.year}</Text>
            <Text>·</Text>
            <Text>{detail?.movie?.countries}</Text>
            <Text>·</Text>
            <Text>{detail?.movie?.genres}</Text>
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default VideoInfo;
