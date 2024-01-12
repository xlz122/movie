import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { userCount } from '@/api/mine';
import type { RootState } from '@/store/index';
import type { ResponseType, Navigation } from '@/types/index';

type Count = {
  actor_count?: number;
  review_count?: number;
  role_count?: number;
  video_count?: number;
};

function MineCount(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const isLogin = useSelector((state: RootState) => state.routine.isLogin);

  const [count, setCount] = useState<Count>({
    actor_count: 0,
    review_count: 0,
    role_count: 0,
    video_count: 0
  });

  function getUserCount(): void {
    userCount()
      .then((res: ResponseType<Count>) => {
        if (res.code === 200) {
          setCount(res.data || {});
        }
      })
      .catch(() => ({}));
  }

  useEffect(() => {
    if (!isLogin) {
      return;
    }

    getUserCount();
  }, [isLogin]);

  useEffect(() => {
    if (!isLogin) {
      return;
    }

    // tabBar切换重新请求
    // @ts-ignore
    const unsubscribe = navigation.addListener('tabPress', () => {
      getUserCount();
    });

    return unsubscribe;
  }, [navigation]);

  // 跳转关注详情
  const jumpFlollowDetail = (path: string): boolean | undefined => {
    if (!isLogin) {
      navigation.push('Login');
      return;
    }

    navigation.push(path);
  };

  return (
    <View style={styles.count}>
      <Pressable
        onPress={() => jumpFlollowDetail('UserActor')}
        style={styles.countItem}
      >
        <Text style={styles.itemCount}>
          {isLogin ? `${count.actor_count}` : '-'}
        </Text>
        <Text style={styles.itemText}>关注影人</Text>
      </Pressable>
      <Pressable
        onPress={() => jumpFlollowDetail('UserRole')}
        style={styles.countItem}
      >
        <Text style={styles.itemCount}>
          {isLogin ? `${count.role_count}` : '-'}
        </Text>
        <Text style={styles.itemText}>关注角色</Text>
      </Pressable>
      <Pressable style={styles.countItem}>
        <Text style={styles.itemCount}>
          {isLogin ? `${count.review_count}` : '-'}
        </Text>
        <Text style={styles.itemText}>收藏影评</Text>
      </Pressable>
      <Pressable
        onPress={() => jumpFlollowDetail('UserVideo')}
        style={styles.countItem}
      >
        <Text style={styles.itemCount}>
          {isLogin ? `${count.video_count}` : '-'}
        </Text>
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
    marginHorizontal: 17,
    backgroundColor: '#fff',
    borderRadius: 6
  },
  countItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemCount: {
    width: 9,
    height: 36,
    lineHeight: 36,
    fontSize: 18,
    color: '#e54847'
  },
  itemText: {
    marginTop: 4,
    fontFamily: 'inherit',
    fontWeight: 'bold',
    fontSize: 11,
    color: '#666'
  }
});

export default MineCount;
