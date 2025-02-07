import React, { useState, useLayoutEffect, useEffect } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { actorsDetail } from '@/api/actor';
import type { RouteProp } from '@react-navigation/native';
import type { Navigation, ResponseType } from '@/types/index';
import type { ActorPhotoItem } from './actor-photo/ActorPhoto';
import type { ActorWorkItem } from './actor-wroks/ActorWorks';
import type { ActorRoleItem } from './actor-role/ActorRole';
import CustomHeader from '@/components/custom-header/CustomHeader';
import Panel from '@/components/panel/Panel';
import ActorInfo from './actor-info/ActorInfo';
import ActorPhoto from './actor-photo/ActorPhoto';
import ActorWorks from './actor-wroks/ActorWorks';
import ActorRole from './actor-role/ActorRole';
import styles from './actor-detail.css';

type Route = RouteProp<{ params: { id: number } }>;

type DetailType = {
  id: number;
  collection_count: number;
  works_count: number;
  role_count: number;
  award: {
    poster: string;
    title: string;
  };
  award_count: number;
  summary: string;
  photo_count: number;
  photos: ActorPhotoItem[];
  works: ActorWorkItem[];
  roles: ActorRoleItem[];
};

function ActorDetail(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();

  const [detail, setDetail] = useState<Partial<DetailType>>({});

  const getActorDetail = (): void => {
    actorsDetail({ id: route.params.id })
      .then((res: ResponseType) => {
        if (res?.code !== 200) {
          return;
        }

        setDetail(res.data ?? {});
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getActorDetail();
  }, []);

  const handleRefresh = (): void => {
    getActorDetail();
  };

  useLayoutEffect(() => {
    // 自定义标头
    navigation.setOptions({
      header: ({ options }) => {
        return (
          <CustomHeader
            options={options}
            headerStyle={{ height: 0 }}
            arrowStyle={{ position: 'absolute', top: 0 }}
          />
        );
      }
    });
  }, []);

  return (
    <ScrollView style={styles.page}>
      <ActorInfo detail={detail} onRefresh={handleRefresh} />
      <View style={styles.count}>
        <View style={styles.countItem}>
          <Text style={styles.itemValue}>{detail.collection_count}人</Text>
          <Text style={styles.itemLabel}>已关注数</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.countItem}>
          <Text style={styles.itemValue}>{detail.works_count}部</Text>
          <Text style={styles.itemLabel}>作品总数</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.countItem}>
          <Text style={styles.itemValue}>{detail.role_count}个</Text>
          <Text style={styles.itemLabel}>饰演角色</Text>
        </View>
      </View>
      {Number(detail.award_count) > 0 && (
        <View style={styles.award}>
          <Image
            source={{ uri: detail.award?.poster }}
            resizeMode="cover"
            style={styles.awardImage}
          />
          <Text style={styles.awardTitle}>{detail.award?.title}</Text>
          <View style={styles.awardCount}>
            <Text style={styles.countText}>
              {`获奖${detail.award_count}次`}
            </Text>
            <Text style={styles.countIcon}>{'\ue906'}</Text>
          </View>
        </View>
      )}
      <Panel
        title="个人简介"
        subtitle="更多信息"
        to={{ path: 'ActorSummary', params: { id: route.params.id } }}
      >
        {!detail.summary && (
          <View style={styles.noSummary}>
            <Text style={styles.noSummaryText}>暂无简介</Text>
          </View>
        )}
        {detail.summary && (
          <Text numberOfLines={4} ellipsizeMode="tail" style={styles.summary}>
            {detail.summary}
          </Text>
        )}
      </Panel>
      {detail.photos && detail.photos?.length > 0 && (
        <Panel
          title="相册"
          subtitle={`${detail.photo_count}张`}
          to={{ path: 'ActorPhotoDetail', params: { id: route.params.id } }}
        >
          <ActorPhoto list={detail.photos} />
        </Panel>
      )}
      {detail.works && detail.works?.length > 0 && (
        <Panel
          title="影视作品"
          subtitle={`${detail.works_count}部`}
          to={{ path: 'ActorWorksList', params: { id: route.params.id } }}
        >
          <ActorWorks list={detail.works} />
        </Panel>
      )}
      {detail.roles && detail.roles?.length > 0 && (
        <Panel title="饰演角色" subtitle={`${detail.role_count}部`}>
          <ActorRole list={detail.roles} />
        </Panel>
      )}
    </ScrollView>
  );
}

export default ActorDetail;
