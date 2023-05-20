import { Image, View } from 'react-native';
import { TextCardItemComponents } from './style';
import { Box } from '../box';
import { Flex } from '../../../styles/grid';

type Props = {
    title: string;
    description: string;
    userAvatarPath: string;
    userName: string;
};

export function TextItemCard({
    title,
    description,
    userAvatarPath,
    userName
}: Props) {
    return (
        <TextCardItemComponents.Container>
            <TextCardItemComponents.CoverBox>
                <Image
                    source={require('./../../../../assets/icons/icon__sound-white.png')}
                    style={{
                        width: 27,
                        height: 30
                    }}
                />
            </TextCardItemComponents.CoverBox>
            <Box paddingLeft={8}>
                <Flex justify='center'>

                    <TextCardItemComponents.Title>
                        {title}
                    </TextCardItemComponents.Title>
                    <TextCardItemComponents.Description>
                        {description}
                    </TextCardItemComponents.Description>
                    <TextCardItemComponents.UserInfoBox>
                        <Image
                            source={{ uri: userAvatarPath }}
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: 50
                            }}
                        />
                        <TextCardItemComponents.UserName>
                            {userName}
                        </TextCardItemComponents.UserName>
                    </TextCardItemComponents.UserInfoBox>
                </Flex>

            </Box>
        </TextCardItemComponents.Container>
    );
}
