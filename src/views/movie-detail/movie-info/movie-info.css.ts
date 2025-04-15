import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  movieInfo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 14,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  image: {
    width: 92,
    height: 130,
    borderRadius: 3
  },
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    marginVertical: 1,
    fontWeight: '700',
    fontSize: 16,
    color: '#ffffff'
  },
  subTitle: {
    fontSize: 14,
    color: '#e3e3e3'
  },
  brief: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    marginTop: 10
  },
  briefText: {
    fontSize: 11,
    color: '#ffffff'
  },
  operate: {
    display: 'flex',
    flexDirection: 'row',
    gap: 18,
    marginTop: 18
  },
  operateItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    width: 106,
    height: 26,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 3
  },
  operateActiveItem: {
    opacity: 0.5
  },
  operateIcon: {
    fontFamily: 'iconfont',
    fontSize: 13,
    color: '#ffffff'
  },
  operateText: {
    fontSize: 11.5,
    color: '#ffffff'
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: 92,
    paddingVertical: 14,
    marginTop: 16,
    marginHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
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
    fontSize: 22,
    color: '#feb300'
  },
  ratingWishText: {
    fontSize: 11.5,
    color: '#ffffff'
  },
  ratingWishDate: {
    position: 'absolute',
    right: 8,
    bottom: 6,
    zIndex: 10,
    fontSize: 11.5,
    color: '#e5e5e5'
  },
  ratingCover: {
    position: 'relative'
  },
  ratingText: {
    fontSize: 11.5,
    color: '#ffffff'
  },
  ratingIcon: {
    position: 'absolute',
    top: -3,
    right: -14,
    fontFamily: 'iconfont',
    fontSize: 12,
    color: '#ffffff'
  },
  ratingScore: {
    marginVertical: 3,
    fontWeight: '700',
    fontSize: 20,
    color: '#feb300'
  },
  ratingLine: {
    width: 0.5,
    height: 71,
    backgroundColor: 'hsla(0, 0%, 100%, 0.2)'
  },
  noRating: {
    fontSize: 11.5,
    color: '#ffffff'
  },
  tag: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
    marginHorizontal: 10
  },
  tagItem: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'hsla(0, 0%, 100%, 0.1)',
    fontSize: 12,
    color: '#ffffff',
    borderRadius: 50
  },
  egg: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
    marginHorizontal: 10
  },
  eggIcon: {
    fontFamily: 'iconfont',
    fontSize: 12.5,
    color: '#ffffff'
  },
  eggText: {
    fontSize: 12,
    color: '#b0b3bb'
  }
});

export default styles;
