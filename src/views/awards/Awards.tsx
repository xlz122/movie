import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { viewHeight } from '@/utils/screen';
import { movieAwards } from '@/api/home';
import type { ResponseType } from '@/types/index';

function Awards(): React.ReactElement {
  const [awards, setAwards] = useState<Array<{ title?: string }>>([]);

  const getMovieAwards = () => {
    movieAwards()
      .then((res: ResponseType) => {
        if (res.code === 200) {
          setAwards(res.data);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getMovieAwards();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
      <View style={styles.list}>
        {awards.map((item, index) => {
          return (
            <View
              key={index}
              style={[
                styles.item,
                index % 1 === 0 ? styles.itemLine : styles.item
              ]}
            >
              <Text style={styles.itemTitle}>{item?.title}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    // web端需减去标题栏高度
    height: Platform.OS === 'web' ? viewHeight - 42 : viewHeight,
    backgroundColor: '#fff'
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 40,
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#eee'
  },
  itemLine: {
    borderRightWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#eee'
  },
  itemTitle: {
    fontSize: 12.3,
    color: '#303133'
  }
});

export default Awards;
