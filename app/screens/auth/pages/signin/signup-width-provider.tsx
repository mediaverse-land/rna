import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box } from '../../../../shared/components/box';
import { Text } from '../../../../shared/components/text';
import { AuthProviderButton } from '../../components/auth-provider-button';
import { providerButtons } from '../../mock-data';
import { theme } from '../../../../constaints/theme';

type Props = {
    height: number;
    setSIgnupWithUsernameHandler: () => void;
};

export const SignUpWithProvider: FC<Props> = ({
    height,
    setSIgnupWithUsernameHandler
}) => {
    return (
        <Box
            width={'100%'}
            height={Math.floor(height) - 170}
            position="relative"
        >
            <Box position="absolute" width={'100%'} bottom={52}>
                {providerButtons.map((f) => (
                    <AuthProviderButton
                        key={f.id}
                        icon={f.icon}
                        backgroundColor={f.backgroundColor}
                        textColor={f.textColor}
                        text={f.text}
                    />
                ))}
                <Box
                    width="100%"
                    height={124}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Text
                        color={theme.color.light.WHITE}
                        lineHeight={20}
                        fontSize={12}
                        fontWeight={600}
                    >
                        Or
                    </Text>
                </Box>
            </Box>
            <Box width="100%" position="absolute" bottom={5}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={setSIgnupWithUsernameHandler}
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
                            Sign up with number
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>
        </Box>
    );
};
