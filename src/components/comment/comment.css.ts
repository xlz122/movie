import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  comment: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9,
    width: '100%',
    height: '100%'
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    width: '100%',
    height: '100%'
  },
  modal: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 560,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  modalHeader: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 44,
    borderBottomWidth: 0.48,
    borderStyle: 'solid',
    borderColor: '#e5e5e5'
  },
  title: {
    fontWeight: '700',
    fontSize: 14,
    color: '#303133'
  },
  close: {
    position: 'absolute',
    right: 10,
    padding: 4,
    backgroundColor: '#e5e5e5',
    borderRadius: 50
  },
  closeIcon: {
    fontFamily: 'iconfont',
    fontSize: 14,
    color: '#ffffff'
  },
  modalBody: {
    flexGrow: 1
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
  item: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    paddingVertical: 12,
    marginHorizontal: 10,
    borderBottomWidth: 0.48,
    borderStyle: 'solid',
    borderColor: '#e5e5e5'
  },
  itemCover: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  itemImage: {
    width: 30,
    height: 30,
    borderRadius: 50
  },
  authorName: {
    flex: 1,
    fontSize: 13,
    color: '#303133'
  },
  moreIcon: {
    fontFamily: 'iconfont',
    fontSize: 20,
    color: '#303133'
  },
  itemContent: {
    paddingLeft: 40
  },
  itemText: {
    fontSize: 12.5,
    color: '#333333'
  },
  itemDeleteText: {
    maxWidth: 86,
    paddingHorizontal: 4,
    backgroundColor: '#f5f5f5',
    fontSize: 12.5,
    color: '#999999',
    borderRadius: 3
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 40
  },
  itemDuration: {
    fontSize: 11,
    color: '#999999'
  },
  tool: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  toolText: {
    fontSize: 11,
    color: '#999999'
  },
  toolIcon: {
    fontFamily: 'iconfont',
    fontSize: 13,
    color: '#999999'
  },
  modalFooter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
  empty: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 52
  },
  emptyText: {
    fontSize: 13,
    color: '#aaaaaa'
  }
});

export default styles;
