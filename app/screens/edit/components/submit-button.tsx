import { useState } from "react";
import { UseNavigationType } from "../../../types/use-navigation";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { Box } from "../../../components/box";
import { Image, TouchableOpacity } from "react-native";
import {
  ADD_ACCOUNT_BUTTON_GRADIENT,
  SINGLE_VIDEO_FOOTER_GRAIDENT,
} from "../../../constaints/images";
import { Text } from "../../../components/text";
import { theme } from "../../../constaints/theme";
import { ICON_EYE_GRAY, ICON_SHRE_GRAY } from "../../../constaints/icons";
import { LoadingSpinner } from "../../../components/loader-spinner";

type Props = {
  isLoading: boolean;
  onSave: () => void;
};

const TOUR_GUIDE =
  "After choosing the content you want, you have to pay for it depending on its price";

export function EditSubmitButton({
  //   price,
  //   thumbnail,
  //   title,
  //   assetId,
  isLoading,
  onSave,
}: //   isSubscriber,
//   isOwner,
Props) {
  if (isLoading) {
    return null;
  }

  const navigation = useNavigation<UseNavigationType>();
  const isFocused = useIsFocused();

  //   const paymentScreenNavigationHandler = async() => {
  //     onSave()
  //   };

  const goBackButton = () => {
    navigation?.goBack();
  };

  return (
    <>
      <Box width="100%" height={176}>
        <Image
          source={{ uri: SINGLE_VIDEO_FOOTER_GRAIDENT }}
          style={{
            width: "100%",
            height: 176,
            position: "absolute",
            top: 0,
            left: 0,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
          resizeMode="stretch"
        />
        <Box width="100%" height={176} padding={24}>
          <Box
            width="100%"
            height={56}
            borderRadius={16}
            backgroundColor="rgba(78, 78, 97, 0.5)"
          >
            <Image
              source={{
                uri: ADD_ACCOUNT_BUTTON_GRADIENT,
              }}
              style={{
                width: "100%",
                height: 56,
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 10,
                borderRadius: 16,
              }}
              resizeMode="stretch"
            />
            <Box
              position="relative"
              zIndex={11}
              height="100%"
              direction="row"
              alignItems="center"
              justifyContent="center"
              paddingLeft={17}
              paddingRight={17}
            >
              <TouchableOpacity
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                activeOpacity={1}
                onPress={goBackButton}
              >
                <Text
                  color={theme.color.light.WHITE}
                  fontSize={14}
                  lineHeight={20}
                  fontWeight={600}
                >
                  Discard changes
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
          {/* buy-buton */}
          <Box marginTop={16}>
            <TouchableOpacity activeOpacity={1} onPress={onSave}>
              <Box
                width="100%"
                height={48}
                backgroundColor={theme.color.light.PRIMARY}
                borderRadius={16}
                alignItems="center"
                justifyContent="center"
                position="relative"
              >
                <Text
                  color={theme.color.light.WHITE}
                  fontSize={14}
                  lineHeight={20}
                  fontWeight={600}
                >
                  {isLoading ? <LoadingSpinner color='red'/> : 'Save changes'}
                </Text>
              </Box>
            </TouchableOpacity>
          </Box>
          {/* ) : null} */}
        </Box>
      </Box>
    </>
  );
}
