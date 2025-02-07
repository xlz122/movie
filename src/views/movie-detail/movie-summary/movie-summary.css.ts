import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: Dimensions.get('window').height,
    backgroundColor: '#ffffff'
  },
  baseInfo: {
    flexGrow: 1,
    paddingHorizontal: 14,
    marginVertical: 10
  },
  group: {
    marginBottom: 8
  },
  title: {
    marginVertical: 12,
    fontWeight: '700',
    fontSize: 14,
    color: '#303133'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8
  },
  itemLabel: {
    minWidth: 40,
    fontSize: 12.5,
    color: '#666666'
  },
  itemValue: {
    flex: 1,
    fontSize: 12.5,
    color: '#333333'
  },
  summary: {
    fontSize: 12.5,
    color: '#444444'
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 56,
    backgroundColor: '#ffffff'
  },
  close: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    backgroundColor: '#e5e5e5',
    borderRadius: 50
  },
  closeIcon: {
    fontFamily: 'iconfont',
    fontSize: 17,
    color: '#ffffff'
  }
});

export default styles;
