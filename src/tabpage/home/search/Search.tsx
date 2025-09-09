import React from 'react';
import { StatusBar, View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Navigation } from '@/types/index';

function Search(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const inset = useSafeAreaInsets();

  useFocusEffect(() => {
    StatusBar.setBarStyle('light-content');
  });

  return (
    <View style={[styles.search, { marginTop: inset.top }]}>
      <Pressable onPress={() => navigation.push('Search')} style={styles.input}>
        <Text style={styles.inputIcon}>{'\ue613'}</Text>
        <Text style={styles.inputText}>请输入你要搜索的内容</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    width: '100%',
    height: 48,
    padding: 10
  },
  input: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#e5e5e5',
    borderRadius: 50
  },
  inputIcon: {
    fontFamily: 'iconfont',
    fontSize: 14,
    color: '#999999'
  },
  inputText: {
    fontSize: 13,
    color: '#666666'
  }
});

export default Search;
