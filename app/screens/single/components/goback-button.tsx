import { FC, useState } from 'react';
import { SingleVideoPageComponents } from '../style';
import {
    ICON_ARROW_LEFT_WHITE,
    ICON_MENU_ACTIVE
} from '../../../constaints/icons';
import { TouchableOpacity } from 'react-native';
import { useRtl } from '../../../hooks/use-rtl';
import { Box } from '../../../components/box';
import { windowSize } from '../../../utils/window-size';
import { Text } from '../../../components/text';
import { theme } from '../../../constaints/theme';

type Props = {
    goBackHandler: () => void;
    hasBackground?: boolean;
    isOwner?: boolean;
};
const { BackButton } = SingleVideoPageComponents;

const { width: windowWidth, height: windowHeight } = windowSize();

const menuList: { id: number; title: string }[] = [
    {
        id: 1,
        title: 'Edit file'
    },
    {
        id: 2,
        title: 'Edit info'
    },
    {
        id: 3,
        title: 'Download'
    },
    {
        id: 4,
        title: 'Publish'
    },
    {
        id: 5,
        title: 'Share'
    }
];

export const GoBackButton: FC<Props> = ({
    goBackHandler,
    hasBackground,
    isOwner
}) => {
    const { isRtl } = useRtl();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenuHandler = () => {
        setIsMenuOpen(false);
    };

    const openMenuHandler = () => {
        setIsMenuOpen(true);
    };

    const renderGoBackButton = !hasBackground ? (
        <TouchableOpacity
            activeOpacity={1}
            onPress={goBackHandler}
            style={{
                position: 'absolute',
                top: 30,
                left: 24,
                zIndex: 10
            }}
        >
            <ICON_ARROW_LEFT_WHITE
                style={{
                    width: 20,
                    height: 15.5,
                    transform: [{ rotate: isRtl ? '180deg' : '0deg' }]
                }}
            />
        </TouchableOpacity>
    ) : (
        <BackButton onPress={goBackHandler}>
            <ICON_ARROW_LEFT_WHITE
                style={{
                    width: 20,
                    height: 15.5,
                    transform: [{ rotate: isRtl ? '180deg' : '0deg' }]
                }}
            />
        </BackButton>
    );

    return (
        <>
            {/* menu */}
            {isMenuOpen ? (
                <Box
                    id="menu"
                    width={120}
                    position="absolute"
                    top={75}
                    right={24}
                    backgroundColor="rgba(78, 78, 97, 0.2)"
                    zIndex={100}
                    borderRadius={16}
                    paddingLeft={16}
                    paddingRight={16}
                    paddingBottom={16}
                >
                    {menuList.map((menu) => (
                        <Text
                            key={menu.id}
                            color={theme.color.light.CARD_TITLE_TEXT}
                            fontWeight={600}
                            fontSize={14}
                            lineHeight={20}
                            marginTop={16}
                        >
                            {menu.title}
                        </Text>
                    ))}
                </Box>
            ) : null}
            {/* menu background */}
            {isMenuOpen ? (
                <TouchableOpacity
                    style={{
                        width: '100%',
                        height: windowHeight,
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        zIndex: 40
                    }}
                    onPress={closeMenuHandler}
                >
                    <Box
                        width="100%"
                        height={windowHeight}
                        position="absolute"
                        left={0}
                        top={0}
                        zIndex={40}
                    ></Box>
                </TouchableOpacity>
            ) : null}
            <Box
                width="100%"
                height={40}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                position="absolute"
                top={20}
                zIndex={24}
                paddingRight={24}
                paddingLeft={24}
            >
                {renderGoBackButton}
                {/* {isOwner ? (
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={openMenuHandler}
                    >
                        <Box
                            backgroundColor={
                                hasBackground ? 'rgba(14, 14, 18, 0.5)' : null
                            }
                            width={40}
                            height={40}
                            borderRadius={100}
                            alignItems="center"
                            justifyContent="center"
                            position={hasBackground ? 'relative' : 'absolute'}
                            left={
                                !hasBackground &&
                                Math.floor(windowWidth) - 48 - 40
                            }
                            zIndex={100}
                            top={!hasBackground ? 8 : 0}
                        >
                            <ICON_MENU_ACTIVE width={18} height={5.2} />
                        </Box>
                    </TouchableOpacity>
                ) : null} */}
            </Box>
        </>
    );
};
