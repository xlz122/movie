import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Project(): React.ReactElement {
  return (
    <View style={styles.page}>
      <View style={styles.cell}>
        <View style={styles.cellItem}>
          <Text style={styles.itemLabel}>react</Text>
          <Text style={styles.itemValue}>19.2.0</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.cellItem}>
          <Text style={styles.itemLabel}>react native</Text>
          <Text style={styles.itemValue}>0.83.0</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
  },
  cell: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    padding: 14,
    margin: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
  },
  cellItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  itemLabel: {
    fontSize: 12.5,
    color: '#303133',
  },
  itemValue: {
    fontSize: 12.5,
    color: '#999999',
  },
  divider: {
    borderBottomWidth: 0.48,
    borderStyle: 'solid',
    borderColor: '#EEEEEE',
  },
});

export default Project;
