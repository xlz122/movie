import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  videoList: {
    marginTop: 16,
    marginHorizontal: 14,
    backgroundColor: '#ffffff'
  },
  navItem: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    fontSize: 11,
    color: '#303133',
    borderWidth: 0.48,
    borderStyle: 'solid',
    borderColor: 'hsla(0, 0%, 66.7%, 0.35)',
    borderRadius: 50
  },
  navActiveItem: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    fontSize: 11,
    color: '#e54847',
    backgroundColor: 'rgba(229, 72, 71, 0.15)',
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: 'rgba(229, 72, 71, 0.35)',
    borderRadius: 50
  },
  separator: {
    width: 10,
    height: '100%'
  },
  videoItem: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 14
  },
  itemCover: {
    position: 'relative'
  },
  itemImage: {
    width: 120,
    height: 68,
    borderRadius: 3
  },
  itemDuration: {
    position: 'absolute',
    right: 6,
    bottom: 10,
    zIndex: 9,
    fontSize: 9,
    color: '#ffffff'
  },
  itemMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderRadius: 3
  },
  maskText: {
    fontSize: 10,
    color: '#ffffff'
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  itemTitle: {
    fontWeight: '700',
    fontSize: 13,
    color: '#303133'
  },
  intro: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  introText: {
    fontSize: 11,
    color: '#999999'
  },
  empty: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 52
  },
  emptyText: {
    fontSize: 13,
    color: '#aaaaaa'
  }
});

export default styles;
