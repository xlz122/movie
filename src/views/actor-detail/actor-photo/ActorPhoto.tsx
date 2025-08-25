import React from 'react';
import { FlatList, View, Image, StyleSheet } from 'react-native';
import type { ListRenderItemInfo } from 'react-native';

type Props = {
  list: ActorPhotoItem[];
};

export type ActorPhotoItem = {
  url: string;
};

function ActorPhoto(props: Props): React.ReactElement {
  const renderItem = ({ item }: ListRenderItemInfo<ActorPhotoItem>) => (
    <View style={styles.item}>
      <Image
        source={{ uri: item.url }}
        resizeMode="stretch"
        style={styles.itemImage}
      />
    </View>
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
    marginHorizontal: 10,
    marginBottom: 10
  },
  item: {
    width: 64,
    height: 'auto'
  },
  itemImage: {
    width: 64,
    height: 90,
    borderRadius: 3,
    objectFit: 'cover'
  },
  separator: {
    width: 8,
    height: '100%'
  }
});

export default ActorPhoto;
