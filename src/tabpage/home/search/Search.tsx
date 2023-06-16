import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { Navigation } from '@/types/index';

function Search(): React.ReactElement {
  const navigation: Navigation = useNavigation();

  return (
    <View style={styles.search}>
      <Pressable onPress={() => navigation.push('Search')} style={styles.input}>
        <Text style={styles.inputIcon}>{'\ue613'}</Text>
        <Text style={styles.inputText}>请输入你要搜索的内容</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    display: 'flex',
    height: 48,
    paddingHorizontal: 10,
    paddingVertical: 11
  },
  input: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
    borderRadius: 48
  },
  inputIcon: {
    paddingHorizontal: 10,
    fontFamily: 'iconfont',
    fontSize: 14
  },
  inputText: {
    flex: 1,
    fontSize: 13,
    color: '#666'
  }
});

export default Search;
