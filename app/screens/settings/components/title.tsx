import { TouchableOpacity } from 'react-native';
import { theme } from '../../../constaints/theme';
import { Box } from '../../../shared/components/box';
import { Text } from '../../../shared/components/text';
import { ICON_ARROW_LEFT_SVG } from '../../../constaints/icons';
import { useNavigation } from '@react-navigation/native';
import { useRtl } from '../../../hooks/use-rtl';

export function SettingsScreenTitle({ title }: { title: string }) {
    const { isRtl } = useRtl();
    const navigation = useNavigation();

    const goBackHandler = () => {
        navigation.goBack();
    };
    return (
        <Box marginTop={32} width="100%" alignItems="center">
            <Text
                color="#fff"
                fontWeight={600}
                fontSize={theme.numericFontSize.md}
                lineHeight={32}
            >
                {title}
            </Text>
            <TouchableOpacity
                onPress={goBackHandler}
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 0
                }}
            >
                <ICON_ARROW_LEFT_SVG
                    style={{
                        width: 22,
                        height: 16.88,
                        transform: [
                            { rotate: isRtl ? '180deg' : '0deg' }
                        ]
                    }}
                />
            </TouchableOpacity>
        </Box>
    );
}
