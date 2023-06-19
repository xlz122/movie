import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  panel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 10,
    marginTop: 0,
    backgroundColor: '#fff',
    borderRadius: 6
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    height: 42
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  titleLine: {
    width: 3,
    height: 14,
    marginRight: 4,
    backgroundColor: '#e54847',
    borderRadius: 4
  },
  titleText: {
    fontSize: 13,
    color: '#666'
  },
  more: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4
  },
  moreText: {
    fontSize: 11,
    color: '#666'
  },
  moreIcon: {
    fontFamily: 'iconfont',
    fontSize: 11,
    color: '#666'
  }
});

export default styles;
