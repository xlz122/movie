import React, { useState, useLayoutEffect, useEffect } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import LinearGradinet from 'react-native-linear-gradient';
import { colorToRgba } from '@/utils/utils';
import { moviesDetail, movieComment } from '@/api/movies';
import type { RouteProp } from '@react-navigation/native';
import type { RootState } from '@/store/index';
import type { Navigation, ResponseType } from '@/types/index';
import type { MovieActorItem } from './movie-actor/MovieActor';
import type { MovieRoleItem } from './movie-role/MovieRole';
import type { MoviePhotoItem } from './movie-photo/MoviePhoto';
import type { MovieSimilarItem } from './movie-similar/MovieSimilar';
import CustomHeader from '@/components/custom-header/CustomHeader';
import Panel from '@/components/panel/Panel';
import Comment from '@/components/comment/Comment';
import MovieInfo from './movie-info/MovieInfo';
import MovieActor from './movie-actor/MovieActor';
import MovieRole from './movie-role/MovieRole';
import MoviePhoto from './movie-photo/MoviePhoto';
import MovieSimilar from './movie-similar/MovieSimilar';
import styles from './movie-detail.css';

type Route = RouteProp<{ params: { id: number } }>;

type DetailType = {
  id: number;
  bgcolor: string;
  summary: string;
  cast_count: number;
  cast: MovieActorItem[];
  role_count: number;
  roles: MovieRoleItem[];
  photo_count: number;
  photos: MoviePhotoItem[];
  like_movies: MovieSimilarItem[];
  review_count: number;
  collection_count: number;
  comment_count: number;
};

