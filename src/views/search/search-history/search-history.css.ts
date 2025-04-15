import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  searchHistory: {
    marginTop: 6,
    marginHorizontal: 14,
    backgroundColor: '#ffffff'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: '700',
    fontSize: 14,
    color: '#303133'
  },
  clear: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6
  },
  clearText: {
    fontSize: 12.5,
    color: '#303133'
  },
  clearIcon: {
    fontFamily: 'iconfont',
    fontSize: 14,
    color: '#303133'
  },
  divider: {
    height: 10,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#cccccc'
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 10
  },
  item: {
    position: 'relative',
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: '#f4f4f4',
    borderRadius: 3
  },
  itemText: {
    fontSize: 12.5,
    color: '#303133'
  },
  itemIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
    fontFamily: 'iconfont',
    fontSize: 14,
    color: '#c5c5c5'
  }
});

export default styles;
