import { LinearGradient } from 'expo-linear-gradient';
import { Image, TextInput } from 'react-native';
import { Box } from '../../../components/box';
import { Text } from '../../../components/text';
import { theme } from '../../../constaints/theme';
import { PROFILE_IMAGE } from '../../../constaints/images';
import { FC, useMemo } from 'react';

type Props = {
  hasBackground?: boolean;
  editable?: boolean;
  assetId: number
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CommentsBox: FC<Props> = ({ hasBackground = true, editable = true , assetId}) => {

  const gradientProps = useMemo(() => {
    return {
      style: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        opacity: 0.5,
        flex: 1,
        padding: 1,
      },
      colors: hasBackground ? ['#a2a2b591', '#ffffff27'] : ['transparent', 'transparent'],
      start: {
        x: 0.1,
        y: 0.2,
      },
    };
  }, [hasBackground]);

  const innerGradientProps = useMemo(() => {
    return {
      style: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        flex: 1,
        padding: 16,
      },
      colors: hasBackground ? ['#19194a', '#19194a'] : ['transparent', 'transparent'],
      start: {
        x: 0.1,
        y: 0.2,
      },
    };
  }, [hasBackground]);

  return (
    <Box width="100%" height={102}>
      <LinearGradient {...gradientProps}>
        <LinearGradient {...innerGradientProps}>
          <Box
            id="title"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Text color={theme.color.light.WHITE} fontSize={14} fontWeight={600}>
              Comments
            </Text>
            <Text color={theme.color.light.TEXT} fontSize={14} fontWeight={400}>
              56
            </Text>
          </Box>
          <Box
            id="body"
            marginTop={16}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Image
                source={{ uri: PROFILE_IMAGE }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 100,
                  marginRight: 16,
                }}
              />
            </Box>
            <Box flex={1}>
              <TextInput
                style={{
                  width: '100%',
                  height: 40,
                  backgroundColor: 'rgba(28, 28, 35, 0.75)',
                  borderRadius: 8,
                  paddingLeft: 16,
                  color: '#fff',
                }}
                placeholder="Add a comment..."
                editable={editable}
                placeholderTextColor={theme.color.light.TEXT}
              />
            </Box>
          </Box>
        </LinearGradient>
      </LinearGradient>
    </Box>
  );
};
