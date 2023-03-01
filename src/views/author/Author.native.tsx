import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { Navigation } from '@/types/index';

function Author(): React.ReactElement {
  const navigation: Navigation = useNavigation();

  return (
    <View style={styles.page}>
      <View style={styles.cell}>
        <View style={styles.cellItem}>
          <Text style={styles.itemText}>作者</Text>
          <Text style={styles.itemRightText}>撇捺</Text>
        </View>
        <View style={styles.cellItem}>
          <Text style={styles.itemText}>职业</Text>
          <Text style={styles.itemRightText}>前端开发</Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            navigation?.push('WebView', { to: 'https://github.com/xlz122' })
          }
          style={styles.cellItem}
        >
          <Text style={styles.itemText}>github主页</Text>
          <Text style={[styles.itemRightText, styles.itemHref]}>
            https://github.com/xlz122
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  cell: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 6
  },
  cellItem: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    marginHorizontal: 17,
    borderBottomWidth: 0.4,
    borderStyle: 'solid',
    borderColor: '#eee'
  },
  itemText: {
    flex: 1,
    fontSize: 12,
    color: '#303133'
  },
  itemRightText: {
    marginLeft: 13,
    fontSize: 12,
    color: 'rgb(153, 153, 153)'
  },
  itemHref: {
    color: '#e54847'
  },
  cellLastItem: {
    borderBottomWidth: 0
  }
});

export default Author;
