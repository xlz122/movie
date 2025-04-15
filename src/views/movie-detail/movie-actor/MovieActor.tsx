import React from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { ListRenderItemInfo } from 'react-native';
import type { Navigation } from '@/types/index';

type Props = {
  list: MovieActorItem[];
};

export type MovieActorItem = {
  id: number;
  avatar: string;
  name: string;
  profession: string;
  act: string;
};

function MovieActor(props: Props): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const renderItem = ({ item }: ListRenderItemInfo<MovieActorItem>) => (
    <Pressable onPress={() => navigation.push('ActorDetail', { id: item.id })}>
      <View style={styles.item}>
        <Image
          source={{ uri: item.avatar }}
          resizeMode="stretch"
          style={styles.itemImage}
        />
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
          {item.name}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemIntro}>
          {item.profession === '导演' ? item.profession : ''}
          {item.act ? `饰: ${item.act}` : ''}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      horizontal
      initialNumToRender={10}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => String(index)}
      data={props.list}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    marginHorizontal: 0,
    marginBottom: 0
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    width: 86,
    height: 'auto'
  },
  itemImage: {
    width: 86,
    height: 122,
    borderRadius: 3
  },
  itemText: {
    fontSize: 12.5,
    color: '#ffffff'
  },
  itemIntro: {
    marginTop: -5,
    fontSize: 10.5,
    color: 'hsla(0, 0%, 96.1%, 0.75)'
  },
  separator: {
    width: 8,
    height: '100%'
  }
});

export default MovieActor;
