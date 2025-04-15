import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { actorPhotos } from '@/api/actor';
import type { RouteProp } from '@react-navigation/native';
import type { ResponseType } from '@/types/index';

type Route = RouteProp<{ params: { id: number } }>;

function ActorPhotoDetail(): React.ReactElement {
  const route: Route = useRoute();

  const [params, setParams] = useState({
    type: 'all',
    page: 1,
    per_page: 10
  });
  const [photos, setPhotos] = useState<Array<{ url: string }>>([]);

  const getPhotos = (): void => {
    actorPhotos({ ...params, id: route.params.id })
      .then((res: ResponseType) => {
        if (res?.code !== 200) {
          return;
        }

        setPhotos(res.data ?? []);
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getPhotos();
  }, [params]);

  const [tab] = useState([
    { title: '全部', type: 'all' },
    { title: '写真', type: 'portrait' },
    { title: '截图', type: 'cut' },
    { title: '其他', type: 'other' }
  ]);

  const tabChange = (value: string): void => {
    setParams({ ...params, type: value });
  };

  return (
    <ScrollView style={styles.page}>
      <View style={styles.tab}>
        {tab.map?.((item, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => tabChange(item.type)}
              style={styles.tabItem}
            >
              <Text style={params.type === item.type ? styles.activeText : styles.itemText}>
                {item.title}
              </Text>
              <View style={params.type === item.type ? styles.activeLine : null} />
            </Pressable>
          );
        })}
      </View>
      <View style={styles.list}>
        {photos.map?.((item, index) => {
          return (
            <View key={index} style={styles.item}>
              <Image
                source={{ uri: item.url }}
                resizeMode="stretch"
                style={styles.itemImage}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff'
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 44,
    borderBottomWidth: 0.48,
    borderStyle: 'solid',
    borderColor: '#e5e5e5'
  },
  tabItem: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 12,
    color: '#7d7e80'
  },
  activeText: {
    fontSize: 12,
    color: '#e54847'
  },
  activeLine: {
    position: 'absolute',
    bottom: 2.8,
    width: 24,
    height: 4,
    backgroundColor: '#e54847',
    borderRadius: 6
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    margin: 10
  },
  item: {
    width: 92,
    height: 'auto'
  },
  itemImage: {
    width: 92,
    height: 124,
    borderRadius: 3
  }
});

export default ActorPhotoDetail;
