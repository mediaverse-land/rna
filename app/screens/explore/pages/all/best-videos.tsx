import { View } from "react-native";
import { Title } from "../../../../components/title";
import { HorizontalSlider } from "../../../../components/horizontal-slider";
import { Asset } from "../../../../types/asset";
import { Box } from "../../../../components/box";
import { LoadingSpinner } from "../../../../components/loader-spinner";
import { Text } from "../../../../components/text";
import { UseNavigationType } from "../../../../types/use-navigation";
import { VIEW_ALL } from "../../../stack";
import { ViewAllPageEnum } from "../../../view-all";
import { BEST_VIDEOS } from "../../../../constaints/consts";
import { ICON_TOP_TABBAR_VIDEO_ACTIVE_SVG } from "../../../../constaints/icons";

type Props = {
  isLoading: boolean;
  data: Asset[];
  navigation: UseNavigationType;
  disableOnIntractions?: boolean;
};

export function ExplorePageBestVideos({
  isLoading,
  data,
  disableOnIntractions = false,
  navigation,
}: Props) {
  const viewAllNavigationHandler = () => {
    navigation.navigate(VIEW_ALL, {
      pageDirection: ViewAllPageEnum.BEST_VIDEOS,
    });
  };

  return (
    <Box paddingLeft={24}>
      <Box marginRight={32}>
        <Title
          showViewMoreButton={true}
          navigateHandler={viewAllNavigationHandler}
          str={BEST_VIDEOS}
          svgIcon={
            <ICON_TOP_TABBAR_VIDEO_ACTIVE_SVG
              width={16}
              height={16}
              style={{
                marginRight: 8,
                marginTop: 3,
              }}
            />
          }
        />
      </Box>
      <View style={{ marginTop: 24 }}>
        {isLoading ? (
          <Box
            width="100%"
            paddingRight={24}
            height={100}
            alignItems="center"
            justifyContent="center"
          >
            <LoadingSpinner color="red" />
          </Box>
        ) : data.length === 0 ? (
          <Box
            width="100%"
            alignItems="flex-start"
            justifyContent="center"
            paddingLeft={24}
          >
            <Text color="#fff">No item to show</Text>
          </Box>
        ) : (
          <HorizontalSlider
            disableOnIntractions={disableOnIntractions}
            data={data}
          />
        )}
      </View>
    </Box>
  );
}
