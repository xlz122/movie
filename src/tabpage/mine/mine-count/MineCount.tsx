import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { userCount } from '@/api/mine';
import type { RootState } from '@/store/index';
import type { Navigation, ResponseType } from '@/types/index';

type Count = {
  actor_count: number;
  review_count: number;
  role_count: number;
  video_count: number;
};

function MineCount(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const isLogin = useSelector((state: RootState) => state.routine.isLogin);

  const [count, setCount] = useState<Partial<Count>>({});

  const getUserCount = async () => {
    const res: ResponseType = await userCount();
    if (res?.code !== 200) {
      return;
    }

    setCount(res.data ?? {});
  };

  useEffect(() => {
    if (!isLogin) return;

    getUserCount();
  }, [isLogin]);

  useEffect(() => {
    if (!isLogin) return;

    // @ts-ignore
    const unsubscribe = navigation.addListener('tabPress', () => {
      getUserCount();
    });
    return unsubscribe;
  }, [navigation]);

  const jumpCountDetail = (path: string) => {
    if (!isLogin) {
      navigation.push('Login');
      return;
    }

    navigation.push(path);
  };

  return (
    <View style={styles.count}>
      <Pressable onPress={() => jumpCountDetail('UserActor')} style={styles.countItem}>
        <Text style={styles.itemCount}>{isLogin ? count.actor_count : '-'}</Text>
        <Text style={styles.itemText}>关注影人</Text>
      </Pressable>
      <Pressable onPress={() => jumpCountDetail('UserRole')} style={styles.countItem}>
        <Text style={styles.itemCount}>{isLogin ? count.role_count : '-'}</Text>
        <Text style={styles.itemText}>关注角色</Text>
      </Pressable>
      <Pressable style={styles.countItem}>
        <Text style={styles.itemCount}>{isLogin ? count.review_count : '-'}</Text>
        <Text style={styles.itemText}>收藏影评</Text>
      </Pressable>
      <Pressable onPress={() => jumpCountDetail('UserVideo')} style={styles.countItem}>
        <Text style={styles.itemCount}>{isLogin ? count.video_count : '-'}</Text>
        <Text style={styles.itemText}>收藏视频</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  count: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 76,
    marginTop: -38,
    marginHorizontal: 14,
    backgroundColor: '#ffffff',
    borderRadius: 6
  },
  countItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  itemCount: {
    fontSize: 18,
    color: '#e54847'
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: 11,
    color: '#666666'
  }
});

export default MineCount;
