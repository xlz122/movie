import { StyleSheet } from 'react-native';
import { deviceWidth } from '@/utils/screen';

const styles = StyleSheet.create({
  videoPlayer: {
    height: 216,
    backgroundColor: '#000'
  },
  coverImage: {
    width: deviceWidth,
    height: 216,
    borderRadius: 4
  },
  play: {
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
    borderRadius: 100
  },
  playIcon: {
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#fff'
  },
  control: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: deviceWidth,
    height: 32,
    paddingHorizontal: 4
  },
  controlPlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30
  },
  controlPlayIcon: {
    fontFamily: 'iconfont',
    fontSize: 18,
    color: '#fff'
  },
  controlTime: {
    paddingHorizontal: 4,
    fontSize: 12,
    color: '#fff'
  },
  controlProgress: {
    flex: 1,
    height: 3,
    marginHorizontal: 8,
    backgroundColor: 'hsla(0, 0%, 100%, 0.3)',
    borderRadius: 18
  },
  controlClarity: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8
  },
  controlClarityText: {
    fontSize: 12,
    color: '#e5e5e5'
  },
  controlFull: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    marginRight: 5
  },
  controlFullIcon: {
    fontFamily: 'iconfont',
    fontSize: 18,
    color: 'hsla(0, 0%, 100%, 0.85)'
  }
});

export default styles;
