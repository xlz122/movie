import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff'
  },
  sticky: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.48,
    borderStyle: 'solid',
    borderColor: '#e5e5e5'
  },
  stickyText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#303133'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 8,
    marginHorizontal: 14
  },
  itemImage: {
    width: 82,
    height: 110,
    borderRadius: 3
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  },
  itemTitle: {
    fontSize: 14,
    color: '#333333'
  },
  itemCountText: {
    fontSize: 13,
    color: '#e54847'
  },
  itemText: {
    fontSize: 11.5,
    color: '#999999'
  }
});

export default styles;
