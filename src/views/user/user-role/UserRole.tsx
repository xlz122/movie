import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { userRoles } from '@/api/mine';
import type { ListRenderItemInfo } from 'react-native';
import type { Navigation } from '@/types/index';
import ScrollRefresh from '@/components/scroll-refresh/ScrollRefresh';

type ItemType = {
  id: number;
  avatar: string;
  name: string;
  name_en: string;
};

function UserRole(): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const renderItem = ({ item }: ListRenderItemInfo<ItemType>) => (
    <Pressable onPress={() => navigation.push('RoleDetail', { id: item.id })}>
      <View style={styles.item}>
        <Image
          source={{ uri: item.avatar }}
          resizeMode="stretch"
          style={styles.itemImage}
        />
        <View style={styles.itemInfo}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemTitle}>
            {item.name}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.name_en}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  const ListEmptyComponent = (): React.ReactElement => (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>您还没有关注任何角色</Text>
    </View>
  );

  return (
    <View style={styles.page}>
      <ScrollRefresh
        initialNumToRender={10}
        requestParams={{
          page: 1,
          pageSize: 10
        }}
        request={userRoles}
        renderItem={renderItem}
        ListEmptyComponent={<ListEmptyComponent />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
    marginHorizontal: 14
  },
  itemImage: {
    width: 74,
    height: 98,
    borderRadius: 3
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  },
  itemTitle: {
    fontSize: 14,
    color: '#333333'
  },
  itemText: {
    fontSize: 11.5,
    color: '#999999'
  },
  empty: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 250
  },
  emptyText: {
    fontSize: 13,
    color: '#aaaaaa'
  }
});

export default UserRole;
