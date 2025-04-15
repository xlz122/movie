import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5'
  },
  count: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 6
  },
  countItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemLabel: {
    fontSize: 12,
    color: '#888888'
  },
  itemValue: {
    fontWeight: '700',
    fontSize: 14,
    color: '#303133'
  },
  divider: {
    height: '100%',
    borderRightWidth: 0.48,
    borderStyle: 'solid',
    borderColor: '#e5e5e5'
  },
  award: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 6
  },
  awardImage: {
    width: 44,
    height: 44,
    borderRadius: 50
  },
  awardTitle: {
    flex: 1,
    fontWeight: '700',
    fontSize: 14,
    color: '#303133'
  },
  awardCount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  countText: {
    fontSize: 12,
    color: '#999999'
  },
  countIcon: {
    fontFamily: 'iconfont',
    fontSize: 12,
    color: '#999999'
  },
  summary: {
    marginHorizontal: 10,
    marginBottom: 10,
    fontSize: 12.5,
    color: '#303133'
  },
  noSummary: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 77
  },
  noSummaryText: {
    fontSize: 12.5,
    color: '#999999'
  }
});

export default styles;
