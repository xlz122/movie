import { StyleSheet } from 'react-native';
import { deviceWidth, deviceHeight } from '@/utils/screen';

const styles = StyleSheet.create({
  comment: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    width: deviceWidth,
    height: deviceHeight
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 11,
    width: '100%',
    height: '100%'
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    zIndex: 12,
    width: deviceWidth,
    height: deviceHeight - 202,
    backgroundColor: '#fff',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  modalHeader: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.65,
    borderStyle: 'solid',
    borderColor: '#f5f5f5'
  },
  headerTitle: {
    flex: 1,
    fontWeight: '700',
    fontSize: 14,
    color: '#303133',
    textAlign: 'center'
  },
  headerClose: {
    position: 'absolute',
    right: 12,
    backgroundColor: '#e5e5e5',
    borderRadius: 18
  },
  headerCloseIcon: {
    padding: 5,
    fontFamily: 'iconfont',
    fontSize: 12,
    color: 'rgb(255, 255, 255)'
  },
  modalBody: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  bodyTitle: {
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
    marginTop: 14,
    marginHorizontal: 9
  },
  itemCover: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemImage: {
    width: 29,
    height: 29,
    borderRadius: 18
  },
  itemCoverText: {
    flex: 1,
    paddingLeft: 9,
    fontSize: 12,
    color: '#303133'
  },
  itemMoreIcon: {
    fontFamily: 'iconfont',
    fontSize: 20,
    color: '#303133'
  },
  itemContent: {
    paddingTop: 5,
    paddingLeft: 34
  },
  itemText: {
    color: '#333'
  },
  itemDeleteText: {
    maxWidth: 96,
    paddingVertical: 1,
    paddingHorizontal: 5,
    backgroundColor: '#f5f5f5',
    color: '#999',
    borderRadius: 4
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 7,
    paddingBottom: 14,
    marginLeft: 34,
    borderBottomWidth: 0.65,
    borderStyle: 'solid',
    borderColor: '#f5f5f5'
  },
  infoText: {
    fontSize: 12,
    color: '#999'
  },
  infoDesc: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5
  },
  descText: {
    marginRight: 4,
    fontSize: 12,
    color: '#999'
  },
  descIcon: {
    fontFamily: 'iconfont',
    fontSize: 12,
    color: '#999'
  },
  modalFooter: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderTopWidth: 0.65,
    borderStyle: 'solid',
    borderColor: '#f5f5f5'
  },
  reviewInput: {
    flex: 1,
    height: 29,
    lineHeight: 29,
    paddingLeft: 10,
    backgroundColor: '#efefef',
    fontSize: 12,
    color: '#7f889b',
    borderRadius: 18
  },
  emptyData: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 190
  },
  emptyDataText: {
    fontSize: 13.5,
    color: '#aaa'
  }
});

export default styles;
