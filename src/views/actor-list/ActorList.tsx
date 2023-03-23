import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { viewHeight } from '@/utils/screen';
import { movieActor } from '@/api/movies';
import type { RouteProp } from '@react-navigation/native';
import type { Navigation, ResponseType } from '@/types/index';

type Route = RouteProp<{ params: { movieId: number } }>;

type ComingType = {
  list: ItemType[];
  stickyIndex: number[];
};

type ItemType = {
  stickyTitle?: string;
  id?: number;
  avatar?: string;
  name?: string;
  name_en?: string;
  gender?: string;
  country?: string;
  count?: number;
  lastItem?: boolean;
};

function ActorList(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();

  const [actor, setActor] = useState<ComingType>({
    list: [],
    stickyIndex: []
  });

  const getMovieActor = (): void => {
    movieActor({ id: route.params.movieId })
      .then((res: ResponseType<any[]>) => {
        if (res.code === 200) {
          const list: ItemType[] = [];
          const stickyIndex: number[] = [];

          res.data?.forEach(item => {
            const isExist = list.find(t => t.name === item.name);

            // 吸顶标题、索引
            if (!isExist) {
              list.push({
                stickyTitle: item.name,
                count: item.children.length
              });
              stickyIndex.push(list.length - 1);
            }

            // 演员项
            item.children.forEach((i: ItemType, ind: number) => {
              if (ind === item.children.length - 1) {
                list.push({ ...i, lastItem: true });
                return false;
              }

              list.push(i);
            });
          });

          setActor({ list, stickyIndex });
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getMovieActor();
  }, []);

  const renderItem = ({ item }: { item: ItemType }) => (
    <>
      {item.stickyTitle && (
        <View style={styles.sticky}>
          <View style={styles.stickySpot} />
          <Text style={styles.stickyText}>{item.stickyTitle}</Text>
          <Text style={styles.stickyCount}>({item.count})</Text>
        </View>
      )}
      {!item.stickyTitle && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.push('ActorDetail', { id: item.id })}
        >
          <View
            style={[styles.item, item.lastItem ? styles.lastItem : styles.item]}
          >
            <Image
              source={{ uri: item.avatar }}
              resizeMode={'stretch'}
              style={[styles.itemImage]}
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemText}>{item.name_en}</Text>
              <Text style={styles.itemText}>
                {item?.gender}
                {Boolean(item?.country) && (
                  <>
                    <Text> · </Text>
                    {item?.country}
                  </>
                )}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );

  return (
    <View style={styles.page}>
      {Boolean(actor.list.length) && (
        <FlatList
          stickyHeaderIndices={actor.stickyIndex}
          data={actor.list}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingBottom: 10,
    // web端需要减去标题高度
    height: Platform.OS === 'web' ? viewHeight - 42 : viewHeight,
    backgroundColor: '#fff'
  },
  sticky: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 45,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5'
  },
  stickySpot: {
    width: 4,
    height: 4,
    marginRight: 5,
    backgroundColor: '#f8a52d'
  },
  stickyText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#303133'
  },
  stickyCount: {
    marginLeft: 3,
    fontSize: 10,
    color: '#303133'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 8,
    marginHorizontal: 15,
    borderBottomWidth: 0.38,
    borderStyle: 'solid',
    borderColor: '#dedede'
  },
  itemImage: {
    width: 68,
    height: 90,
    borderRadius: 3
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 13
  },
  itemTitle: {
    marginBottom: 1,
    fontSize: 14,
    color: '#333'
  },
  itemText: {
    marginTop: 4,
    fontSize: 12,
    color: '#999'
  },
  lastItem: {
    borderBottomWidth: 0
  }
});

export default ActorList;
