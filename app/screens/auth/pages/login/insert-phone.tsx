import { FC } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ICON_FRANCE_FLAG } from '../../../../constaints/icons';
import { Box } from '../../../../shared/components/box';
import { Input } from '../../../../shared/components/form';
import { Text } from '../../../../shared/components/text';
import { LoginWindows } from '../types';
import { theme } from '../../../../constaints/theme';

type Props = {
    setCurrentWindowHandler: (window: Partial<LoginWindows>) => void;
};

export const InsertPhone: FC<Props> = ({ setCurrentWindowHandler }) => {
    return (
        <>
            <Box flex={1} alignItems="center">
                <Box position="relative" top={'27%'} alignItems="center">
                    <Text
                        color={theme.color.light.WHITE}
                        lineHeight={20}
                        fontSize={12}
                        fontWeight={600}
                    >
                        Insert your number for loging in.
                    </Text>
                    <Box width="100%" marginTop={40} position="relative">
                        <Input
                            placeholder="your number..."
                            labelText="+33"
                            labelIcon={
                                <ICON_FRANCE_FLAG style={styles.flagIcon} />
                            }
                        />
                    </Box>
                </Box>

                <Box
                    width="100%"
                    alignItems="center"
                    position="absolute"
                    bottom={2}
                >
                    <Text
                        color={theme.color.light.LIGHT_DESCRIPTION}
                        lineHeight={20}
                        fontSize={12}
                        fontWeight={600}
                        marginBottom={24}
                    >
                        DOnt have an account?
                        <Text color={theme.color.light.PRIMARY}> Signup</Text>
                    </Text>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.fullWidth}
                        onPress={() => setCurrentWindowHandler('SEND_CODE')}
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
                                color={theme.color.light.WHITE}
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

const styles = StyleSheet.create({
    flagIcon: {
        width: 25,
        height: 18
    },
    fullWidth: {
        width: '100%'
    }
});
