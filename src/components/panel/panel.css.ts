import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  panel: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 6
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 42
  },
  title: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  line: {
    width: 3,
    height: 14,
    backgroundColor: '#e54847',
    borderRadius: 6
  },
  titleText: {
    fontSize: 13.5,
    color: '#666666'
  },
  more: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  moreText: {
    fontSize: 11.5,
    color: '#666666'
  },
  moreIcon: {
    fontFamily: 'iconfont',
    fontSize: 11,
    color: '#666666'
  }
});

export default styles;
