import { Image, Text, ImageStyle, StyleProp } from 'react-native';
import { RowAlignCenter } from '../../../styles/grid';

type Props = {
    profileUri: string;
    username: string;
    width?: number;
    height?: string;
    borderRadius?: number;
    profileImageStyles?: StyleProp<ImageStyle>;
    usernameStyles?: StyleProp<any>;
};

export function UserNameCard({
    username,
    profileUri,
    width,
    height,
    borderRadius,
    profileImageStyles,
    usernameStyles
}: Props) {
    return (
        <RowAlignCenter>
            <Image
                source={{
                    uri: profileUri
                }}
                style={[
                    {
                        width: width || 20,
                        height: height || 20,
                        borderRadius: borderRadius || 100
                    },
                    profileImageStyles
                ]}
            />
            <Text style={[usernameStyles, { color: 'rgba(0, 0, 51, 0.2)' }]}>
                {username}
            </Text>
        </RowAlignCenter>
    );
}
