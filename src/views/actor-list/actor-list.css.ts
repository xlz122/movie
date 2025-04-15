import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff'
  },
  sticky: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5'
  },
  stickySpot: {
    width: 4,
    height: 4,
    backgroundColor: '#f8a52d'
  },
  stickyText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#303133'
  },
  stickyCount: {
    fontSize: 12,
    color: '#303133'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 8,
    marginHorizontal: 14
  },
  itemImage: {
    width: 66,
    height: 90,
    borderRadius: 3
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  },
  itemName: {
    fontSize: 14,
    color: '#333333'
  },
  itemText: {
    fontSize: 11.5,
    color: '#999999'
  },
  divider: {
    marginHorizontal: 14,
    borderBottomWidth: 0.48,
    borderStyle: 'solid',
    borderColor: '#e5e5e5'
  }
});

export default styles;
