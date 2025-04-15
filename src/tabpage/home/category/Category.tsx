import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { Navigation } from '@/types/index';

function Category(): React.ReactElement {
  const navigation: Navigation = useNavigation();

  return (
    <View style={styles.category}>
      <Pressable onPress={() => navigation.push('Theater')} style={styles.item}>
        <Text style={[styles.itemIcon, styles.hotMovie]}>{'\ue617'}</Text>
        <Text style={styles.itemText}>热映中</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.push('HighScore')}
        style={styles.item}
      >
        <Text style={[styles.itemIcon, styles.highScore]}>{'\ue67b'}</Text>
        <Text style={styles.itemText}>高分榜</Text>
      </Pressable>
      <Pressable onPress={() => navigation.push('Awards')} style={styles.item}>
        <Text style={[styles.itemIcon, styles.awards]}>{'\ue668'}</Text>
        <Text style={styles.itemText}>奖项</Text>
      </Pressable>
      <Pressable onPress={() => navigation.push('Today')} style={styles.item}>
        <Text style={[styles.itemIcon, styles.today]}>{'\ue6c4'}</Text>
        <Text style={styles.itemText}>那年今日</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  category: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 12,
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 6
  },
  item: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 6
  },
  itemIcon: {
    padding: 9,
    fontFamily: 'iconfont',
    fontSize: 22,
    borderRadius: 6
  },
  itemText: {
    fontSize: 12,
    color: '#303133'
  },
  hotMovie: {
    backgroundColor: 'rgba(255, 79, 77, 0.15)',
    color: '#f8a52d'
  },
  highScore: {
    backgroundColor: 'rgba(255, 79, 77, 0.15)',
    color: '#ff4f4d'
  },
  awards: {
    backgroundColor: 'rgba(65, 172, 255, 0.15)',
    color: '#41acff'
  },
  today: {
    backgroundColor: 'rgba(145, 109, 255, 0.15)',
    color: '#916dff'
  }
});

export default Category;
