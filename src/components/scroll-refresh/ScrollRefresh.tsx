import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, View, Text, StyleSheet } from 'react-native';
import type { ViewStyle, ListRenderItem } from 'react-native';
import type { ResponseType } from '@/types/index';

type Props = {
  // 请求参数
  params?: {
    page?: number;
    pageSize?: number;
    [index: string]: unknown;
  };
  // 排序参数
  sortParams?: {
    [index: string]: unknown;
  };
  // 请求方法
  request: Function;
  // 响应成功回调函数
  responseSuccess?: (response: ResponseType) => void;
  // 响应失败回调函数
  responseError?: () => void;
  style?: ViewStyle;
} & FlatListProps;

type FlatListProps = {
  initialNumToRender?: number;
  showsVerticalScrollIndicator?: boolean;
  renderItem: ListRenderItem<any> | null | undefined;
  numColumns?: number;
  columnWrapperStyle?: ViewStyle;
  ItemSeparatorComponent?: ListRenderItem<unknown> | null | undefined;
  ListHeaderComponent?: React.FunctionComponent | React.ReactElement;
  ListFooterComponent?: React.FunctionComponent | React.ReactElement;
  ListEmptyComponent?: React.FunctionComponent | React.ReactElement;
  onEndReachedThreshold?: number | null | undefined;
};

type RefreshState = {
  page: number;
  pageSize: number;
  data: unknown[];
  isRefresh: boolean;
  isLoadMore: boolean;
  loadText: string;
  currentComplete: boolean;
  complete: boolean;
  empty: boolean;
};

function ScrollRefresh(props: Props): React.ReactElement {
  const [refreshState, setRefreshState] = useState<RefreshState>({
    page: props.params?.page ?? 1,
    pageSize: props.params?.pageSize ?? 10,
    data: [],
    // 下拉刷新
    isRefresh: false,
    // 上拉加载
    isLoadMore: false,
    // 加载文字
    loadText: '',
    // 当前请求是否请求完成
    currentComplete: false,
    // 数据是否全部请求完成
    complete: false,
    // 空数据
    empty: false
  });

  const getListData = (): Promise<unknown[]> => {
    return new Promise((resolve, reject) => {
      props
        .request({
          ...props.params,
          page: refreshState.page,
          per_page: refreshState.pageSize
        })
        .then((res: ResponseType) => {
          if (res?.code !== 200) {
            return;
          }

          props.responseSuccess?.(res);
          resolve(res.data);
        })
        .catch(() => {
          props.responseError?.();
          reject();
        });
    });
  };

  const handleRefreshStatus = async (): Promise<void> => {
    const data = await getListData();

    // 加载失败
    if (!data) {
      setRefreshState({
        ...refreshState,
        data: [],
        isRefresh: false,
        isLoadMore: false,
        currentComplete: true,
        loadText: '接口请求失败, 请重试...'
      });
      return;
    }

    // 第一页, 空数据
    if (refreshState.page === 1 && data.length === 0) {
      setRefreshState({
        ...refreshState,
        data: [],
        isRefresh: false,
        isLoadMore: false,
        currentComplete: true,
        complete: true,
        empty: true,
        loadText: ''
      });
      return;
    }

    // 第一页, 数据量少于一页数据量
    if (refreshState.page === 1 && data.length < refreshState.pageSize) {
      setRefreshState({
        ...refreshState,
        data,
        isRefresh: false,
        isLoadMore: false,
        currentComplete: true,
        complete: true,
        loadText: '没有更多数据了'
      });
      return;
    }

    // 数据量少于一页数据量
    if (data.length < refreshState.pageSize) {
      setRefreshState({
        ...refreshState,
        data: refreshState.data.concat(data),
        isRefresh: false,
        isLoadMore: false,
        currentComplete: true,
        complete: true,
        loadText: '没有更多数据了'
      });
      return;
    }

    setRefreshState({
      ...refreshState,
      data: refreshState.data.concat(data),
      isRefresh: false,
      isLoadMore: false,
      currentComplete: true,
      loadText: '加载更多...'
    });
  };

  const onRefresh = (): void => {
    setRefreshState({
      ...refreshState,
      page: 1,
      data: [],
      isRefresh: true,
      currentComplete: false,
      complete: false,
      empty: false,
      loadText: ''
    });
  };

  const onEndReached = (): void => {
    // 当前请求未完成 / 加载完成
    if (!refreshState.currentComplete || refreshState.complete) {
      return;
    }

    setRefreshState({
      ...refreshState,
      page: refreshState.page + 1,
      isLoadMore: true,
      currentComplete: false,
      loadText: '加载中...'
    });
  };

  // 初始化、排序
  useEffect(() => {
    if (props.sortParams) {
      onRefresh();
      return;
    }

    handleRefreshStatus();
  }, [props.sortParams]);

  // 下拉刷新、上拉加载
  useEffect(() => {
    if (!refreshState.isRefresh && !refreshState.isLoadMore) {
      return;
    }

    handleRefreshStatus();
  }, [refreshState]);

  const ListFooterComponent = (): React.ReactElement => {
    return (
      <View style={styles.loadMore}>
        <Text style={styles.loadMoreText}>{refreshState.loadText}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.list, props.style]}>
      <FlatList
        keyExtractor={(_, index) => String(index)}
        initialNumToRender={props.initialNumToRender}
        showsVerticalScrollIndicator={props.showsVerticalScrollIndicator}
        data={refreshState.data}
        renderItem={props.renderItem}
        numColumns={props.numColumns}
        columnWrapperStyle={props.columnWrapperStyle}
        // 分隔组件
        ItemSeparatorComponent={props.ItemSeparatorComponent}
        // 头尾布局
        ListHeaderComponent={props.ListHeaderComponent}
        ListFooterComponent={props.ListFooterComponent ?? ListFooterComponent}
        // 空布局
        ListEmptyComponent={
          refreshState.empty ? props.ListEmptyComponent : null
        }
        // 下拉刷新
        refreshing={refreshState.isRefresh}
        onRefresh={onRefresh}
        // 加载更多
        onEndReachedThreshold={props.onEndReachedThreshold}
        onEndReached={onEndReached}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  loadMore: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 36
  },
  loadMoreText: {
    fontSize: 13,
    color: '#909399'
  }
});

export default ScrollRefresh;
