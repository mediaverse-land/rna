import { StyleSheet } from 'react-native';
import { windowSize } from '../../utils/window-size';

const { height } = windowSize();

export const channelManagementStyles = StyleSheet.create({
  editViewWrapper: {
    position: 'absolute',
    width: 124,
    height: 124,
    zIndex: 100000000,
    right: 16,
    top: 58,
  },
  safeAreaView: {
    flex: 1,
  },
  header: {
    flex: 1,
    height: 200,
  },
  blur: {
    height: '100%',
    borderRadius: 16,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  container: {
    flex: 1,
    height: 470,
    width: '100%',
    padding: 24,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  contentModalContainer: {
    flex: 1,
    height: height,
    width: '100%',
    padding: 24,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bottomSheetScrollView: {
    width: '100%',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  bottomSheetBlurView: {
    width: '100%',
    flex: 1,
    minHeight: 300,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
});
