import React, { useState, useLayoutEffect, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { roleDetail } from '@/api/role';
import type { RouteProp } from '@react-navigation/native';
import type { Navigation, ResponseType } from '@/types/index';
import type { RolePhotoItem } from './role-photo/RolePhoto';
import type { RoleMovieItem } from './role-movie/RoleMovie';
import type { RoleActorItem } from './role-actor/RoleActor';
import CustomHeader from '@/components/custom-header/CustomHeader';
import Panel from '@/components/panel/Panel';
import RoleInfo from './role-info/RoleInfo';
import RolePhoto from './role-photo/RolePhoto';
import RoleMovie from './role-movie/RoleMovie';
import RoleActor from './role-actor/RoleActor';
import styles from './role-detail.css';

type Route = RouteProp<{ params: { id: number } }>;

type DetailType = {
  id: number;
  collection_count: number;
  movie_count: number;
  actor_count: number;
  brief: string;
  photo_count: number;
  photos: RolePhotoItem[];
  movies: RoleMovieItem[];
  actors: RoleActorItem[];
};

function RoleDetail(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();

  const [detail, setDetail] = useState<Partial<DetailType>>({});

  const getRoleDetail = async () => {
    const res: ResponseType = await roleDetail({ id: route.params.id });
    if (res?.code !== 200) {
      return;
    }

    setDetail(res.data ?? {});
  };

  useEffect(() => {
    getRoleDetail();
  }, []);

  const handleRefresh = () => {
    getRoleDetail();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: ({ options }) => (
        <CustomHeader
          options={options}
          headerStyle={{
            height: 0,
            paddingTop: 0,
            backgroundColor: 'transparent'
          }}
          arrowStyle={{ position: 'absolute', top: 25 }}
        />
      )
    });
  }, []);

  return (
    <ScrollView style={styles.page}>
      <RoleInfo detail={detail} onRefresh={handleRefresh} />
      <View style={styles.count}>
        <View style={styles.countItem}>
          <Text style={styles.itemValue}>{detail.collection_count}人</Text>
          <Text style={styles.itemLabel}>关注数</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.countItem}>
          <Text style={styles.itemValue}>{detail.movie_count}部</Text>
          <Text style={styles.itemLabel}>影视数</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.countItem}>
          <Text style={styles.itemValue}>{detail.actor_count}个</Text>
          <Text style={styles.itemLabel}>影人数</Text>
        </View>
      </View>
      <Panel title="个人简介" subtitle="更多信息">
        {detail.brief?.length !== 0 && (
          <Text ellipsizeMode="tail" numberOfLines={4} style={styles.brief}>
            {detail.brief}
          </Text>
        )}
        {detail.brief?.length === 0 && (
          <View style={styles.noBrief}>
            <Text style={styles.noBriefText}>暂无简介</Text>
          </View>
        )}
      </Panel>
      {detail.photos && detail.photos.length !== 0 && (
        <Panel title="相册" subtitle={`${detail.photo_count}张`}>
          <RolePhoto list={detail.photos} />
        </Panel>
      )}
      {detail.movies && detail.movies.length !== 0 && (
        <Panel title="角色影视" subtitle={`${detail.movie_count}部`}>
          <RoleMovie list={detail.movies} />
        </Panel>
      )}
      {detail.actors && detail.actors?.length !== 0 && (
        <Panel title="角色影人" subtitle={`${detail.actor_count}人`}>
          <RoleActor list={detail.actors} />
        </Panel>
      )}
    </ScrollView>
  );
}

export default RoleDetail;
