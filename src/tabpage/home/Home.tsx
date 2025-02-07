import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Animated } from 'react-native';
import LinearGradinet from 'react-native-linear-gradient';
import { colorToRgba } from '@/utils/utils';
import { indexData } from '@/api/home';
import type { ResponseType } from '@/types/index';
import type { MovieItem } from './movie-list/MovieList';
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
    data: MovieItem[];
    total: number;
  };
  coming: {
    data: MovieItem[];
    total: number;
  };
  today: {
    data: MovieItem[];
    total: number;
  };
};

function Home(): React.ReactElement {
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState<BannerItem>([]);
  const [movie, setMovie] = useState<Partial<MovieType>>({});

  const getIndexData = (): void => {
    indexData()
      .then((res: ResponseType) => {
        if (res?.code !== 200) {
          return;
        }

        setLoading(false);
        setBanner(res.data?.banners ?? []);
        setMovie({
          theater: res.data?.theater ?? {},
          coming: res.data?.coming ?? {},
          today: res.data?.today ?? {}
        });
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getIndexData();
  }, []);

  // 渐变背景色
  const [gradientColor, setGradientColor] = useState(['#f5f5f5', '#f5f5f5']);

  const handlerGradualChange = (color: string): void => {
    const result: string[] = [];

    const gradient = [1, 0.88, 0.65, 0.45, 0];
    gradient.forEach(item => {
      result.push(colorToRgba(color, item));
    });

    setGradientColor(result);
  };

  useEffect(() => {
    if (!banner || !banner[0]?.bgcolor) {
      return;
    }

    handlerGradualChange(banner[0].bgcolor);
  }, [banner]);

  const bannerChange = (index: number): void => {
    const color = banner[index]?.bgcolor ?? '#f5f5f5';

    handlerGradualChange(color);
  };

  // 搜索框滚动动画
  const spinValue = new Animated.Value(0);
  const spinBackgroundColor = spinValue.interpolate({
    inputRange: [0, 150],
    outputRange: ['transparent', '#ffffff'],
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

  if (loading) {
    return <Skeleton />;
  }

  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      scrollEventThrottle={1}
      onScroll={animatedEvent}
      showsVerticalScrollIndicator={false}
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
      <Banner list={banner} onChange={bannerChange} />
      <Category />
      {movie.theater && movie.theater.data?.length > 0 && (
        <Panel
          title="正在热映"
          subtitle={`${movie.theater.total}部`}
          to={{ path: 'Theater' }}
        >
          <MovieList list={movie.theater.data} />
        </Panel>
      )}
      {movie.coming && movie.coming.data?.length > 0 && (
        <Panel
          title="即将上映"
          subtitle={`${movie.coming.total}部`}
          to={{ path: 'Coming' }}
        >
          <MovieList list={movie.coming.data} />
        </Panel>
      )}
      {movie.today && movie.today.data?.length > 0 && (
        <Panel
          title="那年今日"
          subtitle={`${movie.today.total}部`}
          to={{ path: 'Today' }}
        >
          <MovieList list={movie.today.data} />
        </Panel>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
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
