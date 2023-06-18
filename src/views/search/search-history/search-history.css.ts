import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  searchHistory: {
    flex: 1,
    marginTop: 15,
    backgroundColor: '#fff'
  },
  record: {
    paddingHorizontal: 15
  },
  recordTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleText: {
    fontWeight: '700',
    color: '#303133'
  },
  clear: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  clearAll: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  clearText: {
    paddingRight: 4.5,
    fontSize: 12,
    color: '#303133'
  },
  clearLine: {
    height: 10,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#ccc'
  },
  clearIcon: {
    paddingLeft: 4.5,
    fontFamily: 'iconfont',
    color: '#303133'
  },
  recordList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  item: {
    position: 'relative'
  },
  itemText: {
    paddingVertical: 2,
    paddingHorizontal: 7,
    marginRight: 12,
    marginBottom: 8,
    backgroundColor: '#f4f4f4',
    fontSize: 13,
    color: '#303133',
    borderRadius: 2
  },
  itemIcon: {
    position: 'absolute',
    top: -4,
    right: -6,
    marginRight: 12,
    fontFamily: 'iconfont',
    fontSize: 13,
    color: '#c5c5c5'
  }
});

export default styles;
