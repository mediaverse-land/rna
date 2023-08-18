import { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { Title } from "../../../../components/title";
import { Box } from "../../../../components/box";
import { Flex } from "../../../../styles/grid";
import { ICON_TOP_TABBAR_TEXT_ACTIVE_SVG } from "../../../../constaints/icons";
import { UseNavigationType } from "../../../../types/use-navigation";
import { TextSlider } from "../../../../components/text-slider";
import { TOP_TEN_TEXTS } from "../../../../constaints/consts";
import type { Text as TextType } from "../../../../types/text";
import { RenderIf } from "../../../../components/render-if";
import { IfNoItem } from "../../../../components/if-no-item";
import { Text } from "../../../../components/text";

type Props = {
  isLoading: boolean;
  data: TextType[];
  disableOnIntractions?: boolean;
};

export const AllPageTopTenText: FC<Props> = ({
  isLoading,
  data,
  disableOnIntractions = false,
}) => {
  const navigation = useNavigation<UseNavigationType>();

  return (
    <Box
      id="top-ten-text-slider-wrapper"
      marginTop={35}
      paddingLeft={24}
      flex={1}
    >
      <Flex direction="row">
        <ICON_TOP_TABBAR_TEXT_ACTIVE_SVG
          width={16}
          height={16}
          style={{ marginRight: 8, marginTop: 3 }}
        />
        <Title str={TOP_TEN_TEXTS} />
      </Flex>
      <RenderIf condition={isLoading}>
        {data.length ? (
          <TextSlider
            disableOnIntractions={disableOnIntractions}
            data={data}
            isLoading={isLoading}
            navigation={navigation}
          />
        ) : (
          <Box marginTop={16}>
            <Text color="#fff">No item to show</Text>
          </Box>
        )}
      </RenderIf>
    </Box>
  );
};
