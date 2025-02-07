import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStore } from 'react-redux';
import type { Navigation } from '@/types/index';

function Setting(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const store = useStore();

  const handleLogout = (): void => {
    store.dispatch({ type: 'routine/setLogout' });
    navigation.goBack();
  };

  return (
    <View style={styles.page}>
      <Pressable onPress={handleLogout} style={styles.logout}>
        <Text style={styles.logoutText}>退出登录</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff'
  },
  logout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginHorizontal: 14,
    marginBottom: 14,
    backgroundColor: '#f56c6c',
    borderRadius: 6
  },
  logoutText: {
    fontSize: 14,
    color: '#ffffff'
  }
});

export default Setting;
