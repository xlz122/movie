import React from 'react';
import { FlatList, View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { ListRenderItemInfo } from 'react-native';
import type { Navigation } from '@/types/index';

type Props = {
  list: MovieRoleItem[];
};

export type MovieRoleItem = {
  id: number;
  avatar: string;
  name: string;
};

function MovieRole(props: Props): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const renderItem = ({ item }: ListRenderItemInfo<MovieRoleItem>) => (
    <Pressable onPress={() => navigation.push('RoleDetail', { id: item.id })}>
      <View style={styles.item}>
        <Image resizeMode="stretch" source={{ uri: item.avatar }} style={styles.itemImage} />
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.itemText}>
          {item.name}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      horizontal
      initialNumToRender={10}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
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
  separator: {
    width: 8,
    height: '100%'
  }
});

export default MovieRole;
