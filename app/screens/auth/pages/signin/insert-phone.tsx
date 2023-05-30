import { FC } from "react";
import { Box } from "../../../../shared/components/box";
import { Text } from "../../../../shared/components/text";
import { Input } from "../../../../shared/components/form";
import { ICON_FRANCE_FLAG } from "../../../../constaints/icons";
import { TouchableOpacity } from "react-native";

type Props = {
    setCurrentWindowHandler: (path: 'INSERT_PHONE' | 'SEND_CODE' | 'FILL_DATA') => void;
}

export const InsertPhone: FC<Props> = ({ setCurrentWindowHandler }) => {
    return (
        <Box flex={1} alignItems="center">
            <Box
                position="relative"
                top={'27%'}
                alignItems="center"
            >
                <Text
                    color="#fff"
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
                        labelIcon={
                            <ICON_FRANCE_FLAG
                                style={{
                                    width: 25,
                                    height: 18,
                                    marginTop: 10,
                                    paddingTop: 10,
                                    position: 'relative',
                                    top: 5
                                }}
                            />
                        }
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
                    style={{
                        width: '100%'
                    }}
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
    );
}
