/* eslint-disable react-native/no-inline-styles */
import React, {ReactElement} from 'react';
import {ListRenderItemInfo} from 'react-native';

import Empty from '../Empty';

import {PerformaticList} from './styles';

interface FeedListProps<T> {
  items: T[];
  itemRender: (item: T) => ReactElement;
  /**
   * usefull to trigger reflesh request
   * on scroll down
   */
  onRefresh?: () => void;
  /**
   * usefull to trigger pagination action
   * on reach end of the list
   */
  onEndReached?: () => void;
  emptyTitle: string;
  emptySubtitle: string;
  emptyOnPressButton?: () => void;
  emptyButtonText?: string;
  loading: boolean;
}

export function FeedList<T>({
  items,
  emptySubtitle,
  emptyTitle,
  loading,
  itemRender,
  onEndReached,
  onRefresh,
  emptyButtonText,
  emptyOnPressButton,
}: FeedListProps<T>) {
  return (
    <PerformaticList
      data={items}
      removeClippedSubviews
      initialNumToRender={3}
      keyExtractor={(item: any) => String(item.id)}
      renderItem={({item}: ListRenderItemInfo<T>) => itemRender(item)}
      ListEmptyComponent={() => (
        <Empty
          title={emptyTitle}
          subTitle={emptySubtitle}
          onPressTo={emptyOnPressButton}
          buttonText={emptyButtonText}
        />
      )}
      onRefresh={() => {
        onRefresh && onRefresh();
      }}
      onEndReached={() => {
        onEndReached && onEndReached();
      }}
      onEndReachedThreshold={0.5}
      refreshing={loading}
      viewabilityConfig={{viewAreaCoveragePercentThreshold: 20}}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: 4}}
    />
  );
}
