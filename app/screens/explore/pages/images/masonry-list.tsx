import { FC } from "react";
import Masonry from "../../../../components/masonry";
import { Asset } from "../../../../types/asset";
import { PaddingContainer } from "../../../../styles/grid";
import { Box } from "../../../../components/box";
import { RenderIf } from "../../../../components/render-if";
import { IfNoItem } from "../../../../components/if-no-item";
import { Title } from "../../../../components/title";
import { ViewAllPageEnum } from "../../../view-all";
import { VIEW_ALL } from "../../types";

type Props = {
  isLoading: boolean;
  data: Asset[];
  navigate: (...args: any) => void;
};

export const ImagePageMasonryList: FC<Props> = ({
  isLoading,
  data,
  navigate,
}) => {
  const viewAllNavigationHandler = () => {
    navigate(VIEW_ALL, {
      pageDirection: ViewAllPageEnum.RECENTLY_IMAGES,
    });
  };
  return (
    <PaddingContainer>
      <Box width={"100%"} flex={1}>
        <Box marginTop={40}>
          <Title
            str="Recently"
            showViewMoreButton
            navigateHandler={viewAllNavigationHandler}
          />
        </Box>
        <RenderIf condition={isLoading}>
          <IfNoItem dataLength={data.length}>
            <Masonry data={data} />
          </IfNoItem>
        </RenderIf>
      </Box>
    </PaddingContainer>
  );
};
