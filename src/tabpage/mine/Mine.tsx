import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/index';
import type { Navigation } from '@/types/index';
import MineCount from './mine-count/MineCount';

type Props = {
  navigation: Navigation;
};

function Mine(props: Props): React.ReactElement {
  const userinfo = useSelector((state: RootState) => state.routine.userinfo);

  return (
    <View style={styles.page}>
      <View style={styles.userInfo}>
        {!userinfo.username && (
          <>
            <Image
              source={require('../../assets/image/default-avatar.jpg')}
              resizeMode="stretch"
              style={styles.avatar}
            />
            <Text
              onPress={() => props.navigation.push('Login')}
              style={styles.loginText}
            >
              立即登录
            </Text>
          </>
        )}
        {userinfo.username && (
          <>
            <Image
              source={{ uri: userinfo.avatar }}
              resizeMode="stretch"
              style={styles.avatar}
            />
            <Text style={styles.userName}>{userinfo.username}</Text>
            <Pressable
              onPress={() => props.navigation.push('Setting')}
              style={styles.setting}
            >
              <Text style={styles.settingIcon}>{'\ue65e'}</Text>
            </Pressable>
          </>
        )}
      </View>
      <MineCount />
      {userinfo.username && (
        <View style={styles.cell}>
          <Pressable
            onPress={() => props.navigation.push('UserProfile')}
            style={styles.cellItem}
          >
            <Text style={styles.itemIcon}>{'\ue6c8'}</Text>
            <Text style={styles.itemText}>我的资料</Text>
            <Text style={styles.itemArrow}>{'\ue906'}</Text>
          </Pressable>
          <View style={styles.divider} />
          <Pressable style={styles.cellItem}>
            <Text style={styles.itemIcon}>{'\ue611'}</Text>
            <Text style={styles.itemText}>影片收藏夹</Text>
            <Text style={styles.itemArrow}>{'\ue906'}</Text>
          </Pressable>
        </View>
      )}
      <View style={styles.cell}>
        <Pressable style={styles.cellItem}>
          <Text style={styles.itemIcon}>{'\ue701'}</Text>
          <Text style={styles.itemText}>兴趣爱好</Text>
          <Text style={styles.itemArrow}>{'\ue906'}</Text>
        </Pressable>
        <View style={styles.divider} />
        <Pressable
          onPress={() => props.navigation.push('Project')}
          style={styles.cellItem}
        >
          <Text style={styles.itemIcon}>{'\ue655'}</Text>
          <Text style={styles.itemText}>关于项目</Text>
          <Text style={styles.itemArrow}>{'\ue906'}</Text>
        </Pressable>
        <View style={styles.divider} />
        <Pressable
          onPress={() => props.navigation.push('Author')}
          style={styles.cellItem}
        >
          <Text style={styles.itemIcon}>{'\ue634'}</Text>
          <Text style={styles.itemText}>关于作者</Text>
          <Text style={styles.itemArrow}>{'\ue906'}</Text>
        </Pressable>
        <View style={styles.divider} />
        <Pressable
          onPress={() => props.navigation.push('Changelog')}
          style={styles.cellItem}
        >
          <Text style={styles.itemIcon}>{'\ue60b'}</Text>
          <Text style={styles.itemText}>更新日志</Text>
          <Text style={styles.itemArrow}>{'\ue906'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5'
  },
  userInfo: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    width: '100%',
    height: 198,
    paddingHorizontal: 14,
    backgroundColor: '#e54847'
  },
  avatar: {
    width: 66,
    height: 66,
    borderRadius: 50
  },
  loginText: {
    fontSize: 14,
    color: '#ffffff'
  },
  userName: {
    fontWeight: '700',
    fontSize: 16,
    color: '#ffffff'
  },
  setting: {
    position: 'absolute',
    top: 6,
    right: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 42,
    height: 42
  },
  settingIcon: {
    fontFamily: 'iconfont',
    fontSize: 18,
    color: '#ffffff'
  },
  cell: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    padding: 14,
    marginTop: 14,
    marginHorizontal: 14,
    backgroundColor: '#ffffff',
    borderRadius: 6
  },
  cellItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemIcon: {
    marginRight: 6,
    fontFamily: 'iconfont',
    fontSize: 17,
    color: '#ffbe10'
  },
  itemText: {
    flex: 1,
    fontSize: 12.5,
    color: '#303133'
  },
  itemArrow: {
    fontFamily: 'iconfont',
    fontSize: 12,
    color: '#999999'
  },
  divider: {
    borderBottomWidth: 0.48,
    borderStyle: 'solid',
    borderColor: '#eeeeee'
  }
});

export default Mine;
