import { FC } from "react";
import { Title } from "../../../../components/title";
import { HorizontalSlider } from "../../../../components/horizontal-slider";
import { Asset } from "../../../../types/asset";
import { Box } from "../../../../components/box";
import { RenderIf } from "../../../../components/render-if";
import { IfNoItem } from "../../../../components/if-no-item";
import { ViewAllPageEnum } from "../../../view-all";
import { VIEW_ALL } from "../../types";

type Props = {
  isLoading: boolean;
  data: Asset[];
  navigate: (...args: any) => void;
};

export const ImagePageBestInMonth: FC<Props> = ({
  isLoading,
  data,
  navigate,
}) => {
  const viewAllNavigationHandler = () => {
    navigate(VIEW_ALL, {
      pageDirection: ViewAllPageEnum.BEST_IN_MONTH_IMAGES,
    });
  };

  return (
    <Box width="100%" flex={1}>
      <Box paddingLeft={24} paddingRight={32} marginBottom={24}>
        <Title
          str="Best in month"
          showViewMoreButton
          navigateHandler={viewAllNavigationHandler}
        />
      </Box>
      <RenderIf condition={isLoading}>
        <IfNoItem dataLength={data.length}>
          <HorizontalSlider
            data={data}
            navigationScreenName="SingleImageScreen"
          />
        </IfNoItem>
      </RenderIf>
    </Box>
  );
};
