import { Title } from '../../../../components/title';
import { Box } from '../../../../components/box';
import { Text } from '../../../../types/text';
import { UseNavigationType } from '../../../../types/use-navigation';
import ViewAllTextsList from '../../../view-all/components/texts-list';
import { ViewAllPageEnum } from '../../../view-all';
import { VIEW_ALL } from '../../types';

type Props = {
  data: Text[];
  navigation: UseNavigationType;
};

export function SoundsPageRecently({ data, navigation }: Props) {
  const viewAllNavigationHandler = () => {
    navigation.navigate(VIEW_ALL, {
      pageDirection: ViewAllPageEnum.RECENTLY_TEXTS,
    });
  };

  return (
    <Box marginTop={40} flex={1}>
      <Box paddingLeft={24} marginBottom={24} marginRight={32}>
        <Title str="Rencntly" showViewMoreButton navigateHandler={viewAllNavigationHandler} />
      </Box>
      <Box>
        <ViewAllTextsList marginTop={5} data={data} navigate={navigation.navigate} />
      </Box>
    </Box>
  );
}
