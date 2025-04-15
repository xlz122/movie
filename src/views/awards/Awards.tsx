import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { movieAwards } from '@/api/home';
import type { ResponseType } from '@/types/index';

function Awards(): React.ReactElement {
  const [awards, setAwards] = useState<Array<{ title: string }>>([]);

  const getMovieAwards = (): void => {
    movieAwards()
      .then((res: ResponseType) => {
        if (res?.code !== 200) {
          return;
        }

        setAwards(res.data ?? []);
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getMovieAwards();
  }, []);

  return (
    <ScrollView style={styles.page}>
      <View style={styles.list}>
        {awards.map?.((item, index) => {
          return (
            <View
              key={index}
              style={[styles.item, index % 1 === 0 ? styles.itemLine : null]}
            >
              <Text style={styles.itemText}>{item.title}</Text>
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
  list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 38,
    borderBottomWidth: 0.48,
    borderStyle: 'solid',
    borderColor: '#eeeeee'
  },
  itemLine: {
    borderRightWidth: 0.48,
    borderStyle: 'solid',
    borderColor: '#eeeeee'
  },
  itemText: {
    fontSize: 12.5,
    color: '#303133'
  }
});

export default Awards;
