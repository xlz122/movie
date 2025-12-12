import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  videoPlayer: {
    width: '100%',
    height: 216,
    backgroundColor: '#000000',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  paused: {
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
  pausedIcon: {
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#ffffff'
  },
  control: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: '100%',
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
  playIcon: {
    fontFamily: 'iconfont',
    fontSize: 18,
    color: '#ffffff'
  },
  controlTime: {
    fontSize: 12,
    color: '#ffffff'
  },
  controlProgress: {
    flex: 1,
    height: 3,
    marginHorizontal: 4,
    backgroundColor: 'hsla(0, 0%, 100%, 0.3)',
    borderRadius: 50
  },
  controlClarity: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4
  },
  clarityText: {
    fontSize: 12,
    color: '#e5e5e5'
  },
  controlFull: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30
  },
  fullIcon: {
    fontFamily: 'iconfont',
    fontSize: 18,
    color: 'hsla(0, 0%, 100%, 0.85)'
  }
});

export default styles;
