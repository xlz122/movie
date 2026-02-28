import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E54847',
  },
  arrow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 46,
    height: 42,
  },
  arrowIcon: {
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#FFFFFF',
  },
  titleText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  titleCenter: {
    textAlign: 'center',
    transform: [{ translateX: -23 }],
  },
});

export default styles;
