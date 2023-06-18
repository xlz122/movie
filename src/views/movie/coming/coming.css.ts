import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {
    paddingBottom: 10,
    backgroundColor: '#fff'
  },
  sticky: {
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 0.45,
    borderStyle: 'solid',
    borderColor: '#dedede'
  },
  stickyText: {
    paddingVertical: 10,
    fontWeight: '700',
    fontSize: 14,
    color: '#303133'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 18,
    marginRight: -20,
    marginLeft: 16
  },
  itemImage: {
    width: 93,
    height: 124,
    borderRadius: 3
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 13
  },
  itemTitle: {
    marginBottom: 1,
    fontSize: 14,
    color: '#333'
  },
  itemText: {
    marginTop: 8,
    fontSize: 11,
    color: '#999'
  },
  itemCountText: {
    fontSize: 13,
    color: '#e54847'
  }
});

export default styles;
