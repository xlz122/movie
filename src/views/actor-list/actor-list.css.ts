import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {
    paddingBottom: 10,
    backgroundColor: '#fff'
  },
  sticky: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 45,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5'
  },
  stickySpot: {
    width: 4,
    height: 4,
    marginRight: 5,
    backgroundColor: '#f8a52d'
  },
  stickyText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#303133'
  },
  stickyCount: {
    marginLeft: 3,
    fontSize: 10,
    color: '#303133'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 8,
    marginHorizontal: 15,
    borderBottomWidth: 0.38,
    borderStyle: 'solid',
    borderColor: '#dedede'
  },
  itemImage: {
    width: 68,
    height: 90,
    borderRadius: 3
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 13
  },
  itemName: {
    marginBottom: 1,
    fontSize: 14,
    color: '#333'
  },
  itemText: {
    marginTop: 4,
    fontSize: 12,
    color: '#999'
  },
  lastItem: {
    borderBottomWidth: 0
  }
});

export default styles;
