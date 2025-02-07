import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    backgroundColor: '#e54847'
  },
  arrow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 46,
    height: 42
  },
  arrowIcon: {
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#ffffff'
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#ffffff'
  },
  titleCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -10,
    marginLeft: -10
  }
});

export default styles;
