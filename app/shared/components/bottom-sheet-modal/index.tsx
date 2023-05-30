import { useState, forwardRef, useImperativeHandle, useRef, useContext, useEffect, ReactNode } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Image } from 'react-native';
import { CONFIRM_MODAL_BACKGROUND } from '../../../constaints/images';
import { alertContext } from '../../../context/alert';
import { Box } from '../../../shared/components/box';

type Props = {
    children: ReactNode,
    height: number,
    snapPoints: string[]
}

export const ModalBottomSheet = forwardRef(({ children, height, snapPoints }: Props, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        return () => {
            closeModalHandler();
        }
    }, []);

    const alertCtx: any = useContext(alertContext);

    const confirmAlertSheetRef = useRef<BottomSheet>(null);

    const closeModalHandler = () => {
        confirmAlertSheetRef.current?.close();
        setIsModalOpen(false);
        alertCtx.close();
    };

    const openModalHandler = () => {
        confirmAlertSheetRef.current?.expand();
        setIsModalOpen(true);
    }

    useImperativeHandle(ref, () => ({
        open() {
            openModalHandler()
        },
        expand() {
            openModalHandler()
        },
        close() {
            closeModalHandler();
        }
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
                            backgroundColor: 'rgba(78, 78, 97, 0.75)',
                        }}
                    >
                        <BottomSheetView
                            style={{
                                position: 'absolute',
                                backgroundColor: 'rgba(78, 78, 97, 0.75)',
                                top: 0,
                                left: 0,
                                width: '100%',
                                zIndex: 1000,
                            }}
                        >
                            <Image
                                source={{
                                    uri: CONFIRM_MODAL_BACKGROUND
                                }}
                                style={{
                                    width: '100%',
                                    height: height,
                                    position: 'absolute',
                                    borderTopLeftRadius: 16,
                                    borderTopRightRadius: 16,
                                    top: 0,
                                }}
                            />
                            <Box
                                id="body"
                                width="100%"
                                height={height}
                                borderTopLeftRadius={16}
                                borderTopRightRadius={16}
                                paddingTop={32}
                            >
                                {children}
                            </Box>
                        </BottomSheetView>
                    </BottomSheet>
                </>
            ) : null}
        </>
    );
});
