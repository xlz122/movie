import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

function Changelog(): React.ReactElement {
  return (
    <ScrollView style={styles.page}>
      <View style={styles.cell}>
        <View style={styles.cellItem}>
          <Text style={styles.itemTitle}>2025-04-15</Text>
          <View style={styles.itemContent}>
            <Text style={styles.itemText}>1.更新react native 0.79.0</Text>
            <Text style={styles.itemText}>2.优化各页面代码</Text>
            <Text style={styles.itemText}>3.沉浸式状态栏</Text>
            <Text style={styles.itemText}>4.修复已知bug</Text>
          </View>
        </View>
        <View style={styles.cellItem}>
          <Text style={styles.itemTitle}>2023-06-13</Text>
          <View style={styles.itemContent}>
            <Text style={styles.itemText}>1.更新react native 0.72.0-rc.5</Text>
            <Text style={styles.itemText}>2.修复已知bug</Text>
          </View>
        </View>
        <View style={styles.cellItem}>
          <Text style={styles.itemTitle}>2022-11-28</Text>
          <View style={styles.itemContent}>
            <Text style={styles.itemText}>1.更新react native 0.71.2</Text>
            <Text style={styles.itemText}>2.完成页面并联调</Text>
          </View>
        </View>
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
  cell: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    margin: 14
  },
  cellItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 14,
    backgroundColor: '#f1f1f1',
    borderRadius: 6
  },
  itemTitle: {
    fontSize: 13,
    color: '#303133'
  },
  itemContent: {
    paddingLeft: 12.5
  },
  itemText: {
    fontSize: 12.5,
    color: '#666666'
  }
});

export default Changelog;
