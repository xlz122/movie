import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { actorsDetail } from '@/api/actor';
import type { RouteProp } from '@react-navigation/native';
import type { Navigation, ResponseType } from '@/types/index';
import styles from './actor-summary.css';

type Route = RouteProp<{ params: { id: number } }>;

type DetailType = {
  name: string;
  name_en: string;
  gender: string;
  birthday: string;
  age: string;
  country: string;
  born_place: string;
  professions: Array<string>;
  constellation: string;
  height: string;
  blood_type: string;
  summary: string;
};

function ActorSummary(): React.ReactElement {
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

  return (
    <View style={styles.page}>
      <ScrollView style={styles.baseInfo}>
        <View style={styles.group}>
          <Text style={styles.title}>基本信息</Text>
          <View style={styles.item}>
            <Text style={styles.itemLabel}>中文名: </Text>
            <Text style={styles.itemValue}>{detail.name}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemLabel}>英文名: </Text>
            <Text style={styles.itemValue}>{detail.name_en}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemLabel}>性别: </Text>
            <Text style={styles.itemValue}>{detail.gender}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemLabel}>生日: </Text>
            <Text style={styles.itemValue}>{detail.birthday}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemLabel}>年龄: </Text>
            <Text style={styles.itemValue}>{detail.age}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemLabel}>国籍: </Text>
            <Text style={styles.itemValue}>{detail.country}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemLabel}>出生地: </Text>
            <Text style={styles.itemValue}>{detail.born_place}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemLabel}>职业: </Text>
            <Text style={styles.itemValue}>
              {detail.professions?.join?.(',')}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemLabel}>星座: </Text>
            <Text style={styles.itemValue}>{detail.constellation}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemLabel}>身高: </Text>
            <Text style={styles.itemValue}>{detail.height}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemLabel}>血型: </Text>
            <Text style={styles.itemValue}>{detail.blood_type}</Text>
          </View>
        </View>
        <View style={styles.group}>
          <Text style={styles.title}>简介</Text>
          <Text style={styles.summary}>{detail.summary}</Text>
        </View>
      </ScrollView>
      <Pressable onPress={navigation.goBack} style={styles.footer}>
        <View style={styles.close}>
          <Text style={styles.closeIcon}>{'\ue612'}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default ActorSummary;
