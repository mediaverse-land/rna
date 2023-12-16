import { FC } from 'react';
import { ImagesPageComponents } from './style';
import { Title } from '../../../../components/title';
import { HorizontalSlider } from '../../../../components/horizontal-slider';
import { Asset } from '../../../../types/asset';
import { RenderIf } from '../../../../components/render-if';
import { IfNoItem } from '../../../../components/if-no-item';
import { CHILL_SONGS } from '../../../../constaints/consts';
import { Box } from '../../../../components/box';
import { ICON_TOP_TABBAR_SOUND_ACTIVE_SVG } from '../../../../constaints/icons';
import { UseNavigationType } from '../../../../types/use-navigation';
import { ViewAllPageEnum } from '../../../view-all';
import { VIEW_ALL } from '../../types';

type Props = {
  isLoading: boolean;
  data: Asset[];
  navigation: UseNavigationType;
};

const { DailyRecomended } = ImagesPageComponents;

export const AllPageChillSongs: FC<Props> = ({ isLoading, data, navigation }) => {
  const viewAllNavigationHandler = () => {
    navigation.navigate(VIEW_ALL, {
      pageDirection: ViewAllPageEnum.BEST_SONGS,
    });
  };

  return (
    <DailyRecomended>
      <Box marginBottom={24} paddingLeft={24} paddingRight={32}>
        <Title
          str={CHILL_SONGS}
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
      <RenderIf condition={isLoading}>
        <IfNoItem dataLength={data.length}>
          <HorizontalSlider data={data} />
        </IfNoItem>
      </RenderIf>
    </DailyRecomended>
  );
};
