import { StyleSheet } from 'react-native';
import {
  ICON_LOGO_BOTTOM_SECTION,
  ICON_LOGO_MIDD_SECTION,
  ICON_LOGO_TOP_SECTION,
} from '../../../constaints/icons';
import { theme } from '../../../constaints/theme';
import { Box } from '../../../components/box';
import { Text } from '../../../components/text';

export function AuthLogo() {
  return (
    <Box width="100%" justifyContent="center" alignItems="center" paddingTop={56}>
      <ICON_LOGO_TOP_SECTION style={styles.logoIconTopSection} />
      <ICON_LOGO_MIDD_SECTION style={styles.logoIconMidSection} />
      <ICON_LOGO_BOTTOM_SECTION style={styles.logoIconBottomSection} />
      <Text
        color={theme.color.light.WHITE}
        lineHeight={19}
        fontSize={theme.numericFontSize.md}
        fontWeight={600}
        marginTop={4}
      >
        Mediaverse
      </Text>
      <Text
        color={theme.color.light.LIGHT_DESCRIPTION}
        lineHeight={14.5}
        fontSize={theme.numericFontSize.sm}
        fontWeight={400}
      >
        Content is wealth
      </Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  logoIconTopSection: {
    width: 14.2,
    height: 8,
  },
  logoIconMidSection: {
    width: 25,
    height: 19.89,
    position: 'relative',
    top: -4,
  },
  logoIconBottomSection: {
    width: 14.16,
    height: 8.19,
    position: 'relative',
    top: -6,
  },
});
