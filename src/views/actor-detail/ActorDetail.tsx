import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { actorsDetail } from '@/api/actor';
import type { RouteProp } from '@react-navigation/native';
import type { ResponseType, Navigation } from '@/types/index';
import type { ActorPhotoItem } from './actor-photo/ActorPhoto';
import type { ActorWorkItem } from './actor-wroks/ActorWorks';
import CustomHeader from '@/components/custom-header/CustomHeader';
import Panel from '@/components/panel/Panel';
import ActorInfo from './actor-info/ActorInfo';
import ActorPhoto from './actor-photo/ActorPhoto';
import ActorWorks from './actor-wroks/ActorWorks';
import styles from './actor-detail.css';

type Route = RouteProp<{ params: { id: number } }>;

type ActorDetailType = {
  id?: number;
  collection_count?: number;
  works_count?: number;
  role_count?: number;
  award?: {
    poster: string;
    title: string;
  };
  award_count?: number;
  summary?: string;
  photo_count?: number;
  photos?: ActorPhotoItem[];
  works?: ActorWorkItem[];
};

function ActorDetail(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();

  const [detail, setDetail] = useState<ActorDetailType>({});

  const getActorDetail = () => {
    actorsDetail({ id: route.params.id })
      .then((res: ResponseType) => {
        if (res.code === 200) {
          setDetail(res.data);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getActorDetail();
  }, []);

  const refreshDetail = () => {
    getActorDetail();
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
      <ActorInfo detail={detail} refreshDetail={refreshDetail} />
      <View style={styles.count}>
        <View style={styles.countItem}>
          <Text style={styles.itemContent}>{detail?.collection_count}人</Text>
          <Text style={styles.itemText}>已关注数</Text>
        </View>
        <View style={styles.countItem}>
          <Text style={styles.itemContent}>{detail?.works_count}部</Text>
          <Text style={styles.itemText}>作品总数</Text>
        </View>
        <View style={[styles.countItem, styles.countLastItem]}>
          <Text style={styles.itemContent}>{detail?.role_count}个</Text>
          <Text style={styles.itemText}>饰演角色</Text>
        </View>
      </View>
      {Number(detail?.award_count) > 0 && (
        <View style={styles.award}>
          <Image
            source={{ uri: detail?.award?.poster }}
            resizeMode={'cover'}
            style={[styles.awardImage]}
          />
          <Text style={styles.awardTitle}>{detail?.award?.title}</Text>
          <View style={styles.awardCount}>
            <Text style={styles.awardCountText}>
              {`获奖${detail?.award_count}次`}
            </Text>
            <Text style={styles.awardCountIcon}>{'\ue906'}</Text>
          </View>
        </View>
      )}
      <Panel
        title="个人简介"
        subtitle={'更多信息'}
        to={{ path: 'ActorSummary', params: { detail: detail } }}
      >
        {Boolean(detail?.summary) && (
          <Text numberOfLines={4} ellipsizeMode="tail" style={styles.summary}>
            {detail?.summary}
          </Text>
        )}
        {!detail?.summary && (
          <View style={styles.noSummary}>
            <Text style={styles.noSummaryText}>暂无简介</Text>
          </View>
        )}
      </Panel>
      {Number(detail?.photo_count) > 0 && (
        <Panel
          title="相册"
          subtitle={`全部${detail?.photo_count}张`}
          to={{ path: 'ActorPhotoDetail', params: { id: route.params.id } }}
        >
          <ActorPhoto photo={detail?.photos || []} />
        </Panel>
      )}
      {Number(detail?.works_count) > 0 && (
        <Panel
          title="影视作品"
          subtitle={`全部${detail?.works_count}部`}
          to={{ path: 'ActorWorksList', params: { id: route.params.id } }}
          panelStyle={{ paddingBottom: 10 }}
        >
          <ActorWorks movie={detail?.works} />
        </Panel>
      )}
    </ScrollView>
  );
}

export default ActorDetail;
