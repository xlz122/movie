import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { formatDistance } from '@/utils/utils';
import type { ListRenderItemInfo } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import type { ResponseType } from '@/types/index';
import ScrollRefresh from '@/components/scroll-refresh/ScrollRefresh';
import styles from './comment.css';

type Route = RouteProp<{ params: { id: number } }>;

type Props = {
  method: Function;
  onClose?: () => void;
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

  const [params, setParams] = useState({
    type: 'hot',
    page: 1,
    per_page: 10
  });

  const [tab] = useState([
    { title: '热度', type: 'hot' },
    { title: '最新', type: 'created_at' }
  ]);

  const tabChange = (value: string): void => {
    setParams({ ...params, type: value });
  };

  // 评论总数
  const [count, setCount] = useState(0);

  const handleResponseSuccess = (res: ResponseType & { total?: number }) => {
    setCount(res.total ?? 0);
  };

  const renderItem = ({ item }: ListRenderItemInfo<ItemType>) => (
    <View style={styles.item}>
      <View style={styles.itemCover}>
        <Image
          source={{ uri: item.author?.avatar }}
          resizeMode="stretch"
          style={styles.itemImage}
        />
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.authorName}>
          {item.author?.username}
        </Text>
        {item.is_delete !== 1 && (
          <Text style={styles.moreIcon}>{'\ue85c'}</Text>
        )}
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
        <Text style={styles.itemDuration}>
          {formatDistance(item.created_at)}
        </Text>
        {item.is_delete !== 1 && (
          <View style={styles.tool}>
            <Text style={styles.toolText}>{item.like_count}</Text>
            <Text style={styles.toolIcon}>{'\ue669'}</Text>
          </View>
        )}
      </View>
    </View>
  );

  const ListEmptyComponent = (): React.ReactElement => (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>还没有用户发表过评论</Text>
    </View>
  );

  return (
    <View style={styles.comment}>
      <View style={styles.mask} />
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Text style={styles.title}>全部评论</Text>
          <Pressable onPress={() => props.onClose?.()} style={styles.close}>
            <Text style={styles.closeIcon}>{'\ue612'}</Text>
          </Pressable>
        </View>
        <View style={styles.modalBody}>
          <View style={styles.count}>
            <Text style={styles.countText}>评论 {count}</Text>
            <View style={styles.tab}>
              {tab.map?.((item, index) => {
                return (
                  <Text
                    key={index}
                    onPress={() => tabChange(item.type)}
                    style={params.type === item.type ? styles.tabActiveItem : styles.tabItem}
                  >
                    {item.title}
                  </Text>
                );
              })}
            </View>
          </View>
          <ScrollRefresh
            initialNumToRender={10}
            requestParams={{
              id: route.params.id,
              sortby: params.type,
              page: params.page,
              pageSize: params.per_page
            }}
            sortParams={{ sortby: params.type }}
            request={props.method}
            responseSuccess={handleResponseSuccess}
            renderItem={renderItem}
            ListEmptyComponent={<ListEmptyComponent />}
          />
        </View>
        <View style={styles.modalFooter}>
          <View style={styles.review}>
            <Text style={styles.reviewText}>来点碎碎念...</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Comment;
