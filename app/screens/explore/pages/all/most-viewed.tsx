import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Title } from '../../../../components/title';
import { ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG } from '../../../../constaints/icons';
import Masonry from '../../../../components/masonry';
import { Box } from '../../../../components/box';
import { Flex, PaddingContainer } from '../../../../styles/grid';
import { Asset } from '../../../../types/asset';
import { RenderIf } from '../../../../components/render-if';
import { IfNoItem } from '../../../../components/if-no-item';
import { MOST_VIEWED } from '../../../../constaints/consts';

type Props = {
    isLoading: boolean;
    data: Asset[];
    disableOnIntractions?: boolean
};

export const AllPageMostViewed: FC<Props> = ({ isLoading, data, disableOnIntractions = false }) => {
    return (
        <PaddingContainer>
            <Box  marginTop={23} flex={1}>
                <Flex direction="row">
                    <ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG
                        width={16}
                        height={16}
                        style={styles.icon}
                    />
                    <Title str={MOST_VIEWED} />
                </Flex>
                <Box width={'100%'} flex={1}>
                    <RenderIf condition={isLoading} paddingLeft={24}>
                        <IfNoItem dataLength={data.length}>
                            <Masonry data={data} disableOnIntractions={disableOnIntractions}/>
                        </IfNoItem>
                    </RenderIf>
                </Box>
            </Box>
        </PaddingContainer>
    );
};

const styles = StyleSheet.create({
    icon: {
        marginRight: 8,
        marginTop: 3
    }
});
