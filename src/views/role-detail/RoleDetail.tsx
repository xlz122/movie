import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { roleDetail } from '@/api/role';
import type { RouteProp } from '@react-navigation/native';
import type { ResponseType, Navigation } from '@/types/index';
import type { PhotoItemType } from './role-photo/RolePhoto';
import type { MovieItemType } from './role-movie/RoleMovie';
import type { ActorItemType } from './role-actor/RoleActor';
import CustomHeader from '@/components/custom-header/CustomHeader';
import Panel from '@/components/panel/Panel';
import RoleInfo from './role-info/RoleInfo';
import RolePhoto from './role-photo/RolePhoto';
import RoleMovie from './role-movie/RoleMovie';
import RoleActor from './role-actor/RoleActor';
import styles from './role-detail.css';

type Route = RouteProp<{ params: { id: number } }>;

type RoleDetailType = {
  id?: number;
  collection_count?: number;
  movie_count?: number;
  actor_count?: number;
  brief?: string;
  photo_count?: number;
  photos?: PhotoItemType[];
  movies?: MovieItemType[];
  actors?: ActorItemType[];
};

function ActorDetail(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();

  const [detail, setDetail] = useState<RoleDetailType>({});

  const getRoleDetail = () => {
    roleDetail({ id: route.params.id })
      .then((res: ResponseType) => {
        if (res.code === 200) {
          setDetail(res.data);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getRoleDetail();
  }, []);

  // 刷新详情
  const refreshDetail = () => {
    getRoleDetail();
  };

  useLayoutEffect(() => {
    // 设置标头
    navigation.setOptions({
      header: ({ options }) => {
        return (
          <CustomHeader
            options={options}
            headerStyle={{ height: 0 }}
            arrowStyle={{ position: 'absolute', top: 2 }}
          />
        );
      }
    });
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
      <RoleInfo detail={detail} refreshDetail={refreshDetail} />
      <View style={styles.count}>
        <View style={styles.countItem}>
          <Text style={styles.itemContent}>{detail?.collection_count}人</Text>
          <Text style={styles.itemText}>关注数</Text>
        </View>
        <View style={styles.countItem}>
          <Text style={styles.itemContent}>{detail?.movie_count}部</Text>
          <Text style={styles.itemText}>影视数</Text>
        </View>
        <View style={[styles.countItem, styles.countLastItem]}>
          <Text style={styles.itemContent}>{detail?.actor_count}个</Text>
          <Text style={styles.itemText}>影人数</Text>
        </View>
      </View>
      <Panel title="个人简介" subtitle={'更多信息'}>
        {Boolean(detail?.brief) && (
          <Text numberOfLines={4} ellipsizeMode="tail" style={styles.summary}>
            {detail?.brief}
          </Text>
        )}
        {!detail?.brief && (
          <View style={styles.noSummary}>
            <Text style={styles.noSummaryText}>暂无简介</Text>
          </View>
        )}
      </Panel>
      {Boolean(detail?.photo_count) && (
        <Panel title="相册" subtitle={`全部${detail?.photo_count}张`}>
          <RolePhoto photo={detail?.photos || []} />
        </Panel>
      )}
      {Boolean(detail?.movie_count) && (
        <Panel
          title="角色影视"
          subtitle={`全部${detail?.movie_count}部`}
          panelStyle={{ paddingBottom: 10 }}
        >
          <RoleMovie movie={detail?.movies} />
        </Panel>
      )}
      {Boolean(detail?.actor_count) && (
        <Panel
          title="角色影人"
          subtitle={`全部${detail?.actor_count}部`}
          panelStyle={{ paddingBottom: 10 }}
        >
          <RoleActor movie={detail?.actors} />
        </Panel>
      )}
    </ScrollView>
  );
}

export default ActorDetail;
