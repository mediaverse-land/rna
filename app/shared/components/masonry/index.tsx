import { Image, StyleSheet, View } from 'react-native';
import { MasonryComponents } from './style';
import { Flex, PaddingContainer } from '../../../styles/grid';

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
                    <View
                        style={{
                            flexDirection: direction,
                            justifyContent: 'space-between'
                        }}
                    >
                        <View style={styles.oneInOneSingleImageWrapper}>
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
                        </View>
                        <View style={{ width: '66%' }}>
                            <Image
                                source={{ uri: twoInTwoImage.path }}
                                style={{
                                    width: '100%',
                                    height: 226,
                                    borderRadius: 8
                                }}
                            />
                        </View>
                    </View>
                );
            }

            // If all images sizes are 1*1
            return (
                <MasonryRow key={index}>
                    <Flex
                        direction="row"
                        height="109px"
                        justify="space-between"
                        align="center"
                        style={{ marginBottom: 8 }}
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
    },
    oneInOneSingleImageWrapper: {
        width: '32%',
        marginBottom: 8
    }
});
