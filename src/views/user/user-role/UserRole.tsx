import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { viewHeight } from '@/utils/screen';
import { userRoles } from '@/api/mine';
import type { Navigation } from '@/types/index';
import ScrollRefresh from '@/components/scroll-refresh/ScrollRefresh';

type UserRoleItem = {
  id: number;
  avatar: string;
  name: string;
  name_en: string;
};

function UserRole(): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const renderItem = ({ item }: { item: UserRoleItem }) => (
    <Pressable onPress={() => navigation.push('RoleDetail', { id: item.id })}>
      <View style={styles.item}>
        <Image
          source={{ uri: item.avatar }}
          resizeMode={'stretch'}
          style={[styles.itemImage]}
        />
        <View style={styles.itemInfo}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemName}>
            {item.name}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.name_en}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  // 无数据模板
  const ListEmptyComponent = (): React.ReactElement => (
    <View style={styles.emptyData}>
      <Text style={styles.emptyDataText}>您还没有关注任何角色</Text>
    </View>
  );

  return (
    <View style={styles.page}>
      <ScrollRefresh
        requestParams={{
          page: 1,
          pageSize: 10
        }}
        request={userRoles}
        renderItem={renderItem}
        initialNumToRender={6}
        ListEmptyComponent={<ListEmptyComponent />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingBottom: Platform.OS !== 'web' ? 10 : 0,
    width: '100%',
    // web端需减去标题栏高度
    height: Platform.OS === 'web' ? viewHeight - 42 : viewHeight,
    backgroundColor: '#fff'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 16,
    marginRight: -20,
    marginLeft: 16
  },
  itemImage: {
    width: 70,
    height: 92,
    borderRadius: 3
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 13
  },
  itemName: {
    marginBottom: 1,
    fontSize: 13,
    color: '#333'
  },
  itemText: {
    marginTop: 8,
    fontSize: 11,
    color: '#999'
  },
  emptyData: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 280
  },
  emptyDataText: {
    fontSize: 13.5,
    color: '#aaa'
  }
});

export default UserRole;
