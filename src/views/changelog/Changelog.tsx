import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

function Changelog(): React.ReactElement {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
      <View style={styles.cell}>
        <View style={styles.cellItem}>
          <Text style={styles.itemTitle}>2023-06-20</Text>
          <View style={styles.itemContent}>
            <Text style={styles.itemText}>
              1.react native版本更新至0.72.0-rc.6
            </Text>
            <Text style={styles.itemText}>2.优化各页面代码</Text>
            <Text style={styles.itemText}>3.重构ScrollRefresh组件</Text>
          </View>
        </View>
        <View style={styles.cellItem}>
          <Text style={styles.itemTitle}>2023-03-01</Text>
          <View style={styles.itemContent}>
            <Text style={styles.itemText}>1.react native版本更新至0.71.3</Text>
            <Text style={styles.itemText}>2.更新关于作者页面</Text>
            <Text style={styles.itemText}>3.更新关于项目页面</Text>
            <Text style={styles.itemText}>2.更新项目效果图</Text>
          </View>
        </View>
        <View style={styles.cellItem}>
          <Text style={styles.itemTitle}>2023-02-02</Text>
          <View style={styles.itemContent}>
            <Text style={styles.itemText}>1.react native版本更新至0.71.2</Text>
            <Text style={styles.itemText}>2.更新项目效果图</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff'
  },
  cell: {
    paddingTop: 10
  },
  cellItem: {
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
    marginHorizontal: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 4
  },
  itemTitle: {
    fontSize: 13,
    color: '#303133'
  },
  itemContent: {
    paddingTop: 5,
    paddingLeft: 10.5
  },
  itemText: {
    fontSize: 12.5,
    color: '#666'
  }
});

export default Changelog;
