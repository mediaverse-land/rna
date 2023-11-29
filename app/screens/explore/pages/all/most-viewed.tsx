import { FC } from "react";
import { StyleSheet } from "react-native";
import { Title } from "../../../../components/title";
import { ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG } from "../../../../constaints/icons";
import Masonry from "../../../../components/masonry";
import { Box } from "../../../../components/box";
import { Flex, PaddingContainer } from "../../../../styles/grid";
import { Asset } from "../../../../types/asset";
import { RenderIf } from "../../../../components/render-if";
import { IfNoItem } from "../../../../components/if-no-item";
import { MOST_VIEWED } from "../../../../constaints/consts";
import { UseNavigationType } from "../../../../types/use-navigation";
import { VIEW_ALL } from "../../../stack";
import { ViewAllPageEnum } from "../../../view-all";

type Props = {
  isLoading: boolean;
  data: Asset[];
  disableOnIntractions?: boolean;
  navigation: UseNavigationType;
};

export const AllPageMostViewed: FC<Props> = ({
  isLoading,
  data,
  disableOnIntractions = false,
  navigation,
}) => {
  
  const viewAllNavigationHandler = () => {
    navigation.navigate(VIEW_ALL, {
      pageDirection: ViewAllPageEnum.MOST_VIEWD_IMAGES
    });
  };

  return (
    <PaddingContainer>
      <Box marginTop={40} flex={1}>
        <Box paddingLeft={0} paddingRight={9} >
          <Title
            showViewMoreButton={true}
            navigateHandler={viewAllNavigationHandler}
            str={MOST_VIEWED}
            svgIcon={
              <ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG
                width={16}
                height={16}
                style={styles.icon}
              />
            }
          />
        </Box>
        <Box width={"100%"} flex={1}>
          <RenderIf condition={isLoading} paddingLeft={24}>
            <IfNoItem dataLength={data.length}>
              <Masonry
                data={data}
                disableOnIntractions={disableOnIntractions}
              />
            </IfNoItem>
          </RenderIf>
        </Box>
      </Box>
    </PaddingContainer>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 8,
    marginTop: 3,
  },
});
