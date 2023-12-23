import { BlurView } from 'expo-blur';
import { Box } from '../../../components/box';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { closeToolbarHandler } from '../../../slices/single-asset.slice';
import { Text } from '../../../components/text';
import { theme } from '../../../constaints/theme';
import { isIos } from '../../../controllers/platform.controller';
import { FC, useEffect, useState } from 'react';

const isIOS = isIos();

export type ToolbarOptions = {
  id: number;
  title: string;
  function: () => void;
  shouldCloseModalAfterClick?: boolean;
}[];

type Props = {
  toolbarOptions: ToolbarOptions;
};

export const ToolbarWindow: FC<Props> = ({ toolbarOptions }) => {
  const { isToolbarOpen } = useSelector((state: RootState) => state.singleAssetSlice);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setIsLoading(false);
  }, [isToolbarOpen]);

  const modalCloserHandler = () => {
    dispatch(closeToolbarHandler());
  };

  const TOOLBAR_WINDOW_HEIGHT = toolbarOptions.length * 32 + toolbarOptions.length * 8 + 16;

  // If shouldCloseModalAfterClick, the modal will be closed
  // else, a loading will be shown until the main view dispatch the closer function
  // we show loading because we know it`s about an async request
  const toolbarCloser = (shouldCloseModalAfterClick: boolean) => {
    if (shouldCloseModalAfterClick) {
      dispatch(closeToolbarHandler());
      return;
    }
    setIsLoading(true);
  };

  if (!isToolbarOpen) {
    return;
  }

  return (
    <>
      <Box width="100%" height="100%" position="absolute" zIndex={100} top={0} left={0}>
        <TouchableOpacity
          onPress={modalCloserHandler}
          activeOpacity={1}
          style={{
            width: '100%',
            height: '100%',
          }}
        ></TouchableOpacity>
      </Box>
      <Box
        width={170}
        right={24}
        top={130}
        borderRadius={16}
        position="absolute"
        height={TOOLBAR_WINDOW_HEIGHT}
        additionalStyles={{
          overflow: 'hidden',
        }}
        zIndex={200}
        backgroundColor={isIOS ? 'transparent' : '#131349d9'}
      >
        <View>
          <BlurView
            tint="light"
            intensity={25}
            style={{
              width: '100%',
              height: '100%',
              padding: 16,
            }}
          >
            {isLoading ? (
              <Box width='100%' height='100%' alignItems='center' justifyContent='center'>
                <ActivityIndicator />
              </Box>
            ) : (
              toolbarOptions.map((item: any) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    item.function();
                    toolbarCloser(item.shouldCloseModalAfterClick || false);
                  }}
                >
                  <Box width="100%" height={32} marginBottom={8}>
                    <Text color={theme.color.light.WHITE}>{item.title}</Text>
                  </Box>
                </TouchableOpacity>
              ))
            )}
          </BlurView>
        </View>
      </Box>
    </>
  );
};
