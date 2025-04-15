import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { Navigation } from '@/types/index';

function Author(): React.ReactElement {
  const navigation: Navigation = useNavigation();

  return (
    <View style={styles.page}>
      <View style={styles.cell}>
        <View style={styles.cellItem}>
          <Text style={styles.itemLabel}>作者</Text>
          <Text style={styles.itemValue}>xlz122</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.cellItem}>
          <Text style={styles.itemLabel}>城市</Text>
          <Text style={styles.itemValue}>厦门</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.cellItem}>
          <Text style={styles.itemLabel}>职业</Text>
          <Text style={styles.itemValue}>前端攻城狮</Text>
        </View>
        <View style={styles.divider} />
        <Pressable
          onPress={() =>
            navigation.push('WebView', { uri: 'https://github.com/xlz122' })
          }
          style={styles.cellItem}
        >
          <Text style={styles.itemLabel}>github主页</Text>
          <Text style={styles.itemLink}>https://github.com/xlz122</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
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
  itemLink: {
    fontSize: 12,
    color: '#e54847'
  },
  divider: {
    borderBottomWidth: 0.48,
    borderStyle: 'solid',
    borderColor: '#eeeeee'
  }
});

export default Author;
