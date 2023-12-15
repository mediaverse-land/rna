import React, { memo } from "react";
import { Text } from "../../../components/text";
import { FlashList } from "@shopify/flash-list";
import { Box } from "../../../components/box";
import { Flex, PaddingContainer } from "../../../styles/grid";
import { windowSize } from "../../../utils/window-size";
import { TouchableOpacity, View } from "react-native";
import { theme } from "../../../constaints/theme";
import { UserNameCard } from "../../../components/username-card";
import type { Video } from "./../../../types/video";
import { formatTime } from "../../../utils/format-time";
import { VideoPageComponents } from "../../explore/pages/videos/style";
import { navigateTo } from "../utils/navigate-to-single-screen";
import {
  PROFILE_IMAGE,
  VIDEO_LIST_ITEM_GRADIENT,
  VIDEO_THUMBNAIL_PLACEHOLDER,
} from "../../../constaints/images";

type Props = {
  data: Video[];
  navigate: (...args: any) => void;
};

const { width: WINDOW_WIDTH } = windowSize();

const {
  VideoListItem,
  VideoListItemThumbnail,
  VideoListItemGradietImage,
  VideoListItemDescription,
  VideoListItemDuration,
} = VideoPageComponents;

const ViewAllVideoList = ({ data, navigate }: Props) => {
  // const navigateToSinglVide = (
  //   id: number,
  //   name: string,
  //   username: string,
  //   asset_user_image_url: string
  // ) => {
  //   navigate(SINGLE_IMAGE_SCREEN, {
  //     id,
  //     name: name,
  //     asset_username: username,
  //     asset_user_image_url,
  //   });
  // };

  const renderVidoeListItem = ({ item }: { item: any }) => {
    const asset_username = item?.asset?.user?.username;
    const asset_user_image_url =
      item?.asset?.user?.image_url === `${process.env.EXPO_APP_URL}/storage/`
        ? PROFILE_IMAGE
        : item?.asset?.user?.image_url;

    const videoLength = formatTime(item?.length);

    const name = item?.name;

    const thumbUri =
      item?.asset?.thumbnails?.["340x220"] || VIDEO_THUMBNAIL_PLACEHOLDER;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={
          () => navigateTo.singleVideo({ navigate, id: item.id })
          // navigateToSinglVide(
          //   item.id,
          //   item.name,
          //   asset_username,
          //   asset_user_image_url
          // )
        }
        style={{
          width: "100%",
        }}
      >
        <Box width="100%" flex={1}>
          <VideoListItem>
            <View>
              <VideoListItemThumbnail
                source={{
                  uri: thumbUri,
                }}
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

  const keyExtractor = (item: Video) => item.id.toString();

  return (
    <PaddingContainer>
      <Box width={'100%'} flex={1} marginTop={56}>
        <FlashList
          data={data}
          renderItem={renderVidoeListItem}
          keyExtractor={keyExtractor}
          // onEndReached={onEndReached}
          onEndReachedThreshold={2.5}
          estimatedItemSize={15}
        />
      </Box>
    </PaddingContainer>
  );
};

export default ViewAllVideoList;
