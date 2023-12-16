import { HorizontalSlider } from '../../../../components/horizontal-slider';
import { IfNoItem } from '../../../../components/if-no-item';
import { RenderIf } from '../../../../components/render-if';
import { Title } from '../../../../components/title';
import { Sound } from '../../../../types/sound';
import { Box } from '../../../../components/box';
import { BEST_IN_MONTH } from '../../../../constaints/consts';
import { ICON_TOP_TABBAR_SOUND_ACTIVE_SVG } from '../../../../constaints/icons';
import { ViewAllPageEnum } from '../../../view-all';
import { UseNavigationType } from '../../../../types/use-navigation';
import { VIEW_ALL } from '../../types';

type Props = {
  isLoading: boolean;
  data: Sound[];
  navigation: UseNavigationType;
};

export function SoundsPageBestInMonth({ navigation, isLoading, data }: Props) {
  const viewAllNavigationHandler = () => {
    navigation.navigate(VIEW_ALL, {
      pageDirection: ViewAllPageEnum.BEST_SONGS,
    });
  };

  return (
    <>
      <Box paddingLeft={24} marginBottom={24}>
        <Title
          str={BEST_IN_MONTH}
          navigateHandler={viewAllNavigationHandler}
          showViewMoreButton
          svgIcon={
            <ICON_TOP_TABBAR_SOUND_ACTIVE_SVG
              width={16}
              height={14.39}
              style={{ marginRight: 8, marginTop: 3 }}
            />
          }
        />
      </Box>
      <Box>
        <RenderIf condition={isLoading}>
          <IfNoItem dataLength={data.length}>
            <HorizontalSlider data={data} navigationScreenName="SingleImageScreen" />
          </IfNoItem>
        </RenderIf>
      </Box>
    </>
  );
}
