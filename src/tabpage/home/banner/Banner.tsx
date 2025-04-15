import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import Dot from './dot/Dot';

type Props = {
  list: BannerItem[];
  onChange: (index: number) => void;
};

type BannerItem = {
  banner: string;
};

function Banner(props: Props): React.ReactElement {
  // 轮播滚动值
  const progressValue = useSharedValue(0);

  const RenderItem = ({ item }: { item: BannerItem }) => {
    return (
      <View style={styles.item}>
        <Image
          source={{ uri: item.banner }}
          resizeMode="stretch"
          style={styles.itemImage}
        />
      </View>
    );
  };

  return (
    <View style={styles.banner}>
      <Carousel
        width={Dimensions.get('window').width}
        height={styles.banner.height}
        loop
        autoPlay
        autoPlayInterval={6000}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        onSnapToItem={index => props.onChange(index)}
        data={props.list}
        renderItem={({ item }) => <RenderItem item={item} />}
      />
      <Dot list={props.list} progressValue={progressValue} />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: 186
  },
  item: {
    marginHorizontal: 10
  },
  itemImage: {
    width: '100%',
    height: 186,
    borderRadius: 6
  }
});

export default Banner;
