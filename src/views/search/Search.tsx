import React, { useState } from 'react';
import { StatusBar, View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useStore, useSelector } from 'react-redux';
import type { RootState } from '@/store/index';
import type { Navigation, TextInputEvent } from '@/types/index';
import SearchHistory from './search-history/SearchHistory';
import SearchDetail from './search-detail/SearchDetail';
import styles from './search.css';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Search(): React.ReactElement {
  const inset = useSafeAreaInsets();
  const navigation: Navigation = useNavigation();
  const store = useStore();
  const searchHistory = useSelector(
    (state: RootState) => state.routine.searchHistory
  );

  const [keyword, setKeyword] = useState('');

  const handleInputChange = (e: TextInputEvent): void => {
    setKeyword(e.nativeEvent.text);
  };

  const handleKeywordClear = (): void => {
    setKeyword('');
  };

  const handleInputBlur = async (): Promise<void | boolean> => {
    if (!keyword) {
      return;
    }

    store.dispatch({
      type: 'routine/setSearchHistory',
      payload: Array.from(new Set([keyword, ...searchHistory]))
    });
  };

  const handleSearch = (value: string): void => {
    setKeyword(value);
  };

  const handleCancel = (): void => {
    navigation.goBack();
  };

  useFocusEffect(() => {
    StatusBar.setBarStyle('dark-content');
  });

  return (
    <View style={[styles.page, { paddingTop: inset.top }]}>
      <View style={styles.search}>
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
          {keyword.length > 0 && (
            <Pressable onPress={handleKeywordClear}>
              <Text style={styles.clearIcon}>{'\ue637'}</Text>
            </Pressable>
          )}
        </View>
        <Pressable onPress={handleCancel} style={styles.cancel}>
          <Text style={styles.cancelText}>取消</Text>
        </Pressable>
      </View>
      {keyword.length === 0 && <SearchHistory onSearch={handleSearch} />}
      {keyword.length > 0 && <SearchDetail keyword={keyword} />}
    </View>
  );
}

export default Search;
