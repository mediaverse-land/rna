import { FC, useCallback } from "react";
import { IfNoItem } from "../if-no-item";
import { Box } from "../box";
import { FlatList } from "react-native";
import { RenderIf } from "../render-if";
import { TextSliderComponents } from "./style";
import { UseNavigationType } from "../../types/use-navigation";
import {
  PROFILE_ONE,
  TEXT_SLIDER_COVER_BG,
  // TEXT_SLIDER_ITEM_GRADIENT,
} from "../../constaints/images";
import { UserNameCard } from "../username-card";
import { theme } from "../../constaints/theme";
import { Text } from "../../types/text";

type Props = {
  data: Text[];
  isLoading: boolean;
  navigation: UseNavigationType;
  disableOnIntractions?: boolean;
};

const {
  TextSlide,
  TextSlideBackgroundGradient,
  TextSlideBody,
  TextSlideTitle,
  TextSlideContentText,
} = TextSliderComponents;

export const TextSlider: FC<Props> = ({
  data,
  isLoading,
  navigation,
  disableOnIntractions = false,
}) => {
  const textScreenNavigationHandler = (
    title: string,
    asset_id: number,
    id: number,
    user_image_url: string,
    asset_username: string
  ) => {

    if (disableOnIntractions) {
      return;
    }
    navigation.navigate("SingleTextScreen", {
      title,
      asset_id,
      id,
      user_image_url,
      asset_username,
    });
  };

  const renderItem = useCallback(({ item, index}: { item: Text, index: number }) => {
      const data = {
        name: item?.name,
        description: item?.description,
      };
  
      const user_image_url = item?.asset?.user?.image_url;
      const asset_username = item?.asset?.user?.username;
  
      return (
        <TextSlide style={[index === 0 && {marginLeft: 24}]}>
          <TEXT_SLIDER_COVER_BG />
  
          <TextSlideBody
            onPress={() =>
              textScreenNavigationHandler(
                item.name,
                item.asset_id,
                item.id,
                user_image_url,
                asset_username
              )
            }
            activeOpacity={1}
          >
            <Box width='100%' height={16}>
              <TextSlideTitle>{data.name}</TextSlideTitle>
            </Box>
            <TextSlideContentText>{data.description}</TextSlideContentText>
            <Box marginTop={16}>
              <UserNameCard
                username={asset_username}
                profileUri={user_image_url || PROFILE_ONE}
                usernameStyles={{
                  color: theme.color.light.TEXT,
                  marginLeft: 8,
                }}
              />
            </Box>
          </TextSlideBody>
        </TextSlide>
      );
  } ,[])

  return (
    <RenderIf condition={isLoading}>
      <IfNoItem dataLength={data.length}>
        <Box width="100%" height={154} marginTop={24}>
          <FlatList
            horizontal
            data={data}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
          />
        </Box>
      </IfNoItem>
    </RenderIf>
  );
};
