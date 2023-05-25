import { useEffect } from 'react'
import { TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Box } from "../../../../shared/components/box";
import { Text } from "../../../../shared/components/text";
import { theme } from "../../../../constaints/theme";
import { Input } from "../../../../shared/components/form";

type Props = {
    windowHeight: number,
    isOpen: boolean,
    setIsOpen: (open: boolean) => any,
    snapPoints: string[],
    sheetRef: BottomSheet | any,
    closeModalHandler: () => void
}

export function AddAccountModal({
    windowHeight,
    isOpen,
    setIsOpen,
    snapPoints,
    sheetRef,
    closeModalHandler
}: Props) {

    return (

        <>{
            isOpen ?
                <TouchableOpacity
                    style={{
                        width: '100%',
                        height: windowHeight,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                    onPress={closeModalHandler}
                >

                </TouchableOpacity>
                : null
        }
            <BottomSheet
                snapPoints={snapPoints}
                ref={sheetRef}
                onClose={() => setIsOpen(false)}
                handleComponent={null}
                backgroundStyle={{
                    backgroundColor: 'transparent'
                }}
            >
                <BottomSheetView style={{
                    position: 'absolute',
                    backgroundColor: 'rgba(78, 78, 97, 0.75)',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: 420,
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    padding: 24
                }}>
                    <Box direction="row" width='100%' justifyContent="space-between" alignItems="center">
                        <Text color="#fff" fontSize={theme.numericFontSize.md}>Add account</Text>
                        <TouchableOpacity onPress={closeModalHandler}>
                            <Text color="#A2A2B5" fontSize={14}>Cancel</Text>
                        </TouchableOpacity>
                    </Box>
                    <Box marginTop={24}>
                        <Box>
                            <Input placeholder="Choose an app" labelText="App" />
                        </Box>
                        <Box marginTop={16}>
                            <Input placeholder="your username..." labelText="Username" />
                        </Box>
                        <Box marginTop={16}>
                            <Input placeholder="your password..." labelText="Password" />
                        </Box>
                        <Box marginTop={24}>
                            <TouchableOpacity
                                style={{
                                    width: '100%',
                                    height: 48,
                                    backgroundColor: 'rgba(28, 28, 35, 0.75)',
                                    borderRadius: 32,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Text color="#fff">Add</Text>
                            </TouchableOpacity>
                        </Box>
                    </Box>
                </BottomSheetView>
            </BottomSheet>
        </>
    )
}