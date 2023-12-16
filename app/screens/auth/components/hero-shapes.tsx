import { Image, StyleSheet } from 'react-native';
import { AUTH_EMOJY, AUTH_SHAPE_ONE, AUTH_SHAPE_TWO } from '../../../constaints/images';
import { Box } from '../../../components/box';

export function HeroShapes() {
  return (
    <Box width="100%" height={400} alignItems="center">
      <Image
        source={{
          uri: AUTH_SHAPE_ONE,
        }}
        style={styles.shapeOne}
      />
      <Box>
        <Image
          source={{
            uri: AUTH_SHAPE_TWO,
          }}
          style={styles.shapeTwo}
        />
      </Box>
      <Box paddingLeft={30}>
        <AUTH_EMOJY width={230} height={183} style={styles.icon} />
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  shapeOne: {
    width: 200,
    height: 230,
    position: 'absolute',
    right: '-37%',
    top: 130,
    transform: [{ rotate: '10deg' }],
  },
  shapeTwo: {
    width: 240,
    height: 260,
    position: 'absolute',
    left: '-90%',
    top: -10,
    transform: [{ rotate: '-30deg' }],
  },
  icon: {
    marginTop: 112,
  },
});
