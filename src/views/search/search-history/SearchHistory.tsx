import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useStore, useSelector } from 'react-redux';
import lodash from 'lodash';
import type { RootState } from '@/store/index';
import styles from './search-history.css';

type Props = {
  historySearch: (value: string) => void;
};

function SearchHistory(props: Props): React.ReactElement {
  const store = useStore();
  const searchHistory = useSelector(
    (state: RootState) => state.routine.searchHistory
  );

  const [clearVisible, setClearVisible] = useState(false);
  const handleClearToggle = () => {
    setClearVisible(!clearVisible);
  };

  const handleHistoryChange = (item: string, index: number) => {
    // 删除
    if (clearVisible) {
      const history = lodash.cloneDeep(searchHistory);
      history.splice(index, 1);

      store.dispatch({
        type: 'routine/setSearchHistory',
        payload: history
      });
      return false;
    }

    // 搜索
    props.historySearch(item);
  };

  const clearAllHistory = () => {
    store.dispatch({
      type: 'routine/setSearchHistory',
      payload: []
    });
  };

  return (
    <View style={styles.searchHistory}>
      <View style={styles.record}>
        <View style={styles.recordTitle}>
          <Text style={styles.titleText}>历史记录</Text>
          <View style={styles.clear}>
            {clearVisible && (
              <Pressable onPress={clearAllHistory} style={styles.clearAll}>
                <Text style={styles.clearText}>全部删除</Text>
                <View style={styles.clearLine} />
              </Pressable>
            )}
            <Pressable onPress={handleClearToggle} style={styles.clear}>
              <Text style={styles.clearIcon}>{'\ue614'}</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.recordList}>
          {searchHistory?.map((item, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => handleHistoryChange(item, index)}
                style={styles.item}
              >
                <Text style={styles.itemText}>{item}</Text>
                {clearVisible && (
                  <Text style={styles.itemIcon}>{'\ue637'}</Text>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default SearchHistory;
