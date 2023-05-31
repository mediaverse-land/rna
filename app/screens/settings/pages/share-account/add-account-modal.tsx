import { StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Box } from '../../../../shared/components/box';
import { Text } from '../../../../shared/components/text';
import { theme } from '../../../../constaints/theme';
import { Input } from '../../../../shared/components/form';

type Props = {
    windowHeight: number;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    snapPoints: string[];
    sheetRef: BottomSheet | any;
    closeModalHandler: () => void;
};

export function AddAccountModal({
    windowHeight,
    isOpen,
    setIsOpen,
    snapPoints,
    sheetRef,
    closeModalHandler
}: Props) {
    return (
        <>
            {isOpen ? (
                <TouchableOpacity
                    activeOpacity={1}
                    style={{
                        width: '100%',
                        height: windowHeight,
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                    onPress={closeModalHandler}
                ></TouchableOpacity>
            ) : null}
            <BottomSheet
                snapPoints={snapPoints}
                ref={sheetRef}
                onClose={() => setIsOpen(false)}
                handleComponent={null}
                backgroundStyle={{
                    backgroundColor: 'transparent'
                }}
            >
                <BottomSheetView
                    style={styles.bottomSheet}
                >
                    <Box
                        direction="row"
                        width="100%"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Text color={theme.color.light.WHITE} fontSize={theme.numericFontSize.md}>
                            Add account
                        </Text>
                        <TouchableOpacity
                            onPress={closeModalHandler}
                            activeOpacity={1}
                        >
                            <Text color={theme.color.light.LIGHT_TEXT} fontSize={14}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </Box>
                    <Box marginTop={24}>
                        <Box>
                            <Input
                                placeholder="Choose an app"
                                labelText="App"
                            />
                        </Box>
                        <Box marginTop={16}>
                            <Input
                                placeholder="your username..."
                                labelText="Username"
                            />
                        </Box>
                        <Box marginTop={16}>
                            <Input
                                placeholder="your password..."
                                labelText="Password"
                            />
                        </Box>
                        <Box marginTop={24}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.addButton}
                            >
                                <Text color={theme.color.light.WHITE}>Add</Text>
                            </TouchableOpacity>
                        </Box>
                    </Box>
                </BottomSheetView>
            </BottomSheet>
        </>
    );
}


const styles = StyleSheet.create({
    bottomSheet: {
        position: 'absolute',
        backgroundColor: theme.color.light.ADD_ACCOUNT_MODAL_BAKGROUND,
        top: 0,
        left: 0,
        width: '100%',
        height: 420,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 24
    },
    addButton: {
        width: '100%',
        height: 48,
        backgroundColor: theme.color.light.DARK_GRAY,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center'
    }
})