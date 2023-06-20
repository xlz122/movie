import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { formatDate } from '@/utils/utils';
import type { ViewStyle } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import type { ResponseType } from '@/types/index';
import ScrollRefresh from '@/components/scroll-refresh/ScrollRefresh';
import styles from './comment.css';

type Route = RouteProp<{ params: { id: number } }>;

type Props = {
  method: Function;
  close?: () => void;
  commentStyle?: ViewStyle;
};

type ItemType = {
  id: number;
  author: {
    avatar: string;
    username: string;
  };
  content: string;
  created_at: string;
  like_count: number;
  is_delete: number;
};

function Comment(props: Props): React.ReactElement {
  const route: Route = useRoute();

  // 刷新列表
  const [resetRefresh, setResetRefresh] = useState(false);

  const handleRefreshSuccess = () => {
    setResetRefresh(false);
  };

  const [sort, setSort] = useState({
    active: 'hot',
    list: [
      {
        title: '热度',
        type: 'hot'
      },
      {
        title: '最新',
        type: 'created_at'
      }
    ]
  });

  const toggleSort = (value: string): void => {
    setResetRefresh(true);
    setSort({ ...sort, active: value });
  };

  // 评论总数
  const [commentCount, setCommentCount] = useState(0);

  const handleResponseSuccess = (res: ResponseType) => {
    setCommentCount(res?.total || 0);
  };

  const renderItem = ({ item }: { item: ItemType }) => (
    <View style={styles.item}>
      <View style={styles.itemCover}>
        <Image
          source={{ uri: item?.author?.avatar }}
          resizeMode={'stretch'}
          style={[styles.itemImage]}
        />
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.itemCoverText}
        >
          {item?.author?.username}
        </Text>
        <Pressable>
          <Text style={styles.itemMoreIcon}>{'\ue85c'}</Text>
        </Pressable>
      </View>
      <View style={styles.itemContent}>
        {item.is_delete === 0 && (
          <Text style={styles.itemText}>{item.content}</Text>
        )}
        {item.is_delete === 1 && (
          <Text style={styles.itemDeleteText}>{item.content}</Text>
        )}
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.infoText}>{formatDate(item.created_at)}</Text>
        <View style={styles.infoDesc}>
          <Text style={styles.descText}>{item.like_count}</Text>
          <Text style={styles.descIcon}>{'\ue669'}</Text>
        </View>
      </View>
    </View>
  );

  // 无数据展示
  const ListEmptyComponent = (): React.ReactElement => (
    <View style={styles.emptyData}>
      <Text style={styles.emptyDataText}>还没有用户发表过评论</Text>
    </View>
  );

  return (
    <View style={[styles.comment, props?.commentStyle]}>
      <View style={styles.mask} />
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Text style={styles.headerTitle}>全部评论</Text>
          <Pressable
            onPress={() => props.close && props.close()}
            style={styles.headerClose}
          >
            <Text style={styles.headerCloseIcon}>{'\ue612'}</Text>
          </Pressable>
        </View>
        <View style={styles.modalBody}>
          {commentCount > 0 && (
            <View style={styles.bodyTitle}>
              <Text style={styles.titleText}>评论 {commentCount}</Text>
              <View style={styles.titleTab}>
                {sort.list.map((item, index) => {
                  return (
                    <Text
                      key={index}
                      onPress={() => toggleSort(item.type)}
                      style={[
                        styles.tabItem,
                        item.type === sort.active
                          ? styles.tabActiveItem
                          : styles.tabItem
                      ]}
                    >
                      {item.title}
                    </Text>
                  );
                })}
              </View>
            </View>
          )}
          <ScrollRefresh
            requestParams={{
              id: route.params.id,
              page: 1,
              pageSize: 10,
              sortby: sort.active
            }}
            request={props?.method}
            responseSuccess={handleResponseSuccess}
            renderItem={renderItem}
            initialNumToRender={6}
            resetRefresh={resetRefresh}
            refreshSuccess={handleRefreshSuccess}
            ListEmptyComponent={<ListEmptyComponent />}
          />
        </View>
        <View style={styles.modalFooter}>
          <Text style={styles.reviewInput}>来点碎碎念...</Text>
        </View>
      </View>
    </View>
  );
}

export default Comment;
