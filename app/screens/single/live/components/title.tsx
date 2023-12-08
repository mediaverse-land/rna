import React from "react";
import { Box } from "../../../../components/box";
import { Image } from "react-native";
import { Text } from "../../../../components/text";
import { theme } from "../../../../constaints/theme";

type Props = {
  videoUri: string;
  imageUrl: string;
  contentName: string;
};

export const SinglLiveTitle = ({ videoUri, imageUrl, contentName }: Props) => {
  return (
    <Box
      id="thumbnail-and-title"
      direction="row"
      alignItems="center"
      height={48}
      marginTop={videoUri ? 0 : 16}
    >
      <Image
        source={{
          uri: imageUrl,
        }}
        style={{
          width: 88,
          height: 48,
          borderRadius: 8,
        }}
        resizeMode="cover"
      />
      <Box flex={1}>
        <Text
          color={theme.color.light.CARD_TITLE_TEXT}
          fontSize={16}
          lineHeight={16}
          fontWeight={400}
          marginLeft={8}
          textStyles={{
            height: 20,
            paddingTop: 5,
          }}
        >
          Live channel {contentName}
        </Text>
      </Box>
    </Box>
  );
};
