import { Image, TouchableOpacity } from 'react-native';
import { Box } from '../../../../components/box';
import { ScreenGradient } from '../../../../components/screen-gradient';
import { VirtualizedList } from '../../../../components/virtualized-list';
import {
  ICON_CREATE_IMAGE_RESULT_BG,
  ICON_PUBLISH,
  ICON_SAVE,
  ICON_SHARE_WHITE,
} from '../../../../constaints/icons';
import { Spacer } from '../../../../components/spacer';
import { Text } from '../../../../components/text';

const RESULT_OPTIONS = [
  {
    id: 1,
    icon: ICON_SAVE,
    title: 'Save',
  },
  {
    id: 2,
    icon: ICON_SHARE_WHITE,
    title: 'Save & Share',
  },
  {
    id: 3,
    icon: ICON_PUBLISH,
    title: 'Save & Publish',
  },
];

export const Result = ({ imageUri }: { imageUri: string }) => {
  return (
    <Box
      width="100%"
      height="100%"
      position="absolute"
      top={0}
      left={0}
      bottom={0}
      right={0}
      zIndex={10000}
    >
      <ScreenGradient>
        <VirtualizedList>
          <Box width="100%" paddingLeft={44} paddingRight={44} flex={1} paddingTop={100}>
            <Box marginTop={24}>
              <Image
                source={{ uri: `data:image/jpg;base64,${imageUri}` }}
                style={{
                  width: '100%',
                  flex: 1,
                  borderRadius: 16,
                  aspectRatio: 0.5,
                }}
              />
            </Box>
            <Box width="100%" alignItems="center" justifyContent="center">
              <Box
                width="70%"
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
                marginTop={40}
              >
                {RESULT_OPTIONS.reverse().map((r) => (
                  <TouchableOpacity activeOpacity={1} key={r.id}>
                    <Box width={55}>
                      <Box marginBottom={10} alignItems="center" justifyContent="center">
                        <ICON_CREATE_IMAGE_RESULT_BG />
                        <r.icon
                          style={{
                            position: 'absolute',
                            top: 14,
                            left: 17.5,
                          }}
                        />
                      </Box>
                      <Text
                        textStyles={{
                          textAlign: 'center',
                        }}
                        color="#fff"
                        fontSize={16}
                        lineHeight={16}
                      >
                        {r.title}
                      </Text>
                    </Box>
                  </TouchableOpacity>
                ))}
              </Box>
            </Box>
            <Spacer />
          </Box>
        </VirtualizedList>
      </ScreenGradient>
    </Box>
  );
};
