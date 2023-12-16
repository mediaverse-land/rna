import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Box } from '../../../components/box';
import { ICON_X_WHITE } from '../../../constaints/icons';
import { windowSize } from '../../../utils/window-size';
import { getTextFileApiHandler } from '../service';
import { PaddingContainer } from '../../../styles/grid';
import { Text } from '../../../components/text';
import { FullScreenSpinnerLoader } from '../../../components/loader-spinner';
import { VirtualizedList } from '../../../components/virtualized-list';
import { theme } from '../../../constaints/theme';

type Props = {
  hideTextModalHandler: () => void;
  // Url to fetch the file
  fileUrl: string;
  title: string;
};

const { height: windowHeight } = windowSize();

export const AssetModal = ({ hideTextModalHandler, fileUrl, title }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const [contentData, setContentData] = useState<string>(null);

  if (!fileUrl) {
    return null;
  }

  useEffect(() => {
    getFileData();

    return () => {
      setContentData(null);
    };
  }, []);

  const getFileData = async () => {
    setIsLoading(true);
    const { isError, res } = await getTextFileApiHandler(fileUrl);

    if (isError) {
      setIsLoading(false);
      return;
    }
    if (res) {
      setContentData(res.data);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Box
        width={76}
        height={40}
        position="absolute"
        top={20}
        left={24}
        zIndex={110}
        borderRadius={16}
        backgroundColor="#000000e6"
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: 76,
            height: 40,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={hideTextModalHandler}
        >
          <ICON_X_WHITE />
        </TouchableOpacity>
      </Box>
      <View
        style={{
          width: '100%',
          height: windowHeight,
          backgroundColor: '#030340',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          margin: 0,
          zIndex: 100,
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isLoading ? (
          <FullScreenSpinnerLoader />
        ) : (
          <PaddingContainer>
            <VirtualizedList>
              <Box paddingTop={70}>
                <Text
                  color={theme.color.light.WHITE}
                  fontSize={20}
                  lineHeight={20}
                  fontWeight={600}
                  marginTop={24}
                  paddingBottom={16}
                >
                  {title}
                </Text>
                {contentData ? (
                  <Text color="#A2A2B5" lineHeight={18} fontSize={16}>
                    {contentData}
                  </Text>
                ) : null}
              </Box>
            </VirtualizedList>
          </PaddingContainer>
        )}
      </View>
    </>
  );
};
