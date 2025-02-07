import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  videoInfo: {
    width: '100%',
    backgroundColor: '#ffffff'
  },
  author: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#f9f9f9'
  },
  authorWarp: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8
  },
  authorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 50
  },
  authorInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  infoName: {
    fontWeight: '700',
    fontSize: 13,
    color: '#777777'
  },
  infoCount: {
    fontSize: 10,
    color: '#999999'
  },
  report: {
    fontSize: 11.5,
    color: '#999999'
  },
  title: {
    marginTop: 10,
    marginHorizontal: 14,
    fontWeight: '700',
    fontSize: 15,
    color: '#303133'
  },
  intro: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 14
  },
  introText: {
    fontSize: 11,
    color: '#999999'
  },
  movie: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
    marginHorizontal: 14,
    padding: 10,
    backgroundColor: '#f5f5f5'
  },
  movieImage: {
    width: 36,
    height: 50,
    borderRadius: 3
  },
  movieInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5
  },
  infoTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleText: {
    fontWeight: '700',
    fontSize: 13,
    color: '#444'
  },
  titleRating: {
    marginLeft: 5,
    fontWeight: '700',
    fontSize: 10,
    color: '#f16c00'
  },
  infoIntro: {
    fontSize: 11,
    color: '#555555'
  }
});

export default styles;