function MovieDeail(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();
  const isLogin = useSelector((state: RootState) => state.routine.isLogin);

  const [detail, setDetail] = useState<Partial<DetailType>>({});

  const getMovieDetail = (): void => {
    moviesDetail({ id: route.params.id })
      .then((res: ResponseType) => {
        if (res?.code !== 200) {
          return;
        }

        setDetail(res.data ?? {});
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getMovieDetail();
  }, []);

  const handleRefresh = (): void => {
    getMovieDetail();
  };

  // 渐变背景色
  const [gradientColor, setGradientColor] = useState(['#f5f5f5', '#f5f5f5']);

  const handlerGradualChange = (color: string): void => {
    const result: string[] = [];

    const gradient = [0.9, 0.82, 0.7, 0.68];
    gradient.forEach(item => {
      result.push(colorToRgba(color, item));
    });

    setGradientColor(result);
  };

  useEffect(() => {
    if (!detail || !detail.bgcolor) {
      return;
    }

    handlerGradualChange(detail.bgcolor);
  }, [detail]);

  // 收藏
  const handleCollectionChange = (): void => {
    if (!isLogin) {
      navigation.push('Login');
      return;
    }
  };

  // 评论
  const [comment, setComment] = useState({
    open: false
  });

  const handleCommentOpen = (): void => {
    setComment({ open: true });
  };

  const handleCommentClose = (): void => {
    setComment({ open: false });
  };

  useLayoutEffect(() => {
    // 页面加载时自定义标头
    navigation.setOptions({
      header: ({ options }) => {
        return (
          <CustomHeader
            options={options}
            titleCenter={true}
            headerStyle={{ backgroundColor: 'transparent' }}
          />
        );
      }
    });
  }, []);

  useEffect(() => {
    // 自定义标头
    navigation.setOptions({
      header: ({ options }) => {
        return (
          <CustomHeader
            options={options}
            titleCenter={true}
            headerStyle={{ backgroundColor: gradientColor[0] }}
          />
        );
      }
    });
  }, [gradientColor]);

  return (
    <>
      <ScrollView style={styles.page}>
        <LinearGradinet colors={gradientColor}>
          <MovieInfo detail={detail} onRefresh={handleRefresh} />
          {detail.summary && detail.summary?.length !== 0 && (
            <Panel
              title="剧情"
              subtitle="查看全部"
              to={{ path: 'MovieSummary', params: { id: route.params.id } }}
              panelStyle={{ backgroundColor: 'transparent' }}
              headerStyle={{ paddingHorizontal: 0 }}
              lineStyle={{ width: 0 }}
              titleTextStyle={{ color: '#ffffff' }}
              moreTextStyle={{ color: '#ffffff' }}
              moreIconStyle={{ color: '#ffffff' }}
            >
              <Text
                numberOfLines={4}
                ellipsizeMode="tail"
                style={styles.summary}
              >
                {detail.summary}
              </Text>
            </Panel>
          )}
          {detail.cast && detail.cast?.length !== 0 && (
            <Panel
              title="演员"
              subtitle={`${detail.cast_count}人`}
              to={{ path: 'ActorList', params: { id: route.params.id } }}
              panelStyle={{ backgroundColor: 'transparent' }}
              headerStyle={{ paddingHorizontal: 0 }}
              lineStyle={{ width: 0 }}
              titleTextStyle={{ color: '#ffffff' }}
              moreTextStyle={{ color: '#ffffff' }}
              moreIconStyle={{ color: '#ffffff' }}
            >
              <MovieActor list={detail.cast ?? []} />
            </Panel>
          )}
          {detail.roles && detail.roles?.length !== 0 && (
            <Panel
              title="角色"
              subtitle={`${detail.role_count}人`}
              panelStyle={{ backgroundColor: 'transparent' }}
              headerStyle={{ paddingHorizontal: 0 }}
              lineStyle={{ width: 0 }}
              titleTextStyle={{ color: '#ffffff' }}
              moreTextStyle={{ color: '#ffffff' }}
              moreIconStyle={{ color: '#ffffff' }}
            >
              <MovieRole list={detail.roles} />
            </Panel>
          )}
        </LinearGradinet>
        {detail.photos && detail.photos?.length !== 0 && (
          <Panel
            title="相册"
            subtitle={`${detail.photo_count}张`}
            to={{ path: 'MoviePhotoDetail', params: { id: route.params.id } }}
            panelStyle={{ marginTop: 10 }}
          >
            <MoviePhoto list={detail.photos} />
          </Panel>
        )}
        {detail.like_movies && detail.like_movies?.length !== 0 && (
          <Panel title="相似影视" moreIconStyle={{ display: 'none' }}>
            <MovieSimilar list={detail.like_movies} />
          </Panel>
        )}
      </ScrollView>
      <View style={styles.comment}>
        <View style={styles.review}>
          <Text style={styles.reviewIcon}>{'\ue650'}</Text>
          {!detail.review_count && (
            <Text style={styles.reviewText}>还没有人发布过影评</Text>
          )}
          {Number(detail.review_count) > 0 && (
            <Text style={styles.reviewText}>
              {`共有${detail.review_count}条影评`}
            </Text>
          )}
        </View>
        <View style={styles.tool}>
          <Pressable onPress={handleCollectionChange} style={styles.toolItem}>
            <Text style={styles.itemIcon}>{'\ue911'}</Text>
            {!detail.collection_count && (
              <Text style={styles.itemText}>收藏</Text>
            )}
            {Number(detail.collection_count) > 0 && (
              <Text style={styles.itemText}>{detail.collection_count}</Text>
            )}
          </Pressable>
          <Pressable onPress={handleCommentOpen} style={styles.toolItem}>
            <Text style={styles.itemIcon}>{'\ue620'}</Text>
            {!detail.comment_count && <Text style={styles.itemText}>评论</Text>}
            {Number(detail.comment_count) > 0 && (
              <Text style={styles.itemText}>{detail.comment_count}</Text>
            )}
          </Pressable>
        </View>
      </View>
      {comment.open && <Comment method={movieComment} onClose={handleCommentClose} />}
    </>
  );
}

export default MovieDeail;
