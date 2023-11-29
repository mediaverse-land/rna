import { useNavigation } from "@react-navigation/native";
import { Title } from "../../../../components/title";
import { Box } from "../../../../components/box";
import { Text } from "../../../../types/text";
import { TextSlider } from "../../../../components/text-slider";
import { UseNavigationType } from "../../../../types/use-navigation";
import { BEST_IN_MONTH } from "../../../../constaints/consts";
import { ICON_TOP_TABBAR_TEXT_ACTIVE_SVG } from "../../../../constaints/icons";
import { VIEW_ALL } from "../../../stack";
import { ViewAllPageEnum } from "../../../view-all";

type Props = {
  data: Text[];
};

export function SoundsPageBestInMonth({ data }: Props) {
  const navigation = useNavigation<UseNavigationType>();

  const viewAllNavigationHandler = () => {
    navigation.navigate(VIEW_ALL, {
      pageDirection: ViewAllPageEnum.BEST_IN_MONTH_TEXTS,
    });
  };
  
  return (
    <Box flex={1}>
      <Box paddingLeft={24} paddingRight={32}>
        <Title
          str={BEST_IN_MONTH}
          showViewMoreButton
          navigateHandler={viewAllNavigationHandler}
          svgIcon={
            <ICON_TOP_TABBAR_TEXT_ACTIVE_SVG
              width={16}
              height={16}
              style={{ marginRight: 8, marginTop: 3 }}
            />
          }
        />
      </Box>
      <TextSlider data={data} isLoading={false} navigation={navigation} />
    </Box>
  );
}
