import { Image, StyleSheet } from 'react-native';
import { MasonryComponents } from './style';
import { Flex } from '../../../styles/grid';
import { Box } from '../box';

type ImageType = { id: number; width: number; height: number; path: string };

type Props = {
    data: {
        row: ImageType[];
    }[];
};

const { MasonryWrapper, MasonryRow } = MasonryComponents;

export function Masonry({ data }: Props) {
    let direction: 'row' | 'row-reverse' = 'row';

    const renderMasonryList = data.map(
        (list: { row: ImageType[] }, index: number) => {
            const findTwoInTwoImage = list.row.find(
                (f: ImageType) => f.width === 2 && f.height === 2
            );

            // If there is one 2*2 image
            if (findTwoInTwoImage) {
                if (direction === 'row') {
                    direction = 'row-reverse';
                } else {
                    direction = 'row';
                }

                const twoInTwoImage = findTwoInTwoImage;
                const oneInOneImages = list.row.filter(
                    (f: ImageType) => f.width !== 2 && f.height !== 2
                );

                return (
                    <Flex justify="space-between" direction={direction}>
                        <Box marginBottom={8} width="32%">
                            {oneInOneImages.map(
                                (
                                    _oneInOneItem: ImageType,
                                    _oneInOneItemIndex: number
                                ) => (
                                    <Image
                                        key={_oneInOneItemIndex}
                                        source={{ uri: _oneInOneItem.path }}
                                        style={[
                                            styles.oneInOneImageStyle,
                                            _oneInOneItemIndex / 2 === 0 && {
                                                marginBottom: 8
                                            }
                                        ]}
                                    />
                                )
                            )}
                        </Box>
                        <Box width="66%">
                            <Image
                                source={{ uri: twoInTwoImage.path }}
                                style={{
                                    width: '100%',
                                    height: 226,
                                    borderRadius: 8
                                }}
                            />
                        </Box>
                    </Flex>
                );
            }

            // If all images sizes are 1*1
            return (
                <MasonryRow key={index}>
                    <Box marginBottom={8} paddingRight={8}>
                        <Flex
                            direction="row"
                            height="109px"
                            justify="space-between"
                            align="center"
                        >
                            {list.row.map((r: ImageType) => {
                                return (
                                    <Image
                                        key={r.id}
                                        style={{
                                            width: '32%',
                                            height: 109,
                                            borderRadius: 8
                                        }}
                                        source={{ uri: r.path }}
                                    />
                                );
                            })}
                        </Flex>
                    </Box>
                </MasonryRow>
            );
        }
    );

    return <MasonryWrapper>{renderMasonryList}</MasonryWrapper>;
}

const styles = StyleSheet.create({
    oneInOneImageStyle: {
        width: '100%',
        height: 109,
        borderRadius: 8
    }
});
