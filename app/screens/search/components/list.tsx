import { FC } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Asset } from '../../../types/asset';
import { Box } from '../../../components/box';
import { Text } from '../../../components/text';
import { ListItem } from './list-item';
import { PROFILE_ONE } from '../../../constaints/images';
import { UseNavigationType } from '../../../types/use-navigation';
import { RenderIf } from '../../../components/render-if';

type Props = {
    data: Asset[];
    isLoading: boolean;
};

const keyExtractor = (item: Asset) => item.id.toString();

const contentTypes = {
    1: {
        name: 'texts',
        screen: 'SingleTextScreen'
    },
    2: {
        name: 'images',
        screen: 'SingleImageScreen'
    },
    3: {
        name: 'sounds',
        screen: 'SingleSoundScreen'
    },
    4: {
        name: 'vidoes',
        screen: 'SingleVideoScreen'
    }
};

export const List: FC<Props> = ({ data, isLoading }) => {
    const navigation = useNavigation<UseNavigationType>();

    const renderListItem = ({ item }: { item: Asset }) => {
        const itemContentType = contentTypes[item.type];

        if (!item.id) {
            return;
        }

        const thumbnail = item?.asset?.thumbnail?.thumbnails['852x480']
        const user = item?.asset?.user;
       
        return (
            <ListItem
                width={140}
                imagePath={thumbnail}
                title={item.name}
                username={user?.username}
                profileUri={user?.image_url}
                showItemTypeIcon
                type={item.type}
                onpress={() => {
                    navigation?.navigate(itemContentType.screen, {
                        id: item.id,
                         asset_user_image_url: user?.image_url, 
                         asset_username: user?.username, 
                    });
                }}
                isSelected={false}
            />
        );
    };

    return (
        <RenderIf condition={isLoading}>
            {data.length === 0 ? (
                <Box
                    marginTop={24}
                    width="100%"
                    alignItems="flex-start"
                    justifyContent="center"
                    paddingLeft={24}
                >
                    <Text color="#fff">No item to show</Text>
                </Box>
            ) : (
                <FlatList
                    columnWrapperStyle={{
                        justifyContent: 'space-between'
                    }}
                    numColumns={2}
                    data={data}
                    renderItem={renderListItem}
                    keyExtractor={keyExtractor}
                    style={{
                        paddingBottom: 95
                    }}
                />
            )}
        </RenderIf>
    );
};
