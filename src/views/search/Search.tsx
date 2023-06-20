import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStore, useSelector } from 'react-redux';
import type { RootState } from '@/store/index';
import type { Navigation, TextInputEvent } from '@/types/index';
import SearchDetail from './search-detail/SearchDetail';
import SearchHistory from './search-history/SearchHistory';
import styles from './search.css';

function Search(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const store = useStore();

  const searchHistory = useSelector(
    (state: RootState) => state.routine.searchHistory
  );

  const [keyword, setKeyword] = useState('');

  const handleInputChange = (e: TextInputEvent): void => {
    setKeyword(e.nativeEvent.text);
  };

  const handleClearKeyword = () => {
    setKeyword('');
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  // 记录历史记录
  const handleInputBlur = async (): Promise<void | boolean> => {
    if (!keyword) {
      return false;
    }

    store.dispatch({
      type: 'routine/setSearchHistory',
      payload: Array.from(new Set([keyword, ...searchHistory]))
    });
  };

  // 历史记录搜索
  const historySearch = (value: string) => {
    setKeyword(value);
  };

  return (
    <View style={styles.search}>
      <View style={styles.searchContainer}>
        <View style={styles.input}>
          <Text style={styles.inputIcon}>{'\ue613'}</Text>
          <TextInput
            autoFocus
            value={keyword}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder="找影视 / 影人 / 角色"
            style={styles.inputText}
          />
          {Boolean(keyword) && (
            <Pressable onPress={handleClearKeyword}>
              <Text style={styles.inputClearIcon}>{'\ue637'}</Text>
            </Pressable>
          )}
        </View>
        <Text onPress={handleCancel} style={styles.cancelText}>
          取消
        </Text>
      </View>
      {Boolean(keyword) && <SearchDetail keyword={keyword} />}
      {!keyword && <SearchHistory historySearch={historySearch} />}
    </View>
  );
}

export default Search;
