import { Title } from '../../../../components/title';
import { PaddingContainer } from '../../../../styles/grid';
import { Box } from '../../../../components/box';
import { RenderIf } from '../../../../components/render-if';
import { IfNoItem } from '../../../../components/if-no-item';
import { Sound } from '../../../../types/sound';
import ViewAllSoundList from '../../../view-all/components/sound-list';
import { ViewAllPageEnum } from '../../../view-all';
import { VIEW_ALL } from '../../types';

type Props = {
  isLoading: boolean;
  data: Sound[];
  navigate: (...args: any) => void;
};

export function SoundsPageRecently({ isLoading, data, navigate }: Props) {
  const viewAllNavigationHandler = () => {
    navigate(VIEW_ALL, {
      pageDirection: ViewAllPageEnum.RECENTLY_SOUNDS,
    });
  };
  return (
    <>
      <PaddingContainer>
        <Box marginBottom={24} paddingRight={8} marginTop={34}>
          <Title str="Recently" showViewMoreButton navigateHandler={viewAllNavigationHandler} />
        </Box>
      </PaddingContainer>
      <Box>
        <RenderIf condition={isLoading}>
          <IfNoItem dataLength={data.length}>
            <ViewAllSoundList
              onEndReached={() => {
                //
              }}
              marginTop={-4}
              data={data}
              navigate={navigate}
            />
          </IfNoItem>
        </RenderIf>
      </Box>
    </>
  );
}
