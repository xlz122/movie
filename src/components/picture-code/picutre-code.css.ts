import { StyleSheet } from 'react-native';
import { deviceWidth, deviceHeight } from '@/utils/screen';

const styles = StyleSheet.create({
  picutre: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    width: deviceWidth,
    height: deviceHeight
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 11,
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: 'rgba(0, 0, 0, .55)'
  },
  modal: {
    position: 'absolute',
    top: '25%',
    left: '50%',
    zIndex: 12,
    width: 272,
    paddingTop: 15,
    marginLeft: -136,
    backgroundColor: '#fff',
    borderRadius: 4
  },
  modalBody: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 21
  },
  title: {
    color: '#80848f'
  },
  coverImage: {
    width: 150,
    height: 40,
    marginTop: 10
  },
  inputMain: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    marginTop: 21
  },
  inputItem: {
    width: 242,
    color: 'transparent'
  },
  inputText: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 242,
    height: 35
  },
  inputTextItem: {
    width: 17,
    height: 35,
    lineHeight: 35,
    marginHorizontal: 2.6,
    fontSize: 15,
    color: '#323232',
    borderBottomWidth: 0.45,
    borderStyle: 'solid',
    borderColor: '#323232',
    textAlign: 'center'
  },
  cancel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 272,
    height: 45,
    lineHeight: 45,
    marginTop: 25,
    borderTopWidth: 0.45,
    borderStyle: 'solid',
    borderColor: '#ddd'
  },
  cancelText: {
    fontSize: 12.5,
    color: '#303133'
  }
});

export default styles;
