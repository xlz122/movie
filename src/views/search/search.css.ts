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
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 45,
    paddingLeft: 8,
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#eee',
    overflow: 'hidden'
  },
  tabItem: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 57,
    height: '100%'
  },
  tabItemText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
    textAlign: 'center'
  },
  tabActiveLine: {
    position: 'absolute',
    left: '50%',
    bottom: 2.6,
    marginLeft: -11,
    width: 22,
    height: 3,
    backgroundColor: 'rgb(229, 72, 71)',
    borderRadius: 6
  }
});

export default styles;
