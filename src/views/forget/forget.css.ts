import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
  },
  fieldItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    marginTop: 14,
    height: 50,
    backgroundColor: '#FFFFFF',
  },
  itemLabel: {
    fontSize: 14,
    color: '#303133',
  },
  itemInput: {
    flex: 1,
    textAlign: 'right',
  },
  inputClearIcon: {
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#C5C5C5',
  },
  itemCodeInput: {
    flex: 1,
  },
  itemCode: {
    width: 98,
    height: 32,
    backgroundColor: '#409EFF',
    fontSize: 12,
    color: '#FFFFFF',
    lineHeight: 32,
    textAlign: 'center',
    borderRadius: 6,
  },
  tipText: {
    marginVertical: 4,
    marginHorizontal: 14,
    fontSize: 12,
    color: '#777777',
  },
  submit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginTop: 22,
    marginHorizontal: 14,
    backgroundColor: '#409EFF',
    borderRadius: 6,
  },
  submitText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});

export default styles;
