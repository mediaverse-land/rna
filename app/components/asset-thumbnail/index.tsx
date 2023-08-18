import React from "react";
import { Box } from "../box";
import { Image } from "react-native";
import { SINGLE_VIDEO_COVER_IMAGE_GRADIENT } from "../../constaints/images";

type Props = {
  assetType: "video" | "sound" | "text" | "image";
  thumnailImageUri: string;
};

const thumbnailHeight = 218;

export const AssetThumbnail = ({ assetType, thumnailImageUri }: Props) => {
  if (assetType === "image") {
    return (
      <Box  width="100%" height={thumbnailHeight}>
        {Image__thumbnailCoverGradient}
        {thumnailImageUri ? (
          <Image
            source={{ uri: thumnailImageUri }}
            style={{
              width: "100%",
              height: thumbnailHeight,
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            }}
            resizeMode="cover"
          />
        ) : null}
      </Box>
    );
  }
  return <div>AssetTitl</div>;
};

const Image__thumbnailCoverGradient = (
  <Image
    source={{
      uri: SINGLE_VIDEO_COVER_IMAGE_GRADIENT,
    }}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 10,
      height: thumbnailHeight,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
    }}
  />
);
