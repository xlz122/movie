import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  search: {
    flex: 1,
    backgroundColor: '#fff'
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingTop: 10,
    paddingLeft: 10
  },
  input: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 30,
    backgroundColor: '#f5f5f5',
    borderRadius: 70
  },
  inputIcon: {
    paddingHorizontal: 10,
    fontFamily: 'iconfont',
    fontSize: 14
  },
  inputText: {
    flex: 1,
    padding: 0,
    fontSize: 13,
    color: '#666'
  },
  inputClearIcon: {
    marginRight: 12,
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#c5c5c5'
  },
  cancelText: {
    paddingRight: 10,
    width: 78,
    height: '100%',
    lineHeight: 30,
    fontSize: 12.5,
    color: '#777',
    textAlign: 'center'
  }
});

export default styles;
