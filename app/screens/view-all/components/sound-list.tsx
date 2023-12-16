import React, { useCallback } from 'react';
import { Text } from '../../../components/text';
import { FlashList } from '@shopify/flash-list';
import { Box } from '../../../components/box';
import { windowSize } from '../../../utils/window-size';
import { Image, TouchableOpacity } from 'react-native';
import { theme } from '../../../constaints/theme';
import { UserNameCard } from '../../../components/username-card';
import { HORIZONTAL_SLIDER_GRADIENT, PROFILE_ONE } from '../../../constaints/images';
import { navigateTo } from '../utils/navigate-to-single-screen';
import { Sound } from '../../../types/sound';

type Props = {
  data: Sound[];
  navigate: (...args: any) => void;
  marginTop?: number;
  onEndReached: () => void;
};

const { width: WINDOW_WIDTH } = windowSize();

const itemWidth = Math.floor(WINDOW_WIDTH) / 2 - 32;

const theme_text_color = theme.color.light.TEXT;
const title_text_size = 16;
const username_text_size = 12;

const ViewAllSoundList = ({ data, navigate, marginTop, onEndReached }: Props) => {
  const _renderItem = useCallback(({ item }: { item: Sound }) => {
    return (
      <TouchableOpacity
        onPress={() => navigateTo.singleSound({ navigate, id: item.id })}
        activeOpacity={1}
      >
        <Box width={itemWidth} height={217} marginBottom={34} position="relative">
          <Box id="thumbnail">
            <Image
              source={{
                uri: item.asset.thumbnails['336x366'],
              }}
              style={{
                width: '100%',
                height: 163,
                borderRadius: 16,
              }}
            />
          </Box>
          <Box id="tite" marginTop={16} paddingLeft={8} paddingRight={8}>
            <Text color={theme_text_color} lineHeight={title_text_size} fontSize={title_text_size}>
              {item.name}
            </Text>
          </Box>
          <Box id="username" marginTop={8} paddingLeft={8} paddingRight={8}>
            <UserNameCard
              username={item.asset.user.username}
              profileUri={PROFILE_ONE}
              profileImageStyles={{
                width: 16,
                height: 16,
              }}
              usernameStyles={{
                color: theme_text_color,
                marginLeft: 8,
                fontSize: username_text_size,
                lineHeight: username_text_size,
              }}
            />
          </Box>
          <Image
            source={{
              uri: HORIZONTAL_SLIDER_GRADIENT,
            }}
            style={{
              width: '101%',
              height: 163,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            resizeMode="stretch"
          />
        </Box>
      </TouchableOpacity>
    );
  }, []);

  const keyExtractor = (item: Sound) => item.id.toString();

  return (
    <Box marginTop={marginTop ? marginTop : 56} paddingLeft={24} paddingRight={10}>
      <FlashList
        data={data}
        numColumns={2}
        renderItem={_renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={15}
        onEndReached={onEndReached}
        onEndReachedThreshold={10}
      />
    </Box>
  );
};

export default ViewAllSoundList;
