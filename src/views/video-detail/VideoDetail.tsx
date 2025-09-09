import React, { useState, useLayoutEffect, useEffect } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
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
import type { Navigation, ResponseType } from '@/types/index';
import CustomHeader from '@/components/custom-header/CustomHeader';
import CustomAlert from '@/components/custom-alert/CustomAlert';
import Comment from '@/components/comment/Comment';
import VideoPlayer from './video-player/VideoPlayer';
import VideoInfo from './video-info/VideoInfo';
import VideoList from './video-list/VideoList';
import styles from './video-detail.css';

type Route = RouteProp<{ params: { id: number } }>;

type DetailType = {
  id: number;
  movie: { id: number };
  is_like: boolean;
  like_count: number;
  is_collection: boolean;
  collection_count: number;
  comment_count: number;
};

function VideoDetail(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();
  const isLogin = useSelector((state: RootState) => state.routine.isLogin);

  const [detail, setDetail] = useState<Partial<DetailType>>({});

  const getVideoDetail = async () => {
    const res: ResponseType = await videosDetail({ id: route.params.id });
    if (res?.code !== 200) {
      return;
    }

    setDetail(res.data ?? {});
  };

  useEffect(() => {
    getVideoDetail();
  }, []);

  // 点赞/取消点赞
  const handleLikeChange = async () => {
    if (!isLogin) {
      navigation.push('Login');
      return;
    }

    if (!detail.is_like) {
      const res: ResponseType = await videoLike({ id: route.params.id });
      if (res?.code !== 200) {
        return;
      }

      getVideoDetail();
      CustomAlert({ title: '提示', message: res.message });
    }

    if (detail.is_like) {
      const res: ResponseType = await unVideoLike({ id: route.params.id });
      if (res?.code !== 200) {
        return;
      }

      getVideoDetail();
      CustomAlert({ title: '提示', message: res.message });
    }
  };

  // 收藏/取消收藏
  const handleCollectionChange = async () => {
    if (!isLogin) {
      navigation.push('Login');
      return;
    }

    if (!detail.is_collection) {
      const res: ResponseType = await followVideo({ id: route.params.id });
      if (res?.code !== 200) {
        return;
      }

      getVideoDetail();
      CustomAlert({ title: '提示', message: res.message });
    }

    if (detail.is_collection) {
      const res: ResponseType = await unFollowVideo({ id: route.params.id });
      if (res?.code !== 200) {
        return;
      }

      getVideoDetail();
      CustomAlert({ title: '提示', message: res.message });
    }
  };

  // 评论
  const [comment, setComment] = useState({ open: false });

  const handleCommentOpen = () => {
    setComment({ open: true });
  };

  const handleCommentClose = () => {
    setComment({ open: false });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: ({ options }) => (
        <CustomHeader
          options={options}
          headerStyle={{ height: 0, backgroundColor: 'black' }}
          arrowStyle={{ position: 'absolute', top: 25 }}
        />
      )
    });
  }, []);

  return (
    <>
      <VideoPlayer detail={detail} />
      <ScrollView style={styles.page}>
        <VideoInfo detail={detail} />
        <VideoList movieId={detail.movie?.id} />
      </ScrollView>
      <View style={styles.comment}>
        <Pressable onPress={handleCommentOpen} style={styles.review}>
          <Text style={styles.reviewText}>来点碎碎念...</Text>
        </Pressable>
        <View style={styles.tool}>
          <Pressable onPress={handleLikeChange} style={styles.toolItem}>
            <Text style={detail.is_collection ? styles.activeIcon : styles.itemIcon}>
              {'\ue669'}
            </Text>
            <Text style={styles.itemText}>{detail.like_count ? detail.like_count : '点赞'}</Text>
          </Pressable>
          <Pressable onPress={handleCollectionChange} style={styles.toolItem}>
            <Text style={detail.is_collection ? styles.activeIcon : styles.itemIcon}>
              {'\ue911'}
            </Text>
            <Text style={styles.itemText}>
              {detail.collection_count ? detail.collection_count : '收藏'}
            </Text>
          </Pressable>
          <Pressable onPress={handleCommentOpen} style={styles.toolItem}>
            <Text style={styles.itemIcon}>{'\ue620'}</Text>
            <Text style={styles.itemText}>
              {detail.comment_count ? detail.comment_count : '评论'}
            </Text>
          </Pressable>
        </View>
      </View>
      {comment.open && <Comment request={videoComment} onClose={handleCommentClose} />}
    </>
  );
}

export default VideoDetail;
