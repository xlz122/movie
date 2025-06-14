import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff'
  },
  search: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 42,
    marginTop: 6,
    marginHorizontal: 14
  },
  input: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 30,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 50
  },
  inputIcon: {
    fontFamily: 'iconfont',
    fontSize: 14,
    color: '#999999'
  },
  inputText: {
    flex: 1,
    padding: 0,
    fontSize: 13,
    color: '#666666'
  },
  clearIcon: {
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#c5c5c5'
  },
  cancel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 8
  },
  cancelText: {
    fontSize: 13,
    color: '#777777'
  }
});

export default styles;
