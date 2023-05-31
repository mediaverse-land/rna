import { FC, useState } from 'react';
import { TouchableOpacity, LayoutChangeEvent, Image } from 'react-native';
import { Box } from '../../../shared/components/box';
import {
    VIDEO_FILES_ITEM_GRADEINT,
    VIDEO_FILES_WRAPPER_GRADEINT
} from '../../../constaints/images';
import { Text } from '../../../shared/components/text';
import { theme } from '../../../constaints/theme';
import { ICON_ARROW_UP } from '../../../constaints/icons';

export type FileType = {
    id: number;
    chapterName: string;
    duration: string;
};

type Props = {
    data: FileType[];
};

export const SingleItemFiles: FC<Props> = ({ data }) => {
    const [layoutHeight, setLayoutHeight] = useState<number>(20);
    const [isAccordianOpen, setIsAccordianOpen] = useState(true);

    const setLayoutHeightHandler = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setLayoutHeight(Math.floor(height));
    };

    const toggleAccordianHandler = () => {
        setIsAccordianOpen(!isAccordianOpen);
    };

    return (
        <Box
            width="100%"
            marginTop={24}
            paddingBottom={16}
            onlayout={setLayoutHeightHandler}
        >
            <Image
                source={{ uri: VIDEO_FILES_WRAPPER_GRADEINT }}
                style={{
                    width: '100%',
                    height: layoutHeight,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    borderRadius: 16
                }}
                resizeMode="cover"
            />
            {/* title */}
            <TouchableOpacity
                onPress={toggleAccordianHandler}
                activeOpacity={1}
            >
                <Box
                    width="100%"
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    marginTop={20}
                    paddingLeft={24}
                    paddingRight={24}
                >
                    <Text
                        color={theme.color.light.WHITE}
                        fontSize={theme.numericFontSize.md}
                        lineHeight={theme.numericLineHeight.md}
                    >
                        Files
                    </Text>
                    <Box>
                        <ICON_ARROW_UP
                            style={{
                                width: 7.78,
                                height: 14,
                                transform: [
                                    {
                                        rotateX: isAccordianOpen
                                            ? '180deg'
                                            : '0deg'
                                    }
                                ]
                            }}
                        />
                    </Box>
                </Box>
            </TouchableOpacity>
            {isAccordianOpen ? (
                <Box
                    paddingTop={28}
                    paddingBottom={20}
                    paddingLeft={16}
                    paddingRight={16}
                >
                    {data.map((file) => (
                        <Box key={file.id} marginBottom={8} borderRadius={8}>
                            <Image
                                source={{
                                    uri: VIDEO_FILES_ITEM_GRADEINT
                                }}
                                style={{
                                    width: '100%',
                                    height: 48,
                                    position: 'absolute',
                                    top: 0
                                }}
                            />
                            <Box
                                height={48}
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                paddingLeft={16}
                                paddingRight={16}
                            >
                                <Text
                                    color={theme.color.light.WHITE}
                                    fontSize={14}
                                    lineHeight={14}
                                    fontWeight={400}
                                >
                                    {file.chapterName}
                                </Text>
                                <Text
                                    color={theme.color.light.TEXT}
                                    fontSize={14}
                                    lineHeight={14}
                                    fontWeight={400}
                                >
                                    {file.duration}
                                </Text>
                            </Box>
                        </Box>
                    ))}
                </Box>
            ) : null}
        </Box>
    );
};
