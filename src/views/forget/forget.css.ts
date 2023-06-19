import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  fieldItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 51,
    paddingHorizontal: 15,
    marginTop: 15,
    backgroundColor: '#fff'
  },
  itemText: {
    fontSize: 14,
    color: '#303133'
  },
  itemInput: {
    flex: 1,
    height: 41,
    textAlign: 'right'
  },
  inputClearIcon: {
    marginLeft: 12,
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#c5c5c5'
  },
  itemCodeInput: {
    flex: 1,
    height: 41
  },
  codeText: {
    width: 106,
    height: 35,
    lineHeight: 35,
    backgroundColor: '#409eff',
    fontSize: 12.5,
    color: '#fff',
    textAlign: 'center',
    borderRadius: 4
  },
  tipText: {
    marginVertical: 5,
    marginHorizontal: 15,
    fontSize: 12,
    color: '#777'
  },
  submit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginTop: 25,
    marginHorizontal: 15,
    backgroundColor: '#409eff',
    textAlign: 'center',
    borderRadius: 2
  },
  submitText: {
    fontSize: 14,
    color: '#fff'
  }
});

export default styles;
