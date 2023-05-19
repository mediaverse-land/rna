import { View } from 'react-native';
import { Title } from '../../../../shared/components/title';
import { ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG } from '../../../../constaints/icons';
import { Masonry } from '../../../../shared/components/masonry';
import { masonryListImagesMockData } from './mock-data/most-viewd-masonry';

export function AllPageMostViewed() {
    return (
        <View style={{ flex: 1, marginTop: 40 }}>
            <View style={{ flexDirection: 'row' }}>
                <ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG
                    width={16}
                    height={16}
                    style={{ marginRight: 8, marginTop: 3 }}
                />
                <Title str="Most viewed" />
            </View>
            <View style={{ width: '100%', flex: 1 }}>
                <Masonry data={masonryListImagesMockData} />
            </View>
        </View>
    );
}
