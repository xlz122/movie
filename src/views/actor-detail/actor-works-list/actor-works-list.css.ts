import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff'
  },
  count: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 10
  },
  countText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#303133'
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    backgroundColor: '#f5f5f5',
    borderRadius: 50
  },
  tabItem: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    fontSize: 12,
    color: '#999999',
    borderRadius: 50
  },
  tabActiveItem: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: '#ffffff',
    fontSize: 12,
    color: '#303133',
    borderRadius: 50
  },
  list: {
    flexGrow: 1,
    paddingTop: 6,
    paddingHorizontal: 10
  },
  item: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 6,
    width: 104,
    paddingBottom: 10
  },
  itemImage: {
    width: 104,
    height: 152,
    borderRadius: 3
  },
  itemTag: {
    position: 'absolute',
    top: 4,
    right: 4,
    paddingVertical: 1,
    paddingHorizontal: 2,
    backgroundColor: 'rgba(255, 165, 0, 0.7)',
    fontSize: 9,
    color: '#ffffff',
    borderRadius: 3
  },
  itemRating: {
    position: 'absolute',
    top: 132,
    right: 8,
    fontSize: 11,
    color: 'orange'
  },
  itemText: {
    color: '#333333',
    fontSize: 12.5
  }
});

export default styles;
