import { useRef, useState } from 'react';
import { FlatList, Image, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet from '@gorhom/bottom-sheet';
import { SettingsScreenComponents } from '../../style';
import { windowSize } from '../../../../utils/window-size';
import { Box } from '../../../../shared/components/box';
import { PaddingContainer } from '../../../../styles/grid';
import { SettingsScreenTitle } from '../../components/title';
import { Text } from '../../../../shared/components/text';
import { theme } from '../../../../constaints/theme';
import { ScreenGradient } from '../../../../shared/components/screen-gradient';
import { AddAccountModal } from './add-account-modal';
import {
    ICON_ADD,
    ICON_INSTAGRAM_PRIMARY,
    ICON_TRASHBEEN
} from '../../../../constaints/icons';
import {
    ADD_ACCOUNT_BUTTON_GRADIENT,
    SIGNINS_LIST_ITEM_GRADIET
} from '../../../../constaints/images';
import { ConfirmAlert } from '../../../../shared/components/confirm-alert';

type AccountType = {
    id: number;
    appIcon: any;
    username: string;
};

const { AddAccountButton } = SettingsScreenComponents;
const { height } = windowSize();

const accounts: AccountType[] = [
    {
        id: 1,
        appIcon: ICON_INSTAGRAM_PRIMARY,
        username: 'Ma.Nakhli'
    },
    {
        id: 2,
        appIcon: ICON_INSTAGRAM_PRIMARY,
        username: 'Mahdi_alipoor'
    }
];

const pageHeaderComponent = (
    <Box marginBottom={48}>
        <PaddingContainer>
            <SettingsScreenTitle title="Share account" />
        </PaddingContainer>
    </Box>
);

const keyExtractor = (item: AccountType): string => item.id.toString();

export function ShareEccountPage() {
    const [isOpen, setIsOpen] = useState(false);

    const sheetRef = useRef<BottomSheet>(null);
    const confirmAlertRef = useRef(null);

    const snapPoints = ['42'];

    const openModalHandler = () => {
        setIsOpen(true);
        sheetRef.current?.expand();
    };

    const closeModalHandler = () => {
        sheetRef.current?.close();
        setIsOpen(false);
    };

    const renderAccountItem = ({ item }: { item: AccountType }) => {
        return (
            <PaddingContainer>
                <Box
                    width="100%"
                    height={57}
                    marginBottom={8}
                    direction="row"
                    alignItems="center"
                >
                    <Image
                        source={{ uri: SIGNINS_LIST_ITEM_GRADIET }}
                        style={{
                            width: '100%',
                            height: 56,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            borderRadius: 16
                        }}
                    />
                    <Box
                        width="100%"
                        height={56}
                        paddingLeft={16}
                        paddingRight={16}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Box direction="row" alignItems="center">
                            <item.appIcon
                                style={{
                                    width: 18,
                                    height: 18
                                }}
                            />
                            <Text
                                color="#fff"
                                marginLeft={16}
                                fontSize={14}
                                fontWeight={theme.numericLineHeight.md}
                            >
                                {item.username}
                            </Text>
                        </Box>
                        <Box>
                            <TouchableOpacity
                                onPress={() => confirmAlertRef.current?.open()}
                            >
                                <ICON_TRASHBEEN
                                    style={{
                                        width: 16.22,
                                        height: 18
                                    }}
                                />
                            </TouchableOpacity>
                        </Box>
                    </Box>
                </Box>
            </PaddingContainer>
        );
    };

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <ScreenGradient>
                    <Box width="100%">
                        <FlatList
                            ListHeaderComponent={pageHeaderComponent}
                            data={accounts}
                            renderItem={renderAccountItem}
                            keyExtractor={keyExtractor}
                        />
                    </Box>
                    <View
                        style={{
                            width: '100%',
                            height: 104,
                            position: 'absolute',
                            top: Math.floor(height) - 104
                        }}
                    >
                        <Box
                            width="100%"
                            height={104}
                            backgroundColor="transparent"
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Image
                                source={{ uri: ADD_ACCOUNT_BUTTON_GRADIENT }}
                                style={{
                                    width: '100%',
                                    height: 104,
                                    position: 'absolute',
                                    top: 0
                                }}
                            />
                            <Box
                                width="100%"
                                paddingRight={24}
                                paddingLeft={24}
                            >
                                <AddAccountButton
                                    activeOpacity={1}
                                    onPress={openModalHandler}
                                >
                                    <Text
                                        color="#83839C"
                                        fontSize={14}
                                        fontWeight={600}
                                        marginRight={10}
                                        paddingBottom={2}
                                    >
                                        Add Account
                                    </Text>
                                    <ICON_ADD
                                        style={{
                                            width: 16,
                                            height: 16
                                        }}
                                    />
                                </AddAccountButton>
                            </Box>
                        </Box>
                    </View>
                </ScreenGradient>
            </SafeAreaView>

            <ConfirmAlert ref={confirmAlertRef} />
            {isOpen ? (
                <AddAccountModal
                    sheetRef={sheetRef}
                    windowHeight={Math.floor(height)}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    snapPoints={snapPoints}
                    closeModalHandler={closeModalHandler}
                />
            ) : null}
        </>
    );
}
