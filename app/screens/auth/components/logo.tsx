import { ICON_LOGO_BOTTOM_SECTION, ICON_LOGO_MIDD_SECTION, ICON_LOGO_TOP_SECTION } from "../../../constaints/icons";
import { theme } from "../../../constaints/theme";
import { Box } from "../../../shared/components/box";
import { Text } from "../../../shared/components/text";

export function AuthLogo() {
    return (
        <Box
            width='100%'
            justifyContent="center"
            alignItems="center"
            paddingTop={56}
        >
            <ICON_LOGO_TOP_SECTION
                style={{
                    width: 14.20,
                    height: 8
                }}
            />
            <ICON_LOGO_MIDD_SECTION
                style={{
                    width: 25,
                    height: 19.89,
                    position: 'relative',
                    top: -4
                }}
            />
            <ICON_LOGO_BOTTOM_SECTION
                style={{
                    width: 14.16,
                    height: 8.19,
                    position: 'relative',
                    top: -6
                }}
            />
            <Text
                color="#fff"
                lineHeight={19}
                fontSize={theme.numericFontSize.md}
                fontWeight={600}
                marginTop={4}
            >
                Mediaverse
            </Text>
            <Text
                color="#83839C"
                lineHeight={14.5}
                fontSize={theme.numericFontSize.sm}
                fontWeight={400}
            >
                Content is wealth
            </Text>

        </Box>
    )
}