import { Image, StyleSheet } from 'react-native';
import { ImagesPageComponents } from './style';
import { Flex } from '../../../../styles/grid';
import {
    BANNER_ITEM_GRADIENT_IMAGE,
    BANNER_PODCAST_IMAGE,
    BANNER_STREAMS_IMAGE,
    BANNER_VLOG_IMAGE
} from '../../../../constaints/images';
import { windowSize } from '../../../../utils/window-size';

const { BannerItem, BannerItemTitel, BannerItemDescription } =
    ImagesPageComponents;

const windowWidth = Math.floor(windowSize().width);
const width = (windowWidth - 80) / 3;

const bannerData = [
    {
        id: 1,
        coverPath: BANNER_STREAMS_IMAGE,
        title: 'Stream',
        description: 'top 10'
    },
    {
        id: 2,
        coverPath: BANNER_PODCAST_IMAGE,
        title: 'Podcast',
        description: 'suggest'
    },
    {
        id: 3,
        coverPath: BANNER_VLOG_IMAGE,
        title: 'Vlog',
        description: 'weekly hot'
    }
];

export function AllPageBanners() {
    const renderBannerList = bannerData.map((banner) => (
        <BannerItem key={banner.id} style={{ width }}>
            <Image
                source={{ uri: banner.coverPath }}
                style={styles.bannerImage}
            />
            <Image
                source={{ uri: BANNER_ITEM_GRADIENT_IMAGE }}
                style={styles.bannerImagePlaceholder}
            />
            <BannerItemTitel>{banner.title}</BannerItemTitel>
            <BannerItemDescription>{banner.description}</BannerItemDescription>
        </BannerItem>
    ));

    return (
        <Flex
            direction="row"
            justify="space-between"
            align="center"
            height="170"
        >
            {renderBannerList}
        </Flex>
    );
}

const styles = StyleSheet.create({
    bannerImage: {
        width: '100%',
        height: '100%',
        borderRadius: 16
    },
    bannerImagePlaceholder: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
        position: 'absolute'
    },
})
