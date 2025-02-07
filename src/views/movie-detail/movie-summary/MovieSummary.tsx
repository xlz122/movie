import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { moviesDetail } from '@/api/movies';
import type { RouteProp } from '@react-navigation/native';
import type { Navigation, ResponseType } from '@/types/index';
import styles from './movie-summary.css';

type Route = RouteProp<{ params: { id: number } }>;

type DetailType = {
  title: string;
  akas: string[];
  category: string;
  genres: string[];
  pubdates: string[];
  season_count: number;
  episode_count: number;
  durations: string[];
  countries: string[];
  color: number;
  languages: string[];
  summary: string;
};

function MovieSummary(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();

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

  return (
    <View style={styles.page}>
      <ScrollView style={styles.baseInfo}>
        <View style={styles.group}>
          <Text style={styles.title}>基本信息</Text>
          <View style={styles.item}>
            <Text style={styles.itemLabel}>片名:</Text>
            <Text style={styles.itemValue}>{detail.title}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemLabel}>别名:</Text>
            <Text style={styles.itemValue}>{detail.akas?.join?.(' / ')}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemLabel}>类别: </Text>
            <Text style={styles.itemValue}>{detail.category}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemLabel}>类型:</Text>
            <Text style={styles.itemValue}>{detail.genres?.join?.(' / ')}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemLabel}>上映:</Text>
            <Text style={styles.itemValue}>
              {detail.pubdates?.join?.(' / ')}
            </Text>
          </View>
          {Number(detail.season_count) > 0 && (
            <View style={styles.item}>
              <Text style={styles.itemLabel}>季数:</Text>
              <Text style={styles.itemValue}>
                {`第 ${detail.season_count} 季`}
              </Text>
            </View>
          )}
          {Number(detail.episode_count) > 0 && (
            <View style={styles.item}>
              <Text style={styles.itemLabel}>集数:</Text>
              <Text style={styles.itemValue}>
                {`共 ${detail.episode_count} 集`}
              </Text>
            </View>
          )}
          {detail.durations && detail.durations?.length > 0 && (
            <View style={styles.item}>
              <Text style={styles.itemLabel}>片长:</Text>
              <Text style={styles.itemValue}>{`共 ${detail.durations}`}</Text>
            </View>
          )}
          <View style={styles.item}>
            <Text style={styles.itemLabel}>地区:</Text>
            <Text style={styles.itemValue}>
              {detail.countries?.join?.(' / ')}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemLabel}>色彩:</Text>
            <Text style={styles.itemValue}>
              {detail.color === 0 ? '黑白' : '彩色'}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemLabel}>语言:</Text>
            <Text style={styles.itemValue}>
              {detail.languages?.join?.(' / ')}
            </Text>
          </View>
        </View>
        <View style={styles.group}>
          <Text style={styles.title}>简介</Text>
          <Text style={styles.summary}>{detail.summary}</Text>
        </View>
      </ScrollView>
      <Pressable onPress={navigation.goBack} style={styles.footer}>
        <View style={styles.close}>
          <Text style={styles.closeIcon}>{'\ue612'}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default MovieSummary;
