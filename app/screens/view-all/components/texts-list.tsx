import React, { memo } from "react";
import { Text } from "../../../components/text";
import { FlashList } from "@shopify/flash-list";
import { Box } from "../../../components/box";
import type { Image as ImageType } from "../../../types/image";
import { PaddingContainer } from "../../../styles/grid";
import { windowSize } from "../../../utils/window-size";
import { FlatList, TouchableOpacity } from "react-native";
import { UserNameCard } from "../../../components/username-card";
import { PROFILE_ONE, TEXT_SLIDER_COVER_BG } from "../../../constaints/images";
import { navigateTo } from "../utils/navigate-to-single-screen";
import { Text as TextType } from "../../../types/text";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  data: TextType[];
  navigate: (...args: any) => void;
  marginTop?: number;
};

const { width: WINDOW_WIDTH } = windowSize();

const itemWidth = Math.floor(WINDOW_WIDTH) / 2 - 32;

const theme_text_color = "#CCCCFF";
const title_text_size = 16;
const username_text_size = 12;

const ViewAllTextsList = ({ data, navigate, marginTop }: Props) => {
  const renderItem = ({ item }: { item: TextType }) => {
    return (
      <TouchableOpacity
        onPress={() => navigateTo.singleText({ navigate, id: item.id })}
        activeOpacity={1}
      >
        <Box
          width={itemWidth}
          // hasBlackBorder
          height={itemWidth}
          marginBottom={16}
          position="relative"
        >
          <LinearGradient
            colors={["#19194a", "rgba(207, 207, 252, 0.3)"]}
            start={{ x: 0.8, y: 1 }}
            style={{
              flex: 1,
              position: "absolute",
              padding: 1,
              width: "100%",
              height: "100%",
              borderRadius: 16,
            }}
          >
            <Box
              width="100%"
              height="100%"
              backgroundColor="#19194a"
              borderRadius={16}
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
              <Box width="100%" height={18} id="username" marginTop={11}>
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
            </Box>
          </LinearGradient>

          {/* <TEXT_SLIDER_COVER_BG
            width="106%"
            height="106%"
            style={{
              position: "absolute",
              // top: -50,
              left: 0,
            }}
          /> */}
        </Box>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: TextType) => item.id.toString();

  return (
    <Box marginTop={marginTop ? marginTop : 56}>
      <PaddingContainer>
        <FlatList
          style={{ justifyContent: "space-between" }}
          contentContainerStyle={{ justifyContent: "space-between" }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          data={data}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </PaddingContainer>
    </Box>
  );
};

export default ViewAllTextsList;
