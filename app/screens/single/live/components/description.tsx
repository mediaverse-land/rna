import React from "react";
import { RenderIfWithoutLoading } from "../../../../components/render-if-without-loading";
import { Box } from "../../../../components/box";
import { Text } from "../../../../components/text";
import { theme } from "../../../../constaints/theme";

type DescriptionProps = {
  description: string;
};

export const SingleLiveDescription = ({ description }: DescriptionProps) => {
  return (
    <RenderIfWithoutLoading condition={description ? true : false}>
      <Box id="description" width="100%" flex={1} marginTop={16}>
        <Text
          color={theme.color.light.TEXT}
          fontSize={16}
          fontWeight={400}
          lineHeight={16}
        >
          {description}
        </Text>
      </Box>
    </RenderIfWithoutLoading>
  );
};
