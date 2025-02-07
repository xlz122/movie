import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 14,
    backgroundColor: '#ffffff'
  },
  item: {
    marginHorizontal: 10
  },
  itemCover: {
    position: 'relative'
  },
  itemImage: {
    width: '100%',
    height: 196,
    borderRadius: 3
  },
  itemTitle: {
    position: 'absolute',
    top: 8,
    left: 10,
    fontSize: 14,
    color: '#ffffff'
  },
  itemPlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -22.5,
    marginLeft: -22.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 50
  },
  playIcon: {
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#ffffff'
  },
  itemCount: {
    position: 'absolute',
    left: 8,
    bottom: 10,
    fontSize: 11,
    color: '#ffffff'
  },
  itemDuration: {
    position: 'absolute',
    right: 8,
    bottom: 10,
    fontSize: 11,
    color: '#ffffff'
  },
  userinfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 46,
    paddingHorizontal: 10
  },
  author: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  authorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 50
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#303133'
  },
  tool: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  toolIcon: {
    marginLeft: 10,
    marginRight: 3,
    fontFamily: 'iconfont',
    fontSize: 14,
    color: '#303133'
  },
  toolText: {
    fontSize: 11,
    color: '#303133'
  }
});

export default styles;
