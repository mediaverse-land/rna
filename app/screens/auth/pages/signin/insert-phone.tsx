import { FC } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box } from '../../../../shared/components/box';
import { Text } from '../../../../shared/components/text';
import { Input } from '../../../../shared/components/form';
import { ICON_FRANCE_FLAG } from '../../../../constaints/icons';
import { theme } from '../../../../constaints/theme';

type Props = {
    setCurrentWindowHandler: (
        path: 'INSERT_PHONE' | 'SEND_CODE' | 'FILL_DATA'
    ) => void;
};

const styles = StyleSheet.create({
    flagIcon: {
        width: 25,
        height: 18,
        marginTop: 10,
        paddingTop: 10,
        position: 'relative',
        top: 5
    },
    fullWidth: {
        width: '100%'
    }
});

export const InsertPhone: FC<Props> = ({ setCurrentWindowHandler }) => {
    return (
        <Box flex={1} alignItems="center">
            <Box position="relative" top={'27%'} alignItems="center">
                <Text
                    color={theme.color.light.WHITE}
                    lineHeight={20}
                    fontSize={12}
                    fontWeight={600}
                    marginBottom={40}
                >
                    Insert your number for loging in.
                </Text>

                <Box width="100%" position="relative">
                    <Input
                        placeholder="your number..."
                        labelText="+33"
                        labelIcon={<ICON_FRANCE_FLAG style={styles.flagIcon} />}
                    />
                </Box>
            </Box>
            <Box
                position="absolute"
                bottom={10}
                width="100%"
                alignItems="center"
            >
                <Text
                    color={theme.color.light.LIGHT_DESCRIPTION}
                    lineHeight={20}
                    fontSize={12}
                    fontWeight={600}
                    marginBottom={24}
                >
                    Have an account?
                    <Text color={theme.color.light.PRIMARY}> Log in</Text>
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
    );
};
