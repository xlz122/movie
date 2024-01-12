import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import LinearGradinet from 'react-native-linear-gradient';
import { colorToRgba } from '@/utils/utils';
import { indexData } from '@/api/home';
import type { ResponseType } from '@/types/index';
import Skeleton from '@/components/skeleton/Home';
import Panel from '@/components/panel/Panel';
import Search from './search/Search';
import Banner from './banner/Banner';
import Category from './category/Category';
import MovieList from './movie-list/MovieList';

type BannerItem = {
  bgcolor: string;
  banner: string;
}[];

type MovieType = {
  theater: {
    data?: MovieItem[];
    total?: number;
  };
  coming: {
    data?: MovieItem[];
    total?: number;
  };
  today: {
    data?: MovieItem[];
    total?: number;
  };
};

export type MovieItem = {
  id: number;
  title: string;
  poster: string;
  category: string;
  rating: string;
  wish_count: number;
  release_date: number;
};

function Home(): React.ReactElement {
  const [loading, setLoading] = useState(true);
  // 轮播图
  const [banner, setBanner] = useState<BannerItem>([]);
  // 影视分类
  const [movie, setMovie] = useState<MovieType>({
    theater: {},
    coming: {},
    today: {}
  });

  const getIndexData = () => {
    indexData()
      .then((res: ResponseType) => {
        if (res.code === 200) {
          setLoading(false);
          setBanner(res?.data?.banners || []);
          setMovie({
            theater: res?.data?.theater || {},
            coming: res?.data?.coming || {},
            today: res?.data?.today || {}
          });
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getIndexData();
  }, []);

  // 渐变背景色
  const [gradientColor, setGradientColor] = useState(['#f5f5f5', '#f5f5f5']);

  const handlerGradualChange = (color: string) => {
    const result: string[] = [];

    const gradient = [1, 0.88, 0.65, 0.45, 0];
    gradient.forEach((item: number) => {
      result.push(colorToRgba(color, item));
    });

    setGradientColor(result);
  };

  useEffect(() => {
    if (!banner || banner.length === 0) {
      return;
    }

    handlerGradualChange(banner[0].bgcolor);
  }, [banner]);

  const bannerChange = (index: number) => {
    const color = banner[index].bgcolor || '#f5f5f5';

    handlerGradualChange(color);
  };

  // 搜索框滚动动画
  const spinValue = new Animated.Value(0);
  const spinBackgroundColor = spinValue.interpolate({
    inputRange: [0, 150],
    outputRange: ['transparent', '#fff'],
    extrapolate: 'clamp'
  });
  const spinWidth = spinValue.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 0.38],
    extrapolate: 'clamp'
  });
  const spinColor = spinValue.interpolate({
    inputRange: [0, 150],
    outputRange: ['transparent', '#dfdfdf'],
    extrapolate: 'clamp'
  });

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { y: spinValue }
        }
      }
    ],
    { useNativeDriver: false }
  );

  return (
    <>
      {loading && <Skeleton />}
      {!loading && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          scrollEventThrottle={1}
          onScroll={animatedEvent}
          style={styles.page}
        >
          <View>
            <Animated.View
              style={{
                backgroundColor: spinBackgroundColor,
                borderBottomWidth: spinWidth,
                borderColor: spinColor
              }}
            >
              <Search />
            </Animated.View>
          </View>
          <LinearGradinet colors={gradientColor} style={styles.bgcolor} />
          <Banner banner={banner} onChange={bannerChange} />
          <Category />
          {Number(movie?.theater?.total) > 0 && (
            <Panel
              title="正在热映"
              subtitle={`${movie?.theater?.total}部`}
              to={{ path: 'Theater' }}
            >
              <MovieList movie={movie?.theater?.data} />
            </Panel>
          )}
          {Number(movie?.coming?.total) > 0 && (
            <Panel
              title="即将上映"
              subtitle={`${movie?.coming?.total}部`}
              to={{ path: 'Coming' }}
            >
              <MovieList movie={movie?.coming?.data} />
            </Panel>
          )}
          {Number(movie?.today?.total) > 0 && (
            <Panel
              title="那年今日"
              subtitle={`${movie?.today?.total}部`}
              to={{ path: 'Today' }}
            >
              <MovieList movie={movie?.today?.data} />
            </Panel>
          )}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f5f5f5'
  },
  bgcolor: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    width: '100%',
    height: 300
  }
});

export default Home;
