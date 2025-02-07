import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { ViewStyle } from 'react-native';
import type { StackNavigationOptions } from '@react-navigation/stack';
import type { Navigation } from '@/types/index';
import styles from './custom-header.css';

type Props = {
  options?: StackNavigationOptions;
  children?: React.ReactNode;
  titleCenter?: boolean;
  headerStyle?: ViewStyle;
  arrowStyle?: ViewStyle;
};

function CustomHeader(props: Props): React.ReactElement {
  const navigation: Navigation = useNavigation();

  return (
    <View style={[styles.header, props.headerStyle]}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={[styles.arrow, props.arrowStyle]}
      >
        <Text style={styles.arrowIcon}>{'\ue656'}</Text>
      </Pressable>
      <Text
        style={[
          styles.titleText,
          props.titleCenter ? styles.titleCenter : null
        ]}
      >
        {props.options?.title}
      </Text>
      {props.children}
    </View>
  );
}

export default CustomHeader;
