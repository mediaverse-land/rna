import { TouchableOpacity } from 'react-native';
import { Box } from '../../../components/box';
import { Text } from '../../../components/text';
import { ICON_IMAGE_WHITE } from '../../../constaints/icons';
import { PaddingContainer } from '../../../styles/grid';
import { GoBackButton } from '../components/goback-button';
import { theme } from '../../../constaints/theme';
import { AssetThumbnail } from '../../../components/asset-thumbnail';
import { RenderIfWithoutLoading } from '../../../components/render-if-without-loading';
import { Toolbar } from '../components/toolbar';

type Props = {
  goBackHandler: () => void;
  thumnailImageUri: string;
  contentName: string;
  isOwner?: boolean;
  isSubscriber?: boolean;
  showLargeImagePressHandler: () => void;
  openReportModalHandler: () => void;
  toolbarOptions: any;
  hasPermission: boolean;
};

export function SingleImageHeader({
  goBackHandler,
  thumnailImageUri,
  contentName,
  isOwner,
  showLargeImagePressHandler,
  openReportModalHandler,
  toolbarOptions,
  hasPermission,
}: Props) {
  return (
    <>
      <TouchableOpacity activeOpacity={1}>
        <Box position="relative" zIndex={20}>
          <Box>
            {/* GoBack button place */}
            <GoBackButton goBackHandler={goBackHandler} hasBackground={true} isOwner={isOwner} />
            <TouchableOpacity onPress={showLargeImagePressHandler} activeOpacity={1}>
              <AssetThumbnail assetType="image" thumnailImageUri={thumnailImageUri} />
            </TouchableOpacity>
            <Box position="absolute" zIndex={11} bottom={24} left={24}>
              <ICON_IMAGE_WHITE
                style={{
                  width: 25.7,
                  height: 20,
                }}
              />
            </Box>
          </Box>
          <Box>
            <RenderIfWithoutLoading condition={hasPermission}>
              <PaddingContainer>
                <Toolbar toolbarList={toolbarOptions} />
              </PaddingContainer>
            </RenderIfWithoutLoading>
          </Box>
          {/* Title */}
          <PaddingContainer>
            <Box marginTop={32} direction="row" alignItems="center">
              <Box flex={1} paddingRight={10}>
                <Text
                  color={theme.color.light.WHITE}
                  fontSize={20}
                  lineHeight={20}
                  fontWeight={600}
                >
                  {contentName}
                </Text>
              </Box>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  openReportModalHandler();
                }}
              >
                <Box
                  alignItems="center"
                  justifyContent="center"
                  width={50}
                  position="relative"
                  zIndex={1040}
                >
                  <Text color={'#666680'} fontSize={14} fontWeight={400}>
                    Report
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
          </PaddingContainer>
        </Box>
      </TouchableOpacity>
    </>
  );
}
