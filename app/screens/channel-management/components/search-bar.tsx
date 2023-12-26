import { useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box } from '../../../components/box';
import { Text } from '../../../components/text';
import { theme } from '../../../constaints/theme';
import { ChanelManagementView } from '../types';
import { ChannelManagementTitle } from './title';
import { ChannelManagementSearchBox } from './search-box';

const BG_COLOR = 'rgba(14, 14, 18, 0.50)';

type NavTab = {
  id: number;
  title: string;
  path: ChanelManagementView;
};

const NAV_TABS: NavTab[] = [
  {
    id: 1,
    title: 'Channels',
    path: 'CHANNEL',
  },
  {
    id: 2,
    title: 'Conductor',
    path: 'CONDUCTOR',
  },
];

const getStyles = (isSelected: boolean) => {
  return {
    height: '100%',
    borderBottomWidth: 2,
    borderColor: isSelected ? theme.color.light.PRIMARY : 'transparent',
    paddingTop: 17,
    color: isSelected ? theme.color.light.ACTIVE_TEXT : theme.color.light.TEXT,
  };
};

type Props = {
  setSelectedView: (view: ChanelManagementView) => void;
  selectedView: ChanelManagementView;
  goBackHandler: () => void;
};

export function ChannelManagementSearchBar({
  selectedView,
  setSelectedView,
  goBackHandler,
}: Props) {
  const navigator = useMemo(() => {
    return (
      <Box
        backgroundColor={BG_COLOR}
        width="100%"
        height={56}
        borderBottomEndRadius={32}
        borderBottomStartRadius={32}
        marginTop={5}
        paddingRight={24}
        paddingLeft={24}
      >
        <Box id="inner" width="100%" direction="row" alignItems="center" justifyContent="center">
          {NAV_TABS.map((item) => {
            const isSelected = item.path === selectedView;

            const activeStyles: any = getStyles(isSelected);

            return (
              <TouchableOpacity
                key={item.id}
                style={styles.half}
                onPress={() => setSelectedView(item.path)}
              >
                <Box width="100%" height={56} justifyContent="center" alignItems="center">
                  <Text fontSize={16} fontWeight={400} textStyles={activeStyles}>
                    {item.title}
                  </Text>
                </Box>
              </TouchableOpacity>
            );
          })}
        </Box>
      </Box>
    );
  }, [selectedView]);

  const titleComponent = useMemo(
    () => <ChannelManagementTitle goBackHandler={goBackHandler} />,
    [],
  );
  const searchBoxCompoonent = useMemo(() => <ChannelManagementSearchBox />, []);

  return (
    <Box width="100%" height={139} backgroundColor={BG_COLOR} paddingTop={32} position="relative">
      {titleComponent}
      {searchBoxCompoonent}
      {navigator}
    </Box>
  );
}

const styles = StyleSheet.create({
  half: {
    width: '50%',
  },
});
