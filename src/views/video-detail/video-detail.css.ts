import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff'
  },
  comment: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    height: 46,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
    borderTopWidth: 0.48,
    borderStyle: 'solid',
    borderColor: '#e5e5e5'
  },
  review: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    paddingHorizontal: 14,
    backgroundColor: '#efefef',
    borderRadius: 50
  },
  reviewText: {
    fontSize: 12.5,
    color: '#7f889b'
  },
  tool: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  toolItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 22
  },
  itemIcon: {
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#7f889b'
  },
  activeIcon: {
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#e54847'
  },
  itemText: {
    fontSize: 11,
    color: '#7f889b'
  }
});

export default styles;
