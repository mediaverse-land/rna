import { Image, StyleSheet } from 'react-native';
import { Box } from '../../../shared/components/box';
import { Flex } from '../../../styles/grid';
import { Text } from '../../../shared/components/text';
import { theme } from '../../../constaints/theme';

type Props = {
    title: string;
    category: string;
    imagePath: string;
};

export function AppItem({ title, category, imagePath }: Props) {
    return (
        <Box
            width={'100%'}
            height={72}
            paddingBottom={16}
            paddingLeft={16}
            paddingRight={16}
            paddingTop={16}
            backgroundColor="#292953"
            borderRadius={16}
            marginBottom={8}
        >
            <Flex direction="row" align="center">
                <Box>
                    <Image
                        source={{ uri: imagePath }}
                        style={styles.itemIcon}
                    />
                </Box>
                <Box marginLeft={16}>
                    <Box direction="row">
                        <Text
                            color={theme.color.light.WHITE}
                            fontSize={16}
                            lineHeight={16}
                            fontWeight={600}
                        >
                            {title}
                        </Text>
                    </Box>
                    <Box direction="row">
                        <Text
                            color={theme.color.light.TEXT}
                            fontSize={12}
                            lineHeight={16}
                            marginTop={8}
                            fontWeight={400}
                        >
                            {category}
                        </Text>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
}

const styles = StyleSheet.create({
    itemIcon: {
        width: 40,
        height: 40,
        borderRadius: 8
    }
});
