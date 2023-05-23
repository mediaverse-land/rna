import { Image } from "react-native";
import { Box } from "../../../shared/components/box";
import { Text } from "../../../shared/components/text";
import { UserNameCard } from "../../../shared/components/username-card";
import { theme } from "../../../constaints/theme";
import { HORIZONTAL_SLIDER_GRADIENT } from "../../../constaints/images";

type Props = {
    width: number,
    imagePath: string,
    title: string;
    username: string;
    profileUri: string;
}

export function ListItem({ width, imagePath, title, username, profileUri }: Props) {
    return (
        <Box
            width={width}
            height={221}
            marginBottom={30}
        >
            <Box
                width={163}
                height={163}
            >
                <Image
                    source={{ uri: imagePath }}
                    style={{
                        borderRadius: 16,
                        width: 163,
                        height: 163
                    }}
                />
                <Image
                    source={{
                        uri: HORIZONTAL_SLIDER_GRADIENT
                    }}
                    style={{
                        borderRadius: 16,
                        width: 163,
                        height: 163,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 10
                    }}
                />
            </Box>
            <Box
                paddingLeft={8}
                paddingRight={8}
            >
                <Text
                    marginTop={16}
                    color="#666680"
                    fontWeight={400}
                    fontSize={theme.numericFontSize.md}
                    lineHeight={16}
                >{title}</Text>
                <Box width="100%" marginTop={8}>
                    <UserNameCard
                        username={username}
                        profileUri={profileUri}
                        usernameStyles={{
                            color: '#666680',
                            fontSize: theme.numericFontSize.sm,
                            marginLeft: 8,
                            lineHeight: 12
                        }}
                        profileImageStyles={{
                            width: 16,
                            height: 16
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )
}