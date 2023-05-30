import { ScrollView, TouchableOpacity } from 'react-native';
import { ScreenGradient } from '../../shared/components/screen-gradient';
import { InventoryBox } from './components/inventory-box';
import { CardSlider } from './components/card-slider';
import { Box } from '../../shared/components/box';
import { AddButton } from './components/add-button';
import { PaddingContainer } from '../../styles/grid';
import { useContext, useRef } from 'react';
import { ConfirmAlert } from '../../shared/components/confirm-alert';
import { alertContext } from '../../context/alert';
import { ModalBottomSheet } from '../../shared/components/bottom-sheet-modal';
import { AddInventory } from './components/add-inventory';
import { AddCard } from './components/add-card';
import { windowSize } from '../../utils/window-size';

const { width: windowWidth } = windowSize();

export function WalletSlider() {
    const confirmAlertRef = useRef(null);
    const addInventoryAlertRef = useRef(null);
    const addCardAlertRef = useRef(null);

    const alertCtx = useContext(alertContext);
    const isOpen: any = alertCtx.isOpen();

    const openConfirmAlertHandler = () => {
        confirmAlertRef.current?.open();
        alertCtx.open();
    };

    const openAddCardAlertHandler = () => {
        addCardAlertRef.current?.open();
        alertCtx.open();
    };

    const closeAddCardAlertHandler = () => {
        addCardAlertRef.current?.close();
        alertCtx.close();
    };

    const closeConfirmAlertHandler = () => {
        confirmAlertRef.current?.close();
        alertCtx.close();
    };

    const openAddInventoryAlertHandler = () => {
        addInventoryAlertRef.current?.expand();
        alertCtx.open();
    };

    const closeAddInventoryAlertHandler = () => {
        addInventoryAlertRef.current?.close();
        alertCtx.close();
    };

    console.log(Math.floor(windowWidth));

    return (
        <>
            <ScreenGradient>
                <ScrollView style={{ flex: 1, width: '100%' }}>
                    <Box>
                        <InventoryBox />
                        <CardSlider />
                        <Box
                            direction="row"
                            width={'100%'}
                            marginTop={40}
                            justifyContent="center"
                        >
                            <Box width={230}>
                                <AddButton
                                    onpress={openAddCardAlertHandler}
                                    text="Add account"
                                />
                            </Box>
                        </Box>
                        <PaddingContainer>
                            <Box
                                direction="row"
                                width={'100%'}
                                marginTop={40}
                                justifyContent="center"
                                paddingBottom={146}
                            >
                                <Box width={'100%'}>
                                    <AddButton
                                        onpress={openAddInventoryAlertHandler}
                                        text="Add inventory"
                                    />
                                </Box>
                            </Box>
                        </PaddingContainer>
                    </Box>
                </ScrollView>
            </ScreenGradient>

            <ModalBottomSheet
                ref={addInventoryAlertRef}
                height={windowWidth < 350 ? 400 : 300}
                snapPoints={windowWidth < 350 ? ['40'] : ['30']}
            >
                <Box width={'100%'} flex={1} position="absolute" zIndex={100}>
                    <AddInventory />
                </Box>
            </ModalBottomSheet>
            <ModalBottomSheet
                ref={addCardAlertRef}
                height={windowWidth < 350 ? 500 : 400}
                snapPoints={windowWidth < 350 ? ['50'] : ['40']}
            >
                <Box width={'100%'} flex={1} position="absolute" zIndex={100}>
                    <AddCard />
                </Box>
            </ModalBottomSheet>
            <ConfirmAlert ref={confirmAlertRef} />
            {isOpen ? (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        closeAddInventoryAlertHandler();
                        closeConfirmAlertHandler();
                        closeAddCardAlertHandler();
                    }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        width: '100%',
                        height: '60%',
                        flex: 1,
                        backgroundColor: 'transparent'
                    }}
                ></TouchableOpacity>
            ) : null}
        </>
    );
}
