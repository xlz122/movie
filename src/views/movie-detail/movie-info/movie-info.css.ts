import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  movieInfo: {
    display: 'flex',
    flexDirection: 'row',
    padding: 12
  },
  infoImage: {
    width: 94,
    height: 132,
    borderRadius: 3
  },
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 15
  },
  title: {
    marginTop: 1,
    marginBottom: 1,
    fontWeight: '700',
    fontSize: 16,
    color: '#fff'
  },
  subTitle: {
    paddingVertical: 1,
    color: '#e3e3e3'
  },
  brief: {
    marginTop: 7
  },
  briefText: {
    marginTop: 4,
    fontSize: 11,
    color: '#fff'
  },
  operate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 17
  },
  operateItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 104,
    height: 26,
    marginRight: 18,
    backgroundColor: 'rgba(0, 0, 0, .25)',
    borderRadius: 5
  },
  operateActiveItem: {
    opacity: 0.5
  },
  operateIcon: {
    marginRight: 3.5,
    fontFamily: 'iconfont',
    fontSize: 12,
    color: '#fff'
  },
  operateText: {
    fontSize: 11,
    color: '#fff'
  },
  rating: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: 82,
    paddingVertical: 16,
    marginTop: 6,
    marginHorizontal: 12,
    backgroundColor: 'rgba(0, 0, 0, .25)',
    borderRadius: 6
  },
  ratingItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ratingWish: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  ratingWishCount: {
    fontWeight: '700',
    fontSize: 22.5,
    color: '#feb300'
  },
  ratingWishText: {
    fontSize: 11,
    color: '#fff'
  },
  ratingWishDesc: {
    position: 'absolute',
    right: 8,
    bottom: 7,
    zIndex: 10,
    fontSize: 11.5,
    color: '#e5e5e5'
  },
  ratingCover: {
    position: 'relative'
  },
  ratingLine: {
    position: 'absolute',
    top: -5,
    right: -62,
    width: 0.5,
    height: 71,
    backgroundColor: 'hsla(0,0%,100%,.2)'
  },
  ratingText: {
    fontSize: 11,
    color: '#fff'
  },
  ratingIcon: {
    position: 'absolute',
    top: -3,
    right: -14,
    fontFamily: 'iconfont',
    fontSize: 12,
    color: '#fff'
  },
  ratingScore: {
    marginVertical: 3,
    fontWeight: '700',
    fontSize: 18,
    color: '#feb300'
  },
  noRating: {
    fontSize: 12,
    color: '#fff'
  },
  tag: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 18,
    marginHorizontal: 12
  },
  tagItem: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 9,
    backgroundColor: 'hsla(0, 0%, 100%, .1)',
    fontSize: 12,
    color: '#fff',
    borderRadius: 18
  },
  egg: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 10
  },
  eggIcon: {
    marginRight: 5,
    fontFamily: 'iconfont',
    fontSize: 12,
    color: '#fff'
  },
  eggText: {
    fontSize: 12,
    color: '#b0b3bb'
  }
});

export default styles;
