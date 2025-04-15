import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  picutre: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.55)'
  },
  modal: {
    width: 260,
    height: 'auto',
    marginTop: '-50%',
    backgroundColor: '#ffffff',
    borderRadius: 6
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    marginVertical: 22
  },
  title: {
    fontSize: 13,
    color: '#80848f'
  },
  image: {
    width: 150,
    height: 40
  },
  inputMain: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 22,
    marginTop: 18
  },
  input: {
    width: '100%',
    height: '100%',
    color: 'transparent'
  },
  code: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%'
  },
  codeItem: {
    width: 18,
    height: '100%',
    marginHorizontal: 2,
    fontSize: 16,
    color: '#323232',
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#323232',
    textAlign: 'center'
  },
  cancel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderTopWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#e5e5e5'
  },
  cancelText: {
    fontSize: 12,
    color: '#303133'
  }
});

export default styles;
