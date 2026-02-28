import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
  },
  summary: {
    fontSize: 12.5,
    color: '#F5F5F5',
  },
  comment: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    height: 46,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.48,
    borderStyle: 'solid',
    borderColor: '#E5E5E5',
  },
  review: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reviewIcon: {
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#7F889B',
  },
  reviewText: {
    fontSize: 12.5,
    color: '#7F889B',
  },
  tool: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  toolItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 22,
  },
  itemIcon: {
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#7F889B',
  },
  activeIcon: {
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#E54847',
  },
  itemText: {
    fontSize: 11,
    color: '#7F889B',
  },
});

export default styles;
