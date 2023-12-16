import { useMemo } from 'react';
import { theme } from './../../constaints/theme';
import { windowSize } from '../../utils/window-size';
import {
  ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG,
  ICON_TOP_TABBAR_IMAGE_SVG,
  ICON_TOP_TABBAR_SOUND_ACTIVE_SVG,
  ICON_TOP_TABBAR_SOUND_SVG,
  ICON_TOP_TABBAR_TEXT_ACTIVE_SVG,
  ICON_TOP_TABBAR_TEXT_SVG,
  ICON_TOP_TABBAR_VIDEO_ACTIVE_SVG,
  ICON_TOP_TABBAR_VIDEO_SVG,
} from '../../constaints/icons';
import { Box } from '../box';
import { TouchableOpacity } from 'react-native';
import { Text } from '../text';

export type ActiveNav = 'All' | 'Images' | 'Videos' | 'Sounds' | 'Texts';

export type TabbarItem = {
  id: number;
  title: string;
  path: ActiveNav;
  icon: JSX.Element;
  activeIcon: JSX.Element;
};

const activeNavBorderStyle = {
  borderBottomWidth: 2,
  borderBottomColor: theme.color.light.PRIMARY,
  height: '100%',
  justifyContent: 'center',
};

const { width } = windowSize();

const tabbarItems: TabbarItem[] = [
  {
    id: 1,
    title: 'All',
    path: 'All',
    icon: null,
    activeIcon: null,
  },
  {
    id: 2,
    title: null,
    path: 'Images',
    icon: <ICON_TOP_TABBAR_IMAGE_SVG width={19.76} height={16} />,
    activeIcon: <ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG width={19.76} height={16} />,
  },
  {
    id: 3,
    title: null,
    path: 'Videos',
    icon: <ICON_TOP_TABBAR_VIDEO_SVG width={19.76} height={16} />,
    activeIcon: <ICON_TOP_TABBAR_VIDEO_ACTIVE_SVG width={19.76} height={16} />,
  },
  {
    id: 4,
    title: null,
    path: 'Sounds',
    icon: <ICON_TOP_TABBAR_SOUND_SVG width={19.76} height={16} />,
    activeIcon: <ICON_TOP_TABBAR_SOUND_ACTIVE_SVG width={19.76} height={16} />,
  },
  {
    id: 5,
    title: null,
    path: 'Texts',
    icon: <ICON_TOP_TABBAR_TEXT_SVG width={19.76} height={16} />,
    activeIcon: <ICON_TOP_TABBAR_TEXT_ACTIVE_SVG width={19.76} height={16} />,
  },
];

export const Nav = ({
  activeNav,
  setActiveNav,
  hasFullWidth = false,
  bgColor,
}: {
  activeNav: ActiveNav;
  setActiveNav: (type: ActiveNav) => void;
  hasFullWidth?: boolean;
  bgColor?: string;
}) => {
  const renderTabitems = useMemo(
    () =>
      tabbarItems.map((tab) => {
        const isSelected = tab.path === activeNav;

        const placeholderIcon = isSelected ? tab.activeIcon : tab.icon;

        return (
          <Box
            width="20%"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            additionalStyles={[isSelected ? activeNavBorderStyle : null]}
            alignItems="center"
            key={tab.id}
          >
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setActiveNav(tab.path)}
            >
              {tab.title ? (
                <Text
                  fontSize={14}
                  fontWeight={400}
                  textStyles={{
                    color: isSelected ? theme.color.light.ACTIVE_TEXT : theme.color.light.TEXT,
                  }}
                >
                  {tab.title}
                </Text>
              ) : (
                <>{placeholderIcon}</>
              )}
            </TouchableOpacity>
          </Box>
        );
      }),
    [activeNav],
  );

  return (
    <Box marginBottom={40}>
      <Box
        width={hasFullWidth ? width : width - 48}
        position="relative"
        left={hasFullWidth ? 0 : 24}
        marginTop={10}
        height={50}
        backgroundColor={bgColor || 'rgba(14, 14, 18, 0.50)'}
        borderRadius={hasFullWidth ? 0 : 16}
        direction="row"
        alignItems="center"
        paddingLeft={10}
        paddingRight={10}
        justifyContent="space-between"
      >
        {renderTabitems}
      </Box>
    </Box>
  );
};
