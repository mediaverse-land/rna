import { FC } from 'react';
import { Title } from '../../../../components/title';
import { Box } from '../../../../components/box';
import { ICON_TOP_TABBAR_TEXT_ACTIVE_SVG } from '../../../../constaints/icons';
import { UseNavigationType } from '../../../../types/use-navigation';
import { TextSlider } from '../../../../components/text-slider';
import { TOP_TEN_TEXTS } from '../../../../constaints/consts';
import type { Text as TextType } from '../../../../types/text';
import { RenderIf } from '../../../../components/render-if';
import { Text } from '../../../../components/text';
import { ViewAllPageEnum } from '../../../view-all';
import { VIEW_ALL } from '../../types';

type Props = {
  isLoading: boolean;
  data: TextType[];
  disableOnIntractions?: boolean;
  navigation: UseNavigationType;
};

export const AllPageTopTenText: FC<Props> = ({
  isLoading,
  data,
  disableOnIntractions = false,
  navigation,
}) => {
  const viewAllNavigationHandler = () => {
    navigation.navigate(VIEW_ALL, {
      pageDirection: ViewAllPageEnum.TOP_TEXTS,
    });
  };

  return (
    <Box id="top-ten-text-slider-wrapper" marginTop={35} flex={1}>
      <Box paddingRight={32} paddingLeft={24}>
        <Title
          str={TOP_TEN_TEXTS}
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
