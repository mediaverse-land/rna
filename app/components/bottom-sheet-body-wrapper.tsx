import { BlurView } from 'expo-blur';
import { FC, ReactNode } from 'react';
import { View } from 'react-native';
import { Box } from './box';
import { isIos } from '../controllers/platform.controller';

const IS_IOS = isIos();

type Props = {
  children: ReactNode;
  minHeight?: number;
  paddingRight?: number,
  paddingLeft?:number
};

export const BottomSheetBodyWrapper: FC<Props> = ({ children, minHeight = 300, paddingLeft = 32, paddingRight =32 }) => {
  return (
    <View
      style={{
        overflow: 'hidden',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}
    >
      <BlurView
        style={{
          width: '100%',
          backgroundColor: IS_IOS ? '#3d3d5aa3': 'transparent',
          minHeight
        }}
        intensity={IS_IOS ? 50 : 0}
      >
        <Box flex={1} paddingTop={32} paddingBottom={32} paddingLeft={paddingLeft} paddingRight={paddingRight}>
          {children}
        </Box>
      </BlurView>
    </View>
  );
};
