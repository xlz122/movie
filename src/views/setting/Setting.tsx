import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStore } from 'react-redux';
import type { Navigation } from '@/types/index';

function Setting(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const store = useStore();

  const handleLogout = () => {
    store.dispatch({ type: 'routine/setLogout' });
    navigation.goBack();
  };

  return (
    <View style={styles.page}>
      <View style={styles.cell}>
        <View style={styles.cellItem}>
          <Text style={styles.itemLabel}>应用名称</Text>
          <Text style={styles.itemValue}>慕影网</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.cellItem}>
          <Text style={styles.itemLabel}>版本号</Text>
          <Text style={styles.itemValue}>1.0.0</Text>
        </View>
      </View>
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
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5'
  },
  cell: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    padding: 14,
    margin: 14,
    backgroundColor: '#ffffff',
    borderRadius: 6
  },
  cellItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10
  },
  itemLabel: {
    fontSize: 12.5,
    color: '#303133'
  },
  itemValue: {
    fontSize: 12.5,
    color: '#999999'
  },
  divider: {
    borderBottomWidth: 0.48,
    borderStyle: 'solid',
    borderColor: '#eeeeee'
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
