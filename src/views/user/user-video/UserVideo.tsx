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
import { timeStampToDuration, formatDate } from '@/utils/utils';
import { viewHeight } from '@/utils/screen';
import { userVideos } from '@/api/mine';
import type { Navigation } from '@/types/index';
import ScrollRefresh from '@/components/scroll-refresh/ScrollRefresh';

type ItemType = {
  id: number;
  poster: string;
  duration: number;
  title: string;
  like_count: number;
  play_count: number;
  created_at: string;
};

function UserVideo(): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const renderItem = ({ item }: { item: ItemType }) => (
    <Pressable onPress={() => navigation.push('VideoDetail', { id: item.id })}>
      <View style={styles.item}>
        <View style={styles.itemCover}>
          <Image
            source={{ uri: item.poster }}
            resizeMode={'stretch'}
            style={[styles.itemImage]}
          />
          <Text style={styles.coverText}>
            {timeStampToDuration(item.duration)}
          </Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.infoTitle}>{item.title}</Text>
          <View style={styles.infoDesc}>
            <Text style={styles.descText}>
              {item.like_count}
              <Text>赞</Text>
              <Text> · </Text>
              {item.play_count}
              <Text>播放</Text>
            </Text>
            <Text style={styles.descText}>{formatDate(item.created_at)}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  // 无数据展示
  const ListEmptyComponent = (): React.ReactElement => (
    <View style={styles.emptyData}>
      <Text style={styles.emptyDataText}>您还没有收藏任何视频</Text>
    </View>
  );

  return (
    <View style={styles.page}>
      <ScrollRefresh
        requestParams={{
          page: 1,
          pageSize: 10
        }}
        request={userVideos}
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
    // web端需要减去标题高度
    height: Platform.OS === 'web' ? viewHeight - 42 : viewHeight,
    backgroundColor: '#fff'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 16,
    marginLeft: 16
  },
  itemCover: {
    position: 'relative'
  },
  itemImage: {
    width: 117,
    height: 66,
    borderRadius: 3
  },
  coverText: {
    position: 'absolute',
    top: 47,
    right: 6,
    zIndex: 2,
    fontSize: 9,
    color: '#fff'
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  infoTitle: {
    fontWeight: '700',
    fontSize: 13,
    color: '#303133'
  },
  infoDesc: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  descText: {
    fontSize: 10,
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

export default UserVideo;
