import { FC, JSXElementConstructor, ReactElement, ReactNode } from 'react';
import { FlatList, FlatListProps } from 'react-native';

type Props = {
    children: ReactNode;
    props?: FlatListProps<any>;
    paddingTop?: number;
    onEndReached?: () => void;
    onRefresh?: () => void;
    onEndReachedThreshold?: number,
    ListFooterComponent?: ReactElement<any, string | JSXElementConstructor<any>>
};

export const VirtualizedList: FC<Props> = ({ children, props,ListFooterComponent, paddingTop, onEndReached,onRefresh, onEndReachedThreshold }) => {
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
                backgroundColor: 'transparent',
                width: '100%',
            }}
            onEndReached={onEndReached}
            onEndReachedThreshold={onEndReachedThreshold}
            {...props}
        />
    );
};
