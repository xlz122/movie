import { StyleSheet, Platform } from 'react-native';
import { viewHeight } from '@/utils/screen';

const styles = StyleSheet.create({
  page: {
    paddingBottom: Platform.OS !== 'web' ? 10 : 0,
    width: '100%',
    height: Platform.OS === 'web' ? viewHeight - 85 : viewHeight + 42 - 85,
    backgroundColor: '#fff'
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 45,
    paddingLeft: 8,
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#eee',
    overflow: 'hidden'
  },
  tabItem: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 57,
    height: '100%'
  },
  tabItemText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
    textAlign: 'center'
  },
  tabActiveLine: {
    position: 'absolute',
    left: '50%',
    bottom: 2.6,
    marginLeft: -11,
    width: 22,
    height: 3,
    backgroundColor: 'rgb(229, 72, 71)',
    borderRadius: 6
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 16,
    marginRight: -20,
    marginLeft: 16
  },
  itemImage: {
    width: 70,
    height: 92,
    borderRadius: 3
  },
  itemCoverText: {
    position: 'absolute',
    top: 1.6,
    left: 5,
    zIndex: 1,
    fontSize: 10,
    color: '#fff'
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 13
  },
  itemTitle: {
    marginBottom: 1,
    fontSize: 13,
    color: '#333'
  },
  itemTag: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  tag: {
    paddingVertical: 0.5,
    paddingHorizontal: 1.8,
    marginTop: 8.5,
    marginRight: 5,
    backgroundColor: 'rgba(254, 179, 0, .15)',
    fontSize: 10,
    color: '#feb300',
    textAlign: 'center',
    borderRadius: 2
  },
  itemText: {
    marginTop: 8,
    fontSize: 11,
    color: '#999'
  },
  itemRating: {
    width: 68,
    fontSize: 8,
    color: '#f16c00'
  },
  itemRatingWeight: {
    fontSize: 12,
    fontWeight: '700'
  },
  noData: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 140
  },
  noDataText: {
    color: '#888'
  }
});

export default styles;
