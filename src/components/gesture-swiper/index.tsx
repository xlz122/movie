import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import SimpleSwiper from './GestureSwiper';

type Props = {
  banner: BannerItem[];
};

type BannerItem = {
  banner: string;
};

function SimpleSwiperDemo(props: Props): React.ReactElement {
  const renderItem = ({ item }: { item: BannerItem }) => (
    <View>
      <Image
        source={{ uri: item?.banner }}
        resizeMode={'stretch'}
        style={styles.coverImage}
      />
    </View>
  );

  return (
    <SimpleSwiper
      data={props?.banner || []}
      renderItem={renderItem}
      style={styles.swiper}
      itemStyle={styles.swiperItem}
    />
  );
}

const styles = StyleSheet.create({
  swiper: {
    marginVertical: 10
  },
  swiperItem: {
    padding: 10
  },
  coverImage: {
    height: 190,
    borderRadius: 4
  }
});

export default SimpleSwiperDemo;
