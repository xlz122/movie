import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  searchDetail: {
    width: '100%',
    height: Dimensions.get('window').height - 44,
    backgroundColor: '#ffffff'
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 44,
    paddingHorizontal: 4,
    borderBottomWidth: 0.48,
    borderStyle: 'solid',
    borderColor: '#e5e5e5'
  },
  tabItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 54,
    height: '100%'
  },
  tabText: {
    fontWeight: '700',
    fontSize: 13,
    color: '#666666'
  },
  tabActiveLine: {
    position: 'absolute',
    bottom: 2.8,
    width: 24,
    height: 4,
    backgroundColor: '#e54847',
    borderRadius: 6
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
    marginHorizontal: 14
  },
  itemImage: {
    width: 74,
    height: 98,
    borderRadius: 3
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  },
  itemTitle: {
    fontSize: 14,
    color: '#333333'
  },
  itemTag: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  tag: {
    paddingVertical: 1,
    paddingHorizontal: 2,
    backgroundColor: 'rgba(254, 179, 0, 0.15)',
    fontSize: 10,
    color: '#feb300',
    borderRadius: 3
  },
  itemText: {
    fontSize: 11.5,
    color: '#999999'
  },
  itemRating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2
  },
  ratingWeight: {
    fontWeight: '700',
    color: '#f16c00',
    fontSize: 12.5
  },
  ratingText: {
    fontSize: 10,
    color: '#f16c00'
  },
  empty: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 52
  },
  emptyText: {
    fontSize: 13,
    color: '#888888'
  }
});

export default styles;
