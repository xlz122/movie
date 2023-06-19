import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import {
  videosDetail,
  videoLike,
  unVideoLike,
  followVideo,
  unFollowVideo,
  videoComment
} from '@/api/videos';
import type { RouteProp } from '@react-navigation/native';
import type { RootState } from '@/store/index';
import type { ResponseType, Navigation } from '@/types/index';
import CustomHeader from '@/components/custom-header/CustomHeader';
import CustomAlert from '@/components/custom-alert/CustomAlert';
import Comment from '@/components/comment/Comment';
import VideoPlayer from './video-player/VideoPlayer';
import VideoInfo from './video-info/VideoInfo';
import VideoList from './video-list/VideoList';
import styles from './video-detail.css';

type Route = RouteProp<{ params: { id: number } }>;

type VideoDetailType = {
  id?: number;
  movie?: {
    id?: number;
  };
  is_like?: boolean;
  like_count?: number;
  is_collection?: boolean;
  collection_count?: number;
  comment_count?: number;
};

function VideoDetail(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();
  const isLogin = useSelector((state: RootState) => state.routine.isLogin);

  const [detail, setDetail] = useState<VideoDetailType>({});

  const getVideoDetail = () => {
    videosDetail({ id: route.params.id })
      .then((res: ResponseType) => {
        if (res.code === 200) {
          setDetail(res.data);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getVideoDetail();
  }, []);

  useLayoutEffect(() => {
    // 设置标头
    navigation.setOptions({
      header: ({ options }) => {
        return (
          <CustomHeader
            options={options}
            headerStyle={{ height: 0 }}
            arrowStyle={{ position: 'absolute', top: 2 }}
          />
        );
      }
    });
  }, []);

  // 点赞/取消点赞
  const handleLikeChange = (is_like: boolean) => {
    if (!isLogin) {
      navigation.push('Login');
      return false;
    }

    if (!is_like) {
      videoLike({ id: route.params.id })
        .then((res: ResponseType) => {
          if (res.code === 200) {
            getVideoDetail();
            CustomAlert({ title: '提示', message: res?.message });
          }
        })
        .catch(() => ({}));
    }

    if (is_like) {
      unVideoLike({ id: route.params.id })
        .then((res: ResponseType) => {
          if (res.code === 200) {
            getVideoDetail();
            CustomAlert({ title: '提示', message: res?.message });
          }
        })
        .catch(() => ({}));
    }
  };

  // 收藏/取消收藏
  const handleCollectionChange = (is_collection: boolean) => {
    if (!isLogin) {
      navigation.push('Login');
      return false;
    }

    if (!is_collection) {
      followVideo({ id: route.params.id })
        .then((res: ResponseType) => {
          if (res.code === 200) {
            getVideoDetail();
            CustomAlert({ title: '提示', message: res?.message });
          }
        })
        .catch(() => ({}));
    }

    if (is_collection) {
      unFollowVideo({ id: route.params.id })
        .then((res: ResponseType) => {
          if (res.code === 200) {
            getVideoDetail();
            CustomAlert({ title: '提示', message: res?.message });
          }
        })
        .catch(() => ({}));
    }
  };

  // 评论
  const [commentVisible, setCommentVisible] = useState(false);
  const handleCommentClose = (): void => {
    setCommentVisible(false);
  };

  return (
    <>
      <VideoPlayer detail={detail} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
        <VideoInfo detail={detail} />
        <VideoList movieId={detail.movie?.id} />
      </ScrollView>
      <View style={styles.comment}>
        <Pressable
          onPress={() => setCommentVisible(true)}
          style={styles.review}
        >
          <View style={styles.reviewInput}>
            <Text style={styles.inputText}>来点碎碎念...</Text>
          </View>
        </Pressable>
        <View style={styles.tool}>
          <Pressable
            onPress={() => handleLikeChange(detail?.is_like!)}
            style={styles.toolItem}
          >
            <Text
              style={[
                styles.itemIcon,
                detail?.is_like ? styles.activeIcon : styles.itemIcon
              ]}
            >
              {'\ue669'}
            </Text>
            <Text style={styles.itemText}>
              {detail?.like_count && detail?.like_count > 0
                ? detail?.like_count
                : '点赞'}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => handleCollectionChange(detail?.is_collection!)}
            style={styles.toolItem}
          >
            <Text
              style={[
                styles.itemIcon,
                detail?.is_collection ? styles.activeIcon : styles.itemIcon
              ]}
            >
              {'\ue911'}
            </Text>
            <Text style={styles.itemText}>
              {detail?.collection_count && detail?.collection_count > 0
                ? detail?.collection_count
                : '收藏'}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setCommentVisible(true)}
            style={styles.toolItem}
          >
            <Text style={styles.itemIcon}>{'\ue620'}</Text>
            <Text style={styles.itemText}>
              {detail?.comment_count && detail?.comment_count > 0
                ? detail?.comment_count
                : '评论'}
            </Text>
          </Pressable>
        </View>
      </View>
      {commentVisible && (
        <Comment method={videoComment} close={handleCommentClose} />
      )}
    </>
  );
}

export default VideoDetail;
