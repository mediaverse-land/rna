import { FlatList, View, TouchableOpacity } from "react-native";
import { VideoPageComponents } from "./style";
import {
  PROFILE_IMAGE,
  VIDEO_LIST_ITEM_GRADIENT,
  VIDEO_THUMBNAIL_PLACEHOLDER,
} from "../../../../constaints/images";
import { Flex, PaddingContainer } from "../../../../styles/grid";
import { UserNameCard } from "../../../../components/username-card";
import { useNavigation } from "@react-navigation/native";
import { UseNavigationType } from "../../../../types/use-navigation";
import { theme } from "../../../../constaints/theme";
import { Asset } from "../../../../types/asset";
import { Box } from "../../../../components/box";
import { LoadingSpinner } from "../../../../components/loader-spinner";
import { Text } from "../../../../components/text";
import { windowSize } from "../../../../utils/window-size";
import { formatTime } from "../../../../utils/format-time";
import { Title } from "../../../../components/title";
import { VIEW_ALL } from "../../../stack";
import { ViewAllPageEnum } from "../../../view-all";

type Props = {
  isLoading: boolean;
  data: Asset[];
  onEndReached?: () => void;
  disableOnIntractions?: boolean;
  navigation: UseNavigationType;
};

const {
  VideoListItem,
  VideoListItemThumbnail,
  VideoListItemGradietImage,
  VideoListItemDescription,
  VideoListItemDuration,
} = VideoPageComponents;

const { width } = windowSize();

export function VideoPageList({
  isLoading,
  data,
  onEndReached,
  disableOnIntractions = false,
  navigation,
}: Props) {
  const navigateToSinglVide = (
    id: number,
    name: string,
    username: string,
    asset_user_image_url: string
  ) => {
    if (disableOnIntractions) {
      return;
    }
    navigation.navigate("SingleVideoScreen", {
      id,
      name: name,
      asset_username: username,
      asset_user_image_url,
    });
  };

  const renderVidoeListItem = ({ item }: { item: any }) => {
    const asset_username = item?.asset?.user?.username;
    const asset_user_image_url =
      item?.asset?.user?.image_url === "https://api.mediaverse.land/storage/"
        ? PROFILE_IMAGE
        : item?.asset?.user?.image_url;

    const videoLength = formatTime(item?.length);

    const name = item?.name;

    const thumbUri =
      item?.asset?.thumbnails?.["340x220"] || VIDEO_THUMBNAIL_PLACEHOLDER;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          navigateToSinglVide(
            item.id,
            item.name,
            asset_username,
            asset_user_image_url
          )
        }
        style={{
          width: "100%",
        }}
      >
        <Box  width="100%" flex={1}>
          <VideoListItem>
            <View>
              <VideoListItemThumbnail
                source={{
                  uri: thumbUri,
                }}
                resizeMode="contain"
              />
              <VideoListItemGradietImage
                source={{ uri: VIDEO_LIST_ITEM_GRADIENT }}
              />
              <Box
                position="absolute"
                zIndex={10}
                width="100%"
                bottom={16}
                paddingLeft={24}
                paddingRight={24}
              >
                <Text color="#fff">{name}</Text>
              </Box>
            </View>
            <View>
              {item.description ? (
                <VideoListItemDescription>
                  {item?.description}
                </VideoListItemDescription>
              ) : null}
              <Flex
                direction="row"
                align="center"
                justify="space-between"
                style={{
                  marginTop: 16,
                  paddingLeft: 8,
                  paddingRight: 8,
                }}
              >
                <UserNameCard
                  username={asset_username || ""}
                  profileUri={asset_user_image_url || ""}
                  usernameStyles={{
                    color: theme.color.light.TEXT,
                    marginLeft: 8,
                    fontSize: 12,
                  }}
                />
                <VideoListItemDuration>
                  {videoLength?.minute}:{videoLength?.second}
                </VideoListItemDuration>
              </Flex>
            </View>
          </VideoListItem>
        </Box>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: Asset) => item.id.toString();

  const viewAllNavigationHandler = () => {
    navigation.navigate(VIEW_ALL, {
      pageDirection: ViewAllPageEnum.RECENTLY_VIDEOS,
    });
  };

  return (
    <PaddingContainer>
      <Box paddingRight={9} marginTop={40}>
        <Title
          showViewMoreButton={true}
          navigateHandler={viewAllNavigationHandler}
          str={"Recently"}
        />
      </Box>
      <Box marginTop={24} width={Math.floor(width) - 48} flex={1}>
        {isLoading ? (
          <Box
            width="100%"
            paddingRight={24}
            height={100}
            alignItems="center"
            justifyContent="center"
            paddingLeft={24}
          >
            <LoadingSpinner color="red" />
          </Box>
        ) : data.length === 0 ? (
          <Box
            width="100%"
            alignItems="flex-start"
            justifyContent="center"
            paddingLeft={24}
          >
            <Text color="#fff">No item to show</Text>
          </Box>
        ) : (
          <FlatList
            data={data}
            renderItem={renderVidoeListItem}
            keyExtractor={keyExtractor}
            onEndReached={onEndReached}
            onEndReachedThreshold={2.5}
          />
        )}
      </Box>
    </PaddingContainer>
  );
}
