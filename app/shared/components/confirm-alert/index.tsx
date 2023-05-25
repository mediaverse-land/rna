import { useState, forwardRef, useImperativeHandle, useRef } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Image } from 'react-native';
import { Box } from '../box';
import { CONFIRM_MODAL_BACKGROUND } from '../../../constaints/images';
import { Text } from '../text';
import { ConfirmModalComponents } from './style';
import { theme } from '../../../constaints/theme';

const { Button } = ConfirmModalComponents

export const ConfirmAlert = forwardRef((props, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const confirmAlertSheetRef = useRef<BottomSheet>(null);

    const snapPoints = ['26']

    const closeModalHandler = () => {
        confirmAlertSheetRef.current?.close();
        setIsModalOpen(false)
    }

    useImperativeHandle(ref, () => ({
        open() {
            confirmAlertSheetRef.current?.expand();
            setIsModalOpen(true);
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
                            backgroundColor: 'transparent',
                        }}
                    >
                        <BottomSheetView
                            style={{
                                position: 'absolute',
                                backgroundColor: 'transparent',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: 260,

                            }}
                        >
                            <Image
                                source={{
                                    uri: CONFIRM_MODAL_BACKGROUND
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
                                width='100%'
                                height={260}
                                borderTopLeftRadius={16}
                                borderTopRightRadius={16}
                                paddingTop={32}
                                paddingLeft={24}
                                paddingRight={24}
                            >
                                <Text
                                    color="#D9D9FF"
                                    fontSize={theme.numericFontSize.md}
                                    lineHeight={theme.numericLineHeight.md}
                                    fontWeight={400}
                                >Are you sure?</Text>
                                <Box>
                                    <Box marginTop={24}>
                                        <Button>
                                            <Text fontSize={14} lineHeight={20} color="#fff">Yes</Text>
                                        </Button>
                                    </Box>
                                    <Box marginTop={16}>
                                        <Button onPress={closeModalHandler}>
                                            <Text fontSize={14} lineHeight={20} color="#fff">No</Text>
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </BottomSheetView>
                    </BottomSheet>
                </>
            ) : null}
        </>
    )
});


// export const ConfirmAlert = forwardRef({
//     openModal
// }: Props)  =>{
//     const [isModalOpen, setIsModalOpen] = useState(false)

//     const confirmAlertSheetRef = useRef<BottomSheet>(null)

//     const closeModalHandler = () => {
//         confirmAlertSheetRef.current?.close();
//         setIsModalOpen(false)
//     }

//     useEffect(() => {
//         console.log('openModal')
//     }, [openModal])
//     // const openModalHandler = () => {

//     // }

//     return (
//         <>
//             {/* {isModalOpen ? (
//                 <TouchableOpacity
//                     style={{
//                         width: '100%',
//                         height: windowHeight,
//                         position: 'absolute',
//                         top: 0,
//                         left: 0
//                     }}
//                     onPress={closeModalHandler}
//                 ></TouchableOpacity>
//             ) : null}
//             <BottomSheet
//                 snapPoints={snapPoints}
//                 ref={sheetRef}
//                 onClose={() => setIsModalOpen(false)}
//                 handleComponent={null}
//                 backgroundStyle={{
//                     backgroundColor: 'transparent'
//                 }}
//             >
//                 <BottomSheetView
//                     style={{
//                         position: 'absolute',
//                         backgroundColor: 'rgba(78, 78, 97, 0.75)',
//                         top: 0,
//                         left: 0,
//                         width: '100%',
//                         height: 420,
//                         borderTopLeftRadius: 16,
//                         borderTopRightRadius: 16,
//                         padding: 24
//                     }}
//                 >
//                     <Box marginTop={24}>
//                     </Box>
//                 </BottomSheetView>
//             </BottomSheet> */}
//         </>
//     );
// }
