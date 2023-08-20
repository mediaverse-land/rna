import React, { memo } from "react";
import { Text } from "../../../components/text";
import { FlashList } from "@shopify/flash-list";
import { Box } from "../../../components/box";
import type { Image as ImageType } from "../../../types/image";
import { PaddingContainer } from "../../../styles/grid";
import { windowSize } from "../../../utils/window-size";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { UserNameCard } from "../../../components/username-card";
import { SINGLE_IMAGE_SCREEN, SINGLE_TEXT_SCREEN } from "../../../constaints/consts";
import { PROFILE_ONE, TEXT_SLIDER_COVER_BG } from "../../../constaints/images";
import { navigateTo } from "../utils/navigate-to-single-screen";

type Props = {
  data: ImageType[];
  navigate: (...args: any) => void;
};

const { width: WINDOW_WIDTH } = windowSize();

const itemWidth = Math.floor(WINDOW_WIDTH) / 2 - 40;

const theme_text_color = "#CCCCFF";
const title_text_size = 16;
const username_text_size = 12;

const ViewAllTextsList = ({ data, navigate }: Props) => {
  const renderItem = ({ item }: { item: ImageType }) => {
    return (
      <TouchableOpacity
        onPress={() => navigateTo.singleText({navigate, id: item.id})}
        activeOpacity={1}
      >
        <Box
          width={itemWidth}
          height={154}
          marginBottom={34}
          position="relative"
          paddingLeft={16}
          paddingRight={16}
          paddingTop={24}
        >
          <Box id="tite" height={16}>
            <Text
              color={"#CCCCFF"}
              lineHeight={title_text_size}
              fontSize={title_text_size}
            >
              {item.name}
            </Text>
          </Box>
          <Box id="description" marginTop={8} height={48}>
            <Text
              color="#666680"
              lineHeight={title_text_size}
              fontSize={title_text_size}
            >
              {item.description}
            </Text>
          </Box>
          <Box id="username" marginTop={16}>
            <UserNameCard
              username={item.asset.user.username}
              profileUri={PROFILE_ONE}
              profileImageStyles={{
                width: 16,
                height: 16,
              }}
              usernameStyles={{
                color: theme_text_color,
                marginLeft: 8,
                fontSize: username_text_size,
                lineheight: username_text_size,
              }}
            />
          </Box>
          <TEXT_SLIDER_COVER_BG
            style={{
              width: "101%",
              height: 163,
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </Box>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: ImageType) => item.id.toString();

  return (
    <Box marginTop={56}>
      <PaddingContainer>
        <FlashList
          style={{ justifyContent: "space-between" }}
          data={data}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          estimatedItemSize={20}
          onEndReached={() => console.log("onEndReached")}
        />
      </PaddingContainer>
    </Box>
  );
};

export default ViewAllTextsList;
