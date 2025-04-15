import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { ViewStyle, TextStyle } from 'react-native';
import type { Navigation } from '@/types/index';
import styles from './panel.css';

type Props = {
  title: string;
  subtitle?: string;
  to?: {
    path: string;
    params?: Readonly<object | undefined>;
  };
  children?: React.ReactNode;
  panelStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  lineStyle?: ViewStyle;
  titleTextStyle?: TextStyle;
  moreTextStyle?: TextStyle;
  moreIconStyle?: TextStyle;
};

function Panel(props: Props): React.ReactElement {
  const navigation: Navigation = useNavigation();

  return (
    <View style={[styles.panel, props.panelStyle]}>
      <View style={[styles.header, props.headerStyle]}>
        <View style={styles.title}>
          <View style={[styles.line, props.lineStyle]} />
          <Text style={[styles.titleText, props.titleTextStyle]}>
            {props.title}
          </Text>
        </View>
        <Pressable
          onPress={() =>
            props.to && navigation.push(props.to.path, props.to.params)
          }
          style={styles.more}
        >
          <Text style={[styles.moreText, props.moreTextStyle]}>
            {props.subtitle}
          </Text>
          <Text style={[styles.moreIcon, props.moreIconStyle]}>{'\ue906'}</Text>
        </Pressable>
      </View>
      {props.children}
    </View>
  );
}

export default Panel;
