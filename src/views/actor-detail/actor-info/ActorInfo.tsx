import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { followActor, unFollowActor } from '@/api/actor';
import type { RootState } from '@/store/index';
import type { Navigation, ResponseType } from '@/types/index';
import CustomAlert from '@/components/custom-alert/CustomAlert';

type Props = {
  detail: Partial<{
    id: number;
    avatar: string;
    name: string;
    name_en: string;
    gender: string;
    birthday: string;
    country: string;
    is_collection: number;
  }>;
  onRefresh: () => void;
};

function ActorInfo(props: Props): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const isLogin = useSelector((state: RootState) => state.routine.isLogin);

  // 关注/取消关注
  const handleFollowChange = (): void => {
    if (!isLogin) {
      navigation.push('Login');
      return;
    }

    if (props.detail?.is_collection === 0) {
      followActor({ id: props.detail.id! })
        .then((res: ResponseType) => {
          if (res?.code !== 200) {
            return;
          }

          props.onRefresh?.();
          CustomAlert({ title: '提示', message: res.message });
        })
        .catch(() => ({}));
    }

    if (props.detail?.is_collection === 1) {
      unFollowActor({ id: props.detail.id! })
        .then((res: ResponseType) => {
          if (res?.code !== 200) {
            return;
          }

          props.onRefresh?.();
          CustomAlert({ title: '提示', message: res.message });
        })
        .catch(() => ({}));
    }
  };

  return (
    <View style={styles.actorInfo}>
      {props.detail.avatar && (
        <Image
          source={{ uri: props.detail.avatar }}
          resizeMode="cover"
          style={styles.image}
        />
      )}
      <View style={styles.info}>
        <View style={styles.brief}>
          <Text style={styles.briefName}>{props.detail.name}</Text>
          <Text style={styles.briefEnName}>{props.detail.name_en}</Text>
          <Text style={styles.briefExtra}>
            <Text>{props.detail.gender}</Text>
            {props.detail.birthday && (
              <>
                <Text> · </Text>
                <Text>{props.detail.birthday}</Text>
              </>
            )}
            {props.detail.country && (
              <>
                <Text> · </Text>
                <Text>{props.detail.country}</Text>
              </>
            )}
          </Text>
        </View>
        <Text
          onPress={handleFollowChange}
          style={
            props.detail.is_collection === 1 ? styles.followed : styles.follow
          }
        >
          {`${props.detail.is_collection === 1 ? '已关注' : '关注'}`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actorInfo: {
    position: 'relative',
    width: '100%',
    height: 230,
    backgroundColor: 'rgba(229, 72, 71, 0.85)',
    overflow: 'hidden'
  },
  image: {
    height: 398
  },
  info: {
    position: 'absolute',
    left: 0,
    bottom: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10
  },
  brief: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  briefName: {
    fontSize: 18,
    color: '#ffffff'
  },
  briefEnName: {
    fontSize: 12,
    color: '#cccccc'
  },
  briefExtra: {
    fontSize: 12,
    color: '#dddddd'
  },
  follow: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    backgroundColor: 'hsla(0, 0%, 100%, 0.25)',
    fontSize: 12,
    color: '#ffffff',
    borderRadius: 50
  },
  followed: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    backgroundColor: 'rgba(229, 72, 71, 0.3)',
    fontSize: 12,
    color: '#ffffff',
    borderRadius: 50
  }
});

export default ActorInfo;
