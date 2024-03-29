import { FC, JSXElementConstructor, ReactElement, ReactNode } from 'react';
import { FlatList, FlatListProps } from 'react-native';

type Props = {
  children: ReactNode;
  props?: FlatListProps<any>;
  paddingTop?: number;
  paddingBottom?: number;
  onEndReached?: () => void;
  onRefresh?: () => void;
  onEndReachedThreshold?: number;
  ListFooterComponent?: ReactElement<any, string | JSXElementConstructor<any>>;
};

export const VirtualizedList: FC<Props> = ({
  children,
  props,
  ListFooterComponent,
  paddingTop,
  onEndReached,
  onRefresh,
  onEndReachedThreshold,
  paddingBottom
}) => {
  return (
    <FlatList
      data={[]}
      keyExtractor={() => 'key'}
      renderItem={null}
      ListHeaderComponent={<>{children}</>}
      onRefresh={onRefresh}
      refreshing={false}
      ListFooterComponent={ListFooterComponent}
      style={{
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
        backgroundColor: 'transparent',
        width: '100%',
      }}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      {...props}
    />
  );
};
