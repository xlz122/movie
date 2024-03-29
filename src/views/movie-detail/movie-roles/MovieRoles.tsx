import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { ListRenderItemInfo } from 'react-native';
import type { Navigation } from '@/types/index';

type Props = {
  movie: MovieRoleItem[];
};

export type MovieRoleItem = {
  union_id: number;
  id: number;
  avatar: string;
  name: string;
};

function MovieRoles(props: Props): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const renderItem = ({ item }: ListRenderItemInfo<MovieRoleItem>) => (
    <Pressable onPress={() => navigation.push('RoleDetail', { id: item.id })}>
      <View style={styles.item}>
        <Image
          source={{ uri: item.avatar }}
          resizeMode={'stretch'}
          style={[styles.itemImage]}
        />
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
          {item.name}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.list}>
      <FlatList
        horizontal
        initialNumToRender={6}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderItem}
        data={props.movie}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 4
  },
  item: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: 94,
    paddingBottom: 7,
    marginRight: 8
  },
  itemImage: {
    height: 130,
    borderRadius: 3
  },
  itemText: {
    marginTop: 5,
    color: '#fff',
    fontSize: 12
  }
});

export default MovieRoles;
