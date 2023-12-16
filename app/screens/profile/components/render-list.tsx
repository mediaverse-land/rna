import { memo } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IfNoItem } from '../../../components/if-no-item';
import { RenderIf } from '../../../components/render-if';
import { Asset } from '../../../types/asset';
import { ListItem } from './list-item';
import { windowSize } from '../../../utils/window-size';
import {
  AUDIO_THUMBNAIL_PLACEHOLDER,
  IMAGE_THUMBNAIL_PLACEHOLDER,
  PROFILE_ONE,
  TEXT_THUMBNAIL_PLACEHOLDER,
  VIDEO_THUMBNAIL_PLACEHOLDER,
} from '../../../constaints/images';
import { PaddingContainer } from '../../../styles/grid';
import { Box } from '../../../components/box';
import { Text } from '../../../types/text';
import { UseNavigationType } from '../../../types/use-navigation';

type Data = Asset | Text;

interface Props {
  isLoading: boolean;
  data: Data[];
  isSelectedContent: (itemId: number) => boolean;
  selectOwnedItemLognPressHandler: ({ id, type }: { id: number; type: string }) => void;
  selectOwnedItemPressHandler: ({ id, type }: { id: number; type: string }) => void;
  selectedContentsLength: number;
  onEndReached?: any;
  onRefresh?: () => void;
}

const { width } = windowSize();
const screenSize = Math.floor(width);
const listItemWidth = screenSize / 2 - 32;

// const TOUR_GUIDE =
//   "Do you want to remember at a glance what assets you sold or what you bought?! Just look at this as an asset ledger";

const placeholderItems: Record<number, string> = {
  1: TEXT_THUMBNAIL_PLACEHOLDER,
  2: IMAGE_THUMBNAIL_PLACEHOLDER,
  3: AUDIO_THUMBNAIL_PLACEHOLDER,
  4: VIDEO_THUMBNAIL_PLACEHOLDER,
};

const keyExtractor = (item: any) => item.asset_id;

function RenderList({
  isLoading,
  data,
  isSelectedContent,
  selectOwnedItemLognPressHandler,
  selectOwnedItemPressHandler,
  selectedContentsLength,
  onEndReached,
  onRefresh,
}: Props) {
  const navigation = useNavigation<UseNavigationType>();

  const navigateToSinglePageHandler = (
    type: number,
    id: number,
    name: string,
    asset_username: string,
    asset_user_image_url: string,
  ) => {
    if (selectedContentsLength !== 0) {
      return;
    }

    const availableScreens: Record<number, string> = {
      1: 'SingleTextScreen',
      2: 'SingleImageScreen',
      3: 'SingleSoundScreen',
      4: 'SingleVideoScreen',
    };

    const screen = availableScreens[type];

    if (screen)
      navigation.navigate(screen, {
        id,
        name,
        isOwner: true,
        asset_username,
        asset_user_image_url: asset_user_image_url || PROFILE_ONE,
      });
  };

  const renderListItem = ({ item }: { item: any }) => {
    const isSelected = isSelectedContent(item.id);

    const contentData = {
      id: item.id,
      asset_id: item.asset_id || item.id,
      thumbnail: item.asset?.thumbnails?.['226x226'] || placeholderItems[item?.asset?.type],
      title: item.asset?.name || item?.name,
      description: item.asset?.description || item?.description,
      username: item.asset?.user?.username || 'static_username',
      userProfileUri: item.asset?.user?.image_url,
    };

    if (!contentData.asset_id || !contentData.title) {
      return null;
    }

    return (
      <>
        <ListItem
          width={listItemWidth}
          imagePath={contentData.thumbnail}
          title={contentData.title}
          username={contentData.username}
          profileUri={contentData.userProfileUri || PROFILE_ONE}
          onlongpress={() =>
            selectOwnedItemLognPressHandler({
              id: item.id,
              type: item.asset?.type || item.type,
            })
          }
          onpress={() => {
            selectOwnedItemPressHandler({
              id: item.id,
              type: item.asset?.type || item.type,
            });
            navigateToSinglePageHandler(
              item.asset?.type || item.type,
              contentData.id,
              contentData.title,
              item.asset?.user?.username,
              item.asset?.user?.image_url,
            );
          }}
          isSelected={isSelected}
        />
      </>
    );
  };

  return (
    <Box flex={1} width="100%" backgroundColor="transparent">
      <PaddingContainer>
        <RenderIf condition={isLoading}>
          <IfNoItem style={{ marginTop: 90 }} dataLength={data.length}>
            <FlatList
              onRefresh={onRefresh}
              numColumns={2}
              data={data}
              renderItem={renderListItem}
              keyExtractor={keyExtractor}
              onEndReached={onEndReached}
              columnWrapperStyle={{
                justifyContent: 'space-between',
              }}
              style={{
                paddingTop: 95,
              }}
            />
          </IfNoItem>
        </RenderIf>
      </PaddingContainer>
    </Box>
  );
}

export default memo(RenderList);
