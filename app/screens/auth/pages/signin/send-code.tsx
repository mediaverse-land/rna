import { FC } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box } from '../../../../shared/components/box';
import { Text } from '../../../../shared/components/text';
import { Input } from '../../../../shared/components/form';

type Props = {
    setCurrentWindowHandler: (
        path: 'INSERT_PHONE' | 'SEND_CODE' | 'FILL_DATA'
    ) => void;
};

const styles = StyleSheet.create({
    fullWidth: {
        width: '100%'
    }
})

export const SendCode: FC<Props> = ({ setCurrentWindowHandler }) => {
    return (
        <>
            <Box flex={1} alignItems="center">
                <Box position="relative" top={'27%'} alignItems="center">
                    <Text
                        color="#fff"
                        lineHeight={20}
                        fontSize={12}
                        fontWeight={600}
                    >
                        We send the code to +339012910407
                    </Text>

                    <Box width="100%" marginTop={40} position="relative">
                        <Input placeholder="your number..." labelText="Code" />
                    </Box>
                </Box>
                <Box
                    width="100%"
                    alignItems="center"
                    position="absolute"
                    bottom={2}
                >
                    <Text
                        color="#83839C"
                        lineHeight={20}
                        fontSize={12}
                        fontWeight={600}
                        marginBottom={24}
                    >
                        Have an account?
                        <Text color="#597AFF"> Log in</Text>
                    </Text>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.fullWidth}
                        onPress={() => setCurrentWindowHandler('FILL_DATA')}
                    >
                        <Box
                            width="100%"
                            height={48}
                            alignItems="center"
                            justifyContent="center"
                            borderRadius={32}
                            backgroundColor="rgba(78, 78, 97, 0.5)"
                        >
                            <Text
                                color="#fff"
                                lineHeight={20}
                                fontSize={12}
                                fontWeight={600}
                            >
                                Send code
                            </Text>
                        </Box>
                    </TouchableOpacity>
                </Box>
            </Box>
        </>
    );
};
