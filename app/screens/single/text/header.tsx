import { Image, TouchableOpacity } from "react-native";
import { Box } from "../../../components/box";
import { Text } from "../../../components/text";
import { GoBackButton } from "../components/goback-button";
import { ICON_TEXT_WHITE } from "../../../constaints/icons";
import {
  SINGLE_SOUND_COVER_IMAGE_GRADIENT,
  SINGLE_TEXT_COVER_GRAIDENT,
  SINGLE_TEXT_THUMBNAIL_GRAIDENT,
} from "../../../constaints/images";
import { SingleItemUsernameAndDuration } from "../components/username-and-duration";
import { theme } from "../../../constaints/theme";
import { Toolbar } from "../components/toolbar";
import { RenderIfWithoutLoading } from "../../../components/render-if-without-loading";
import { PaddingContainer } from "../../../styles/grid";

type Props = {
  goBackHandler: () => void;
  openReportModalHandler: () => void;
  thumnailImageUri: string;
  contentName: string;
  isOwner: boolean;
  // is owner or is subscriber
  hasPermission: boolean;
  asset_username: string;
  user_image_url: string;
  toolbar_options: any;
};

const thumbnailHeight = 232;

export function SingleTextHeader({
  goBackHandler,
  openReportModalHandler,
  thumnailImageUri,
  contentName,
  isOwner = false,
  asset_username,
  user_image_url,
  toolbar_options,
  hasPermission,
}: Props) {
  const thumbnailHeaderGradient = (
    <Image
      source={{
        uri: SINGLE_SOUND_COVER_IMAGE_GRADIENT,
      }}
      style={{
        position: "absolute",
        top: -30,
        left: 0,
        width: "100.5%",
        zIndex: 2,
        height: thumbnailHeight + 30,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
      }}
      resizeMode="stretch"
    />
  );

  return (
    <>
      <Box position="relative" zIndex={20}>
        <Box width="100%" height={thumbnailHeight}>
          <GoBackButton
            goBackHandler={goBackHandler}
            hasBackground={false}
            isOwner={isOwner}
          />
          <Box
            width={"100%"}
            height={"100%"}
            position="relative"
            zIndex={11}
            padding={24}
          >
            <Box
              id="inner"
              width="100%"
              height={127}
              flex={1}
              marginTop={81 - 24}
              direction="row"
              justifyContent="space-between"
            >
              <Box width={127} height={127}>
                <Image
                  source={{
                    uri: thumnailImageUri
                      ? thumnailImageUri
                      : SINGLE_TEXT_THUMBNAIL_GRAIDENT,
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 8,
                  }}
                />
                <Image
                  source={{ uri: SINGLE_TEXT_COVER_GRAIDENT }}
                  style={{
                    width: 127,
                    height: 127,
                    borderRadius: 8,
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
                <ICON_TEXT_WHITE
                  style={{
                    width: 20,
                    height: 20,
                    position: "absolute",
                    top: 53,
                    left: 53,
                  }}
                />
              </Box>
              <Box flex={1} height={127} justifyContent="space-between">
                <Text
                  color={theme.color.light.WHITE}
                  fontSize={20}
                  lineHeight={20}
                  fontWeight={600}
                  marginTop={24}
                  paddingLeft={16}
                  paddingRight={16}
                  paddingBottom={16}
                >
                  {contentName}
                </Text>
                <Box
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  paddingLeft={16}
                  paddingBottom={16}
                >
                  <Box flex={1}>
                    <SingleItemUsernameAndDuration
                      username={asset_username}
                      profileUri={user_image_url}
                      duration={null}
                    />
                  </Box>
                  <Box width={50}>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={openReportModalHandler}
                    >
                      <Text color={"#666680"} fontSize={14} fontWeight={400}>
                        Report
                      </Text>
                    </TouchableOpacity>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          {thumbnailHeaderGradient}
        </Box>
      </Box>
      <RenderIfWithoutLoading condition={hasPermission}>
        <PaddingContainer>
          <Toolbar toolbarList={toolbar_options} />
        </PaddingContainer>
      </RenderIfWithoutLoading>
    </>
  );
}
