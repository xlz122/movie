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

  const [search, setSearch] = useState({
    keyword: '',
    type: 'movie'
  });

  const handleInputChange = (e: TextInputEvent): void => {
    setSearch({ ...search, keyword: e.nativeEvent.text });
  };

  const handleClearKeyword = () => {
    setSearch({ ...search, keyword: '' });
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  // 记录历史记录
  const handleInputBlur = async (): Promise<void | boolean> => {
    if (!search.keyword) {
      return false;
    }

    store.dispatch({
      type: 'routine/setSearchHistory',
      payload: Array.from(new Set([search.keyword, ...searchHistory]))
    });
  };

  // 历史记录搜索
  const historySearch = (value: string) => {
    setSearch({ ...search, keyword: value });
  };

  const [tab] = useState([
    { title: '影视', type: 'movie' },
    { title: '影人', type: 'actor' },
    { title: '角色', type: 'role' }
  ]);

  const toggleSort = (value: string): void => {
    setSearch({ ...search, type: value });
  };

  return (
    <View style={styles.search}>
      <View style={styles.searchContainer}>
        <View style={styles.input}>
          <Text style={styles.inputIcon}>{'\ue613'}</Text>
          <TextInput
            autoFocus
            value={search.keyword}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder="找影视 / 影人 / 角色"
            style={styles.inputText}
          />
          {Boolean(search?.keyword) && (
            <Pressable onPress={handleClearKeyword}>
              <Text style={styles.inputClearIcon}>{'\ue637'}</Text>
            </Pressable>
          )}
        </View>
        <Text onPress={handleCancel} style={styles.cancelText}>
          取消
        </Text>
      </View>
      {Boolean(search?.keyword) && (
        <>
          <View style={styles.tab}>
            {tab.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => toggleSort(item.type)}
                  style={styles.tabItem}
                >
                  <Text style={styles.tabItemText}>{item.title}</Text>
                  <View
                    style={
                      search.type === item.type ? styles.tabActiveLine : null
                    }
                  />
                </Pressable>
              );
            })}
          </View>
          <SearchDetail search={search} />
        </>
      )}
      {!search.keyword && <SearchHistory historySearch={historySearch} />}
    </View>
  );
}

export default Search;
