import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/index';

function UserProfile(): React.ReactElement {
  const userinfo = useSelector((state: RootState) => state.routine.userinfo);

  return (
    <View style={styles.page}>
      <View style={styles.cell}>
        <View style={styles.cellItem}>
          <Text style={styles.itemLabel}>头像</Text>
          <Image
            source={{ uri: userinfo.avatar }}
            resizeMode="stretch"
            style={styles.itemImage}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.cellItem}>
          <Text style={styles.itemLabel}>用户名</Text>
          <Text style={styles.itemValue}>{userinfo.username}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.cellItem}>
          <Text style={styles.itemLabel}>手机号</Text>
          <Text style={styles.itemValue}>{userinfo.phone}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.cellItem}>
          <Text style={styles.itemLabel}>性别</Text>
          <Text style={styles.itemValue}>{userinfo.gender}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.cellItem}>
          <Text style={styles.itemLabel}>生日</Text>
          <Text style={styles.itemValue}>{userinfo.birthday}</Text>
        </View>
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
  itemImage: {
    width: 32,
    height: 32,
    borderRadius: 50
  },
  divider: {
    borderBottomWidth: 0.48,
    borderStyle: 'solid',
    borderColor: '#eeeeee'
  }
});

export default UserProfile;
