import { StyleSheet, Platform } from 'react-native';
import { viewHeight } from '@/utils/screen';

const styles = StyleSheet.create({
  page: {
    // web端需减去标题栏高度
    height: Platform.OS === 'web' ? viewHeight - 42 : viewHeight,
    backgroundColor: '#f5f5f5'
  },
  count: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 72,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 4
  },
  countItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRightWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#e5e5e5'
  },
  itemContent: {
    fontWeight: '700',
    fontSize: 14,
    color: '#303133'
  },
  itemText: {
    fontSize: 12,
    color: '#888'
  },
  countLastItem: {
    borderRightWidth: 0
  },
  summary: {
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#303133'
  },
  noSummary: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    color: '#303133'
  },
  noSummaryText: {
    height: 75,
    lineHeight: 75,
    fontSize: 12,
    color: '#999'
  }
});

export default styles;
