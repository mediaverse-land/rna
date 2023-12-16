import { FC, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Asset } from '../../../types/asset';
import { Box } from '../../../components/box';
import { Text } from '../../../components/text';
import { ListItem } from './list-item';
import { UseNavigationType } from '../../../types/use-navigation';

type Props = {
  data: Asset[];
  isLoading: boolean;
  onEndReached?: () => void;
};

const keyExtractor = (item: Asset) => item.id.toString();

const contentTypes: Record<number, Record<string, string>> = {
  1: {
    name: 'texts',
    screen: 'SingleTextScreen',
  },
  2: {
    name: 'images',
    screen: 'SingleImageScreen',
  },
  3: {
    name: 'sounds',
    screen: 'SingleSoundScreen',
  },
  4: {
    name: 'vidoes',
    screen: 'SingleVideoScreen',
  },
};

export const List: FC<Props> = ({ data, isLoading, onEndReached }) => {
  const navigation = useNavigation<UseNavigationType>();

  const renderItem = useCallback(({ item, index }: { item: Asset | any; index: number }) => {
    const itemContentType = contentTypes[item.type];

    if (!item.id) {
      return;
    }

    const thumbnail =
      item?.asset?.thumbnails?.['226x226'] ||
      item?.asset?.thumbnails?.['336x366'] ||
      item?.asset?.thumbnails?.['525x525'];

    const user = item?.asset?.user;

    return (
      <ListItem
        width={140}
        imagePath={thumbnail}
        title={item.name}
        index={index}
        username={user?.username}
        profileUri={user?.image_url}
        showItemTypeIcon
        type={item.type}
        onpress={() => {
          navigation?.navigate(itemContentType.screen, {
            id: item.id,
            asset_user_image_url: user?.image_url,
            asset_username: user?.username,
          });
        }}
        isSelected={false}
      />
    );
  }, []);

  return (
    <>
      {data.length === 0 ? (
        <Box
          marginTop={32}
          width="100%"
          alignItems="flex-start"
          justifyContent="center"
          paddingLeft={24}
          height={100}
        >
          {!isLoading ? <Text color="#fff">No item to show</Text> : null}
        </Box>
      ) : (
        <FlatList
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          numColumns={2}
          onEndReached={onEndReached}
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      )}
    </>
  );
};
