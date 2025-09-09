import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

type Props = {
  list: unknown[];
  progressValue?: SharedValue<number>;
};

type PaginationItem = {
  animValue: SharedValue<number>;
  index: number;
  length: number;
};

function Dot(props: Props): React.ReactElement {
  const PaginationItem = ({ animValue, index, length }: PaginationItem) => {
    const width = 15;

    const animStyle = useAnimatedStyle(() => {
      let inputRange = [index - 1, index, index + 1];
      let outputRange = [-width, 0, width];

      if (index === 0 && animValue.value > length - 1) {
        inputRange = [length - 1, length, length + 1];
        outputRange = [-width, 0, width];
      }

      return {
        transform: [{ translateX: interpolate(animValue.value, inputRange, outputRange) }],
        backgroundColor: '#e54847'
      };
    }, [animValue, index, length]);

    return (
      <View
        style={[
          {
            overflow: 'hidden',
            transform: [{ rotateZ: '0deg' }]
          },
          styles.dotItem
        ]}
      >
        <Animated.View style={[{ flex: 1 }, animStyle]} />
      </View>
    );
  };

  return (
    <View style={styles.dot}>
      {props.list?.map?.((_, index) => {
        return (
          <PaginationItem
            key={index}
            animValue={props.progressValue!}
            index={index}
            length={props.list.length}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    top: 178,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  dotItem: {
    width: 15,
    height: 3,
    marginHorizontal: 2,
    backgroundColor: '#ffffff',
    borderRadius: 10
  }
});

export default Dot;
