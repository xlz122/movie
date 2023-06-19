import { StyleSheet, Platform } from 'react-native';
import { viewHeight } from '@/utils/screen';

const styles = StyleSheet.create({
  page: {
    // web端需要减去标题高度
    height: Platform.OS === 'web' ? viewHeight - 42 : viewHeight,
    backgroundColor: 'rgb(255, 255, 255)'
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  titleText: {
    flex: 1,
    fontWeight: '700',
    fontSize: 14,
    color: '#303133'
  },
  titleTab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 18
  },
  tabItem: {
    paddingVertical: 3,
    paddingHorizontal: 7,
    margin: 3.5,
    fontSize: 12,
    color: '#999'
  },
  tabActiveItem: {
    backgroundColor: '#fff',
    color: '#303133',
    borderRadius: 18
  },
  item: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 14
  },
  itemImage: {
    width: 105,
    height: 156,
    borderRadius: 3
  },
  itemTag: {
    position: 'absolute',
    top: 6,
    right: 5,
    paddingVertical: 0.3,
    paddingHorizontal: 1.8,
    backgroundColor: 'rgba(255, 165, 0, 0.7)',
    fontSize: 9,
    color: '#fff',
    textAlign: 'center',
    borderRadius: 2
  },
  itemRating: {
    position: 'absolute',
    right: 4,
    bottom: 40,
    fontSize: 10.5,
    color: 'orange'
  },
  itemText: {
    width: 94,
    marginTop: 5,
    color: '#333',
    fontSize: 12
  }
});

export default styles;
