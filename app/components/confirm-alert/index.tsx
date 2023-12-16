/* eslint-disable react/display-name */
import { useState, forwardRef, useImperativeHandle, useRef, useContext, useEffect } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Image } from 'react-native';
import { Box } from '../box';
import { CONFIRM_MODAL_BACKGROUND } from '../../constaints/images';
import { Text } from '../text';
import { ConfirmModalComponents } from './style';
import { theme } from '../../constaints/theme';
import { alertContext } from '../../context/alert';

const { Button } = ConfirmModalComponents;

export const ConfirmAlert = forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    return () => {
      closeModalHandler();
    };
  }, []);

  const alertCtx: any = useContext(alertContext);

  const confirmAlertSheetRef = useRef<BottomSheet>(null);

  const snapPoints = ['26'];

  const closeModalHandler = () => {
    confirmAlertSheetRef.current?.close();
    setIsModalOpen(false);
    alertCtx.close();
  };

  useImperativeHandle(ref, () => ({
    open() {
      confirmAlertSheetRef.current?.expand();
      setIsModalOpen(true);
    },
    close() {
      closeModalHandler();
    },
  }));

  return (
    <>
      {isModalOpen ? (
        <>
          <BottomSheet
            snapPoints={snapPoints}
            ref={confirmAlertSheetRef}
            onClose={() => setIsModalOpen(false)}
            handleComponent={null}
            backgroundStyle={{
              backgroundColor: 'transparent',
            }}
            style={{}}
          >
            <BottomSheetView
              style={{
                position: 'absolute',
                backgroundColor: 'transparent',
                top: 0,
                left: 0,
                width: '100%',
                height: 260,
                zIndex: 100000000000,
              }}
            >
              <Image
                source={{
                  uri: CONFIRM_MODAL_BACKGROUND,
                }}
                style={{
                  width: '100%',
                  height: 260,
                  position: 'absolute',
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  top: 0,
                }}
              />
              <Box
                id="body"
                width="100%"
                height={260}
                borderTopLeftRadius={16}
                borderTopRightRadius={16}
                paddingTop={32}
                paddingLeft={24}
                paddingRight={24}
              >
                <Text
                  color={theme.color.light.CARD_TITLE_TEXT}
                  fontSize={theme.numericFontSize.md}
                  lineHeight={theme.numericLineHeight.md}
                  fontWeight={400}
                >
                  Are you sure?
                </Text>
                <Box>
                  <Box marginTop={24}>
                    <Button>
                      <Text fontSize={14} lineHeight={20} color={theme.color.light.WHITE}>
                        Yes
                      </Text>
                    </Button>
                  </Box>
                  <Box marginTop={16}>
                    <Button onPress={closeModalHandler}>
                      <Text fontSize={14} lineHeight={20} color={theme.color.light.WHITE}>
                        No
                      </Text>
                    </Button>
                  </Box>
                </Box>
              </Box>
            </BottomSheetView>
          </BottomSheet>
        </>
      ) : null}
    </>
  );
});
