import React from 'react';
import { StatusBar, View, Text, Pressable } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const inset = useSafeAreaInsets();

  useFocusEffect(() => {
    StatusBar.setBarStyle('light-content');
  });

  return (
    <View style={[styles.header, props.headerStyle, { paddingTop: inset.top }]}>
      <Pressable onPress={() => navigation.goBack()} style={[styles.arrow, props.arrowStyle]}>
        <Text style={styles.arrowIcon}>{'\ue656'}</Text>
      </Pressable>
      <Text style={[styles.titleText, props.titleCenter ? styles.titleCenter : null]}>
        {props.options?.title}
      </Text>
      {props.children}
    </View>
  );
}

export default CustomHeader;
