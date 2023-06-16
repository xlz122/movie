import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/index';
import type { Navigation } from '@/types/index';
import MineCount from './mine-count/MineCount';
import styles from './mine.css';

type Props = {
  navigation: Navigation;
};

function Mine(props: Props): React.ReactElement {
  const userinfo = useSelector((state: RootState) => state.routine.userinfo);

  return (
    <View style={styles.page}>
      <View style={styles.userInfo}>
        {!userinfo?.username && (
          <>
            <Image
              source={require('../../assets/image/default-avatar.jpg')}
              resizeMode={'stretch'}
              style={[styles.avatar]}
            />
            <Text
              onPress={() => props?.navigation.push('Login')}
              style={styles.userText}
            >
              立即登录
            </Text>
          </>
        )}
        {userinfo?.username && (
          <>
            <Image
              source={{ uri: userinfo.avatar }}
              resizeMode={'stretch'}
              style={[styles.avatar]}
            />
            <Text style={styles.userName}>{userinfo?.username}</Text>
            <Pressable
              onPress={() => props?.navigation.push('Setting')}
              style={styles.setting}
            >
              <Text style={styles.settingIcon}>{'\ue65e'}</Text>
            </Pressable>
          </>
        )}
      </View>
      <MineCount />
      {userinfo?.username && (
        <View style={styles.cell}>
          <Pressable
            onPress={() => props?.navigation.push('UserProfile')}
            style={styles.cellItem}
          >
            <Text style={styles.itemIcon}>{'\ue6c8'}</Text>
            <Text style={styles.itemText}>我的资料</Text>
            <Text style={styles.itemArrow}>{'\ue906'}</Text>
          </Pressable>
          <View style={[styles.cellItem, styles.cellLastItem]}>
            <Text style={styles.itemIcon}>{'\ue611'}</Text>
            <Text style={styles.itemText}>影片收藏夹</Text>
            <Text style={styles.itemArrow}>{'\ue906'}</Text>
          </View>
        </View>
      )}
      <View style={styles.cell}>
        <View style={styles.cellItem}>
          <Text style={styles.itemIcon}>{'\ue701'}</Text>
          <Text style={styles.itemText}>兴趣爱好</Text>
          <Text style={styles.itemArrow}>{'\ue906'}</Text>
        </View>
        <Pressable
          onPress={() => props?.navigation.push('Project')}
          style={styles.cellItem}
        >
          <Text style={styles.itemIcon}>{'\ue655'}</Text>
          <Text style={styles.itemText}>关于项目</Text>
          <Text style={styles.itemArrow}>{'\ue906'}</Text>
        </Pressable>
        <Pressable
          onPress={() => props?.navigation.push('Author')}
          style={styles.cellItem}
        >
          <Text style={styles.itemIcon}>{'\ue634'}</Text>
          <Text style={styles.itemText}>关于作者</Text>
          <Text style={styles.itemArrow}>{'\ue906'}</Text>
        </Pressable>
        <Pressable
          onPress={() => props?.navigation.push('Changelog')}
          style={[styles.cellItem, styles.cellLastItem]}
        >
          <Text style={styles.itemIcon}>{'\ue60b'}</Text>
          <Text style={styles.itemText}>更新日志</Text>
          <Text style={styles.itemArrow}>{'\ue906'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Mine;
