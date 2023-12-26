import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from '../../../../components/box';
import { LinearGradient } from 'expo-linear-gradient';
import { FC, ReactNode, useMemo } from 'react';
import { GoBackButton } from '../../components/goback-button';
import { PaddingContainer } from '../../../../styles/grid';
import { Thumbnail } from './thumbnail';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { openToolbarHandler } from '../../../../slices/single-asset.slice';
import { useNavigation } from '@react-navigation/native';
import { UseNavigationType } from '../../../../types/use-navigation';

type Porps = {
  children: ReactNode | any;
};

export const SoundHeader: FC<Porps> = ({ children }) => {
  const { top } = useSafeAreaInsets();

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<UseNavigationType>();

  const { thumnails, isOwner } = useSelector((state: RootState) => state.singleAssetSlice);

  const thumbnailRui = thumnails?.['226x226'];

  const gradientOptions = useMemo<any>(() => {
    return {
      style: {
        width: '100%',
        height: '100%',
        position: 'relative',
        top: -1,
        borderRadius: 8,
        zIndex: 10,
        padding: 1,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingTop: top,
      },
      colors: ['#1c1c54', '#1c1c54'],
      start: {
        x: 0.1,
        y: 0.7,
      },
    };
  }, []);

  const goBackHandler = () => {
    navigation.goBack();
  };
  
  const _openToolbarHandler = () => {
    dispatch(openToolbarHandler());
  };


  return (
    <Box
      width="100%"
      flex={1}
      borderBottomLeftRadius={40}
      borderBottomRightRadius={40}
      backgroundColor="#3c3c6e"
    >
      <LinearGradient {...gradientOptions}>
        <Box position="relative" zIndex={5}>
          <GoBackButton
            goBackHandler={goBackHandler}
            showToolbarMenu={isOwner}
            toolbarClickHandler={_openToolbarHandler}
          />
        </Box>
        <PaddingContainer>
          <Box
            width="100%"
            marginTop={-42}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Thumbnail thumbnailRui={thumbnailRui} />
          </Box>

          {children}
        </PaddingContainer>
      </LinearGradient>
    </Box>
  );
};
