import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { movieWish } from '@/api/movies';
import type { RouteProp } from '@react-navigation/native';
import type { RootState } from '@/store/index';
import type { Navigation, ResponseType } from '@/types/index';
import CustomAlert from '@/components/custom-alert/CustomAlert';
import styles from './movie-info.css';

type Route = RouteProp<{ params: { id: number } }>;

type Props = {
  detail: Partial<{
    id: number;
    poster: { small: string };
    title: string;
    title_original: string;
    genres: string[];
    countries: string[];
    year: number;
    durations: string[];
    episode_count: number;
    is_wish: boolean;
    tags: string[];
    egg_hunt: number;
    release_status: number;
    release_date: string;
    wish_count: number;
    rating: string;
    vote_count: number;
    thrid_rating: {
      imdb: { count: string; rating: string };
      douban: { count: string; rating: string };
    };
  }>;
  onRefresh: () => void;
};

function MovieInfo(props: Props): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();
  const isLogin = useSelector((state: RootState) => state.routine.isLogin);

  const { detail } = props;

  // 想看/取消想看
  const movieWishChange = async () => {
    if (!isLogin) {
      navigation.push('Login');
      return;
    }

    const res: ResponseType = await movieWish({ id: route.params.id });
    if (res?.code !== 200) {
      return;
    }

    props.onRefresh?.();
    CustomAlert({ title: '提示', message: res.message });
  };

  const movieWatchChange = () => {
    if (!isLogin) {
      navigation.push('Login');
      return;
    }
  };

  const RenderRating = (): React.ReactElement => {
    // 已上映
    if (detail.release_status === 0) {
      return (
        <>
          {Boolean(detail.thrid_rating?.imdb?.rating) && (
            <>
              <View style={styles.ratingItem}>
                <View style={styles.ratingCover}>
                  <Text style={styles.ratingText}>IMDB评分</Text>
                </View>
                <Text style={styles.ratingScore}>{detail.thrid_rating?.imdb?.rating}</Text>
                <Text style={styles.ratingText}>{detail.thrid_rating?.imdb?.count}人评</Text>
              </View>
              <View style={styles.ratingLine} />
            </>
          )}
          {Boolean(detail.rating) && (
            <>
              <View style={styles.ratingItem}>
                <View style={styles.ratingCover}>
                  <Text style={styles.ratingText}>慕影评分</Text>
                </View>
                <Text style={styles.ratingScore}>{detail.rating}</Text>
                <Text style={styles.ratingText}>{detail.vote_count}人评</Text>
              </View>
              <View style={styles.ratingLine} />
            </>
          )}
          {Boolean(detail.thrid_rating?.douban?.rating) && (
            <View style={styles.ratingItem}>
              <View style={styles.ratingCover}>
                <Text style={styles.ratingText}>豆瓣评分</Text>
                <Text style={styles.ratingIcon}>{'\ue602'}</Text>
              </View>
              <Text style={styles.ratingScore}>{detail.thrid_rating?.douban?.rating}</Text>
              <Text style={styles.ratingText}>{detail.thrid_rating?.douban?.count}人评</Text>
            </View>
          )}
        </>
      );
    }

    // 即将上映
    if (detail.release_status === 1) {
      return (
        <>
          <View style={styles.ratingItem}>
            <View style={styles.ratingWish}>
              <Text style={styles.ratingWishCount}>{detail.wish_count}</Text>
              <Text style={styles.ratingWishText}>人想看</Text>
            </View>
          </View>
          <Text style={styles.ratingWishDate}>{detail.release_date}上映</Text>
        </>
      );
    }

    return <Text style={styles.noRating}>暂无评分</Text>;
  };

  return (
    <>
      <View style={styles.movieInfo}>
        <Image resizeMode="stretch" source={{ uri: detail.poster?.small }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{detail.title}</Text>
          <Text style={styles.subTitle}>{detail.title_original}</Text>
          <View style={styles.brief}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.briefText}>
              {detail.genres?.join?.(' / ')}
            </Text>
            {detail.countries && detail.countries.length !== 0 && (
              <Text ellipsizeMode="tail" numberOfLines={1} style={styles.briefText}>
                <Text>{detail.countries?.join?.(' / ')}</Text>
                <Text>·</Text>
                <Text>{detail.year}</Text>
                {detail.episode_count === 0 && (
                  <>
                    <Text>·</Text>
                    <Text>{`${detail.durations?.join?.(' / ')}`}</Text>
                  </>
                )}
              </Text>
            )}
            {Boolean(detail.episode_count) && (
              <Text ellipsizeMode="tail" numberOfLines={1} style={styles.briefText}>
                <Text>{`共${detail.episode_count}集`}</Text>
                <Text>·</Text>
                <Text>{`每集${detail.durations?.[0]}分钟`}</Text>
              </Text>
            )}
          </View>
          <View style={styles.operate}>
            <Pressable onPress={movieWishChange}>
              <View
                style={[
                  styles.operateItem,
                  detail.is_wish ? styles.operateActiveItem : styles.operateItem
                ]}
              >
                <Text style={styles.operateIcon}>{'\ue60a'}</Text>
                <Text style={styles.operateText}>{detail.is_wish ? '已想看' : '想看'}</Text>
              </View>
            </Pressable>
            {detail.release_status !== 1 && (
              <Pressable onPress={movieWatchChange}>
                <View style={styles.operateItem}>
                  <Text style={styles.operateIcon}>{'\ue911'}</Text>
                  <Text style={styles.operateText}>看过</Text>
                </View>
              </Pressable>
            )}
          </View>
        </View>
      </View>
      <View style={styles.rating}>
        <RenderRating />
      </View>
      <View style={styles.tags}>
        {detail.tags?.map?.((item, index) => {
          return (
            <Text key={index} style={styles.tagItem}>{item}</Text>
          );
        })}
      </View>
      {Boolean(detail.egg_hunt) && (
        <View style={styles.egg}>
          <Text style={styles.eggIcon}>{'\ue61e'}</Text>
          <Text style={styles.eggText}>{`有${detail.egg_hunt}个彩蛋, 不要错过哦~ `}</Text>
        </View>
      )}
    </>
  );
}

export default MovieInfo;
