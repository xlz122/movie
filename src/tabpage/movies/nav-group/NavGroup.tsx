import React from 'react';
import { FlatList, Text, Pressable, StyleSheet } from 'react-native';
import type { ListRenderItemInfo } from 'react-native';

type Props = {
  group: string;
  active: string;
  list: ItemType[];
  onChange: (group: string, name: string) => void;
};

type ItemType = {
  name: string;
};

function NavGroup(props: Props): React.ReactElement {
  const renderItem = ({ item }: ListRenderItemInfo<ItemType>) => (
    <Pressable onPress={() => { props.onChange(props.group, item.name); }}>
      <Text style={item.name === props.active ? styles.activeItem : styles.item}>
        {item.name}
      </Text>
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
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    marginVertical: 6
  },
  item: {
    paddingVertical: 1,
    paddingHorizontal: 10,
    fontSize: 12.5,
    color: '#333333'
  },
  activeItem: {
    paddingVertical: 1,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(229, 72, 71, 0.85)',
    fontSize: 12.5,
    color: '#ffffff',
    borderRadius: 50
  }
});

export default NavGroup;
