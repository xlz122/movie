import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { timeStampToDuration, formatDistance } from '@/utils/utils';
import { userVideos } from '@/api/mine';
import type { ListRenderItemInfo } from 'react-native';
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

  const renderItem = ({ item }: ListRenderItemInfo<ItemType>) => (
    <Pressable onPress={() => navigation.push('VideoDetail', { id: item.id })}>
      <View style={styles.item}>
        <View style={styles.itemCover}>
          <Image
            source={{ uri: item.poster }}
            resizeMode="stretch"
            style={styles.itemImage}
          />
          <Text style={styles.itemDuration}>
            {timeStampToDuration(item.duration)}
          </Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <View style={styles.intro}>
            <Text style={styles.introText}>
              <Text>{item.like_count}</Text>
              <Text>赞</Text>
              <Text> · </Text>
              <Text>{item.play_count}</Text>
              <Text>播放</Text>
            </Text>
            <Text style={styles.introText}>
              {formatDistance(item.created_at)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  const ListEmptyComponent = (): React.ReactElement => (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>您还没有收藏任何视频</Text>
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
        request={userVideos}
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
  itemCover: {
    position: 'relative'
  },
  itemImage: {
    width: 120,
    height: 68,
    borderRadius: 3
  },
  itemDuration: {
    position: 'absolute',
    right: 6,
    bottom: 10,
    zIndex: 9,
    fontSize: 9,
    color: '#ffffff'
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  itemTitle: {
    fontWeight: '700',
    fontSize: 13,
    color: '#303133'
  },
  intro: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  introText: {
    fontSize: 11,
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

export default UserVideo;
