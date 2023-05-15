import { Dimensions, Image } from 'react-native';
import { ImagesPageComponents } from './style';
import { Flex } from '../../../../styles/grid';
import {
    BANNER_ITEM_GRADIENT_IMAGE,
    BANNER_PODCAST_IMAGE,
    BANNER_STREAMS_IMAGE,
    BANNER_VLOG_IMAGE
} from '../../../../constaints/images';

const { BannerItem } = ImagesPageComponents;

const windowWidth = Math.floor(Dimensions.get('window').width);
const width = (windowWidth - 80) / 3;

export function AllPageBanners() {
    return (
        <Flex
            direction="row"
            justify="space-between"
            align="center"
            height="170"
        >
            <BannerItem style={{ width }}>
                <Image
                    source={{ uri: BANNER_STREAMS_IMAGE }}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 16
                    }}
                />
                <Image
                    source={{ uri: BANNER_ITEM_GRADIENT_IMAGE }}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 16,
                        position: 'absolute'
                    }}
                />
            </BannerItem>
            <BannerItem style={{ width }}>
                <Image
                    source={{ uri: BANNER_PODCAST_IMAGE }}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 16
                    }}
                />
                <Image
                    source={{ uri: BANNER_ITEM_GRADIENT_IMAGE }}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 16,
                        position: 'absolute'
                    }}
                />
            </BannerItem>
            <BannerItem style={{ width }}>
                <Image
                    source={{ uri: BANNER_VLOG_IMAGE }}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 16
                    }}
                />
                <Image
                    source={{ uri: BANNER_ITEM_GRADIENT_IMAGE }}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 16,
                        position: 'absolute'
                    }}
                />
            </BannerItem>
        </Flex>
    );
}
