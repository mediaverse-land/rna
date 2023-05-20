import { Title } from '../../../../shared/components/title';
import { ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG } from '../../../../constaints/icons';
import { Masonry } from '../../../../shared/components/masonry';
import { masonryListImagesMockData } from './mock-data/most-viewd-masonry';
import { Box } from '../../../../shared/components/box';
import { Flex } from '../../../../styles/grid';

export function AllPageMostViewed() {
    return (
        <Box marginTop={40} flex={1}>
            <Flex direction='row' >
                <ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG
                    width={16}
                    height={16}
                    style={{ marginRight: 8, marginTop: 3 }}
                />
                <Title str="Most viewed" />
            </Flex>
            <Box width={'100%'} flex={1}>
                <Masonry data={masonryListImagesMockData} />
            </Box>
        </Box>
    );
}
