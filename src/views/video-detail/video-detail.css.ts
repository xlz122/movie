import { StyleSheet } from 'react-native';
import { viewHeight } from '@/utils/screen';

const styles = StyleSheet.create({
  page: {
    height: viewHeight - 42 - 216 - 44,
    backgroundColor: '#fff'
  },
  comment: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: '#fff',
    borderTopWidth: 0.3,
    borderStyle: 'solid',
    borderColor: '#eee'
  },
  review: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginLeft: 5
  },
  reviewInput: {
    paddingHorizontal: 15,
    width: '100%',
    height: 31,
    lineHeight: 31,
    backgroundColor: '#efefef',
    borderRadius: 18
  },
  inputText: {
    height: 31,
    lineHeight: 31,
    fontSize: 12,
    color: '#7f889b'
  },
  tool: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12
  },
  toolItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 41
  },
  itemIcon: {
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#7f889b'
  },
  activeIcon: {
    color: '#e54847'
  },
  itemText: {
    fontSize: 9,
    color: '#7f889b'
  }
});

export default styles;
