import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useStore, useSelector } from 'react-redux';
import type { RootState } from '@/store/index';
import styles from './search-history.css';

type Props = {
  onSearch: (value: string) => void;
};

function SearchHistory(props: Props): React.ReactElement {
  const store = useStore();
  const searchHistory = useSelector((state: RootState) => state.routine.searchHistory);

  const [clearVisible, setClearVisible] = useState(false);

  const handleClearToggle = () => {
    setClearVisible(!clearVisible);
  };

  const handleHistoryChange = (item: string, index: number) => {
    if (!clearVisible) {
      props.onSearch?.(item);
      return;
    }

    const history = JSON.parse(JSON.stringify(searchHistory));
    history.splice(index, 1);
    store.dispatch({ type: 'routine/setSearchHistory', payload: history });
  };

  const handleClearAll = () => {
    store.dispatch({ type: 'routine/setSearchHistory', payload: [] });
  };

  return (
    <View style={styles.searchHistory}>
      <View style={styles.header}>
        <Text style={styles.title}>历史记录</Text>
        <View style={styles.clear}>
          {clearVisible && (
            <>
              <Pressable onPress={handleClearAll}>
                <Text style={styles.clearText}>全部删除</Text>
              </Pressable>
              <View style={styles.divider} />
            </>
          )}
          <Pressable onPress={handleClearToggle}>
            <Text style={styles.clearIcon}>{'\ue614'}</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.list}>
        {searchHistory.map?.((item, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => handleHistoryChange(item, index)}
              style={styles.item}
            >
              <Text style={styles.itemText}>{item}</Text>
              {clearVisible && <Text style={styles.itemIcon}>{'\ue637'}</Text>}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default SearchHistory;
