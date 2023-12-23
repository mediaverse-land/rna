import { FC } from 'react';
import { Box } from '../../../components/box';
import { ICON_ARROW_LEFT_SVG, ICON_MENU_ACTIVE } from '../../../constaints/icons';
import { TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';

type Props = {
  goBackHandler: () => void;
  toolbarClickHandler?: () => void;
  hasBackground?: boolean;
  isOwner?: boolean;
  showToolbarMenu?: boolean;
};

export const GoBackButton: FC<Props> = ({
  goBackHandler,
  hasBackground = false,
  showToolbarMenu,
  toolbarClickHandler
}) => {
  return (
    <Box width="100%" marginTop={24} height={48}>
      <Box
        width="100%"
        height={48}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        {hasBackground ? (
          <TouchableOpacity onPress={goBackHandler}>
            <Box
              width={72}
              borderRadius={20}
              height={48}
              left={24}
              additionalStyles={{
                overflow: 'hidden',
              }}
            >
              <BlurView
                style={{
                  width: 72,
                  height: 48,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                tint="dark"
                intensity={90}
              >
                <ICON_ARROW_LEFT_SVG />
              </BlurView>
            </Box>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Box
              id="go-back-button-wrapper"
              justifyContent="center"
              width={70}
              height={48}
              paddingLeft={24}
            >
              <ICON_ARROW_LEFT_SVG />
            </Box>
          </TouchableOpacity>
        )}
        {showToolbarMenu ? (
          <TouchableOpacity onPress={toolbarClickHandler}>
            <Box
              marginRight={24}
              width={48}
              height={48}
              borderRadius={100}
              additionalStyles={{
                overflow: 'hidden',
              }}
            >
              <BlurView
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                tint="dark"
                intensity={90}
              >
                <ICON_MENU_ACTIVE />
              </BlurView>
            </Box>
          </TouchableOpacity>
        ) : null}
      </Box>
    </Box>
  );
};

// import { FC, useState } from 'react';
// import { SingleVideoPageComponents } from '../style';
// import { ICON_ARROW_LEFT_WHITE } from '../../../constaints/icons';
// import { TouchableOpacity } from 'react-native';
// import { useRtl } from '../../../hooks/use-rtl';
// import { Box } from '../../../components/box';
// import { windowSize } from '../../../utils/window-size';
// import { Text } from '../../../components/text';
// import { theme } from '../../../constaints/theme';

// const { BackButton } = SingleVideoPageComponents;

// const { height: windowHeight } = windowSize();

// const menuList: { id: number; title: string }[] = [
//   {
//     id: 1,
//     title: 'Edit file',
//   },
//   {
//     id: 2,
//     title: 'Edit info',
//   },
//   {
//     id: 3,
//     title: 'Download',
//   },
//   {
//     id: 4,
//     title: 'Publish',
//   },
//   {
//     id: 5,
//     title: 'Share',
//   },
// ];

// export const GoBackButton: FC<Props> = ({ goBackHandler, hasBackground }) => {
//   const { isRtl } = useRtl();

//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const closeMenuHandler = () => {
//     setIsMenuOpen(false);
//   };

//   const renderGoBackButton = !hasBackground ? (
//     <TouchableOpacity
//       activeOpacity={1}
//       onPress={goBackHandler}
//       style={{
//         position: 'absolute',
//         top: 30,
//         left: 24,
//         zIndex: 10,
//       }}
//     >
//       <ICON_ARROW_LEFT_WHITE
//         style={{
//           width: 20,
//           height: 15.5,
//           transform: [{ rotate: isRtl ? '180deg' : '0deg' }],
//         }}
//       />
//     </TouchableOpacity>
//   ) : (
//     <BackButton onPress={goBackHandler}>
//       <ICON_ARROW_LEFT_WHITE
//         style={{
//           width: 20,
//           height: 15.5,
//           transform: [{ rotate: isRtl ? '180deg' : '0deg' }],
//         }}
//       />
//     </BackButton>
//   );

//   return (
//     <>
//       {/* menu */}
//       {isMenuOpen ? (
//         <Box
//           id="menu"
//           width={120}
//           position="absolute"
//           top={75}
//           right={24}
//           backgroundColor="rgba(78, 78, 97, 0.2)"
//           zIndex={100}
//           borderRadius={16}
//           paddingLeft={16}
//           paddingRight={16}
//           paddingBottom={16}
//         >
//           {menuList.map((menu) => (
//             <Text
//               key={menu.id}
//               color={theme.color.light.CARD_TITLE_TEXT}
//               fontWeight={600}
//               fontSize={14}
//               lineHeight={20}
//               marginTop={16}
//             >
//               {menu.title}
//             </Text>
//           ))}
//         </Box>
//       ) : null}
//       {/* menu background */}
//       {isMenuOpen ? (
//         <TouchableOpacity
//           style={{
//             width: '100%',
//             height: windowHeight,
//             position: 'absolute',
//             left: 0,
//             top: 0,
//             zIndex: 40,
//           }}
//           onPress={closeMenuHandler}
//         >
//           <Box
//             width="100%"
//             height={windowHeight}
//             position="absolute"
//             left={0}
//             top={0}
//             zIndex={40}
//           ></Box>
//         </TouchableOpacity>
//       ) : null}
//       <Box
//         width="100%"
//         height={40}
//         direction="row"
//         alignItems="center"
//         justifyContent="space-between"
//         position="absolute"
//         top={20}
//         zIndex={24}
//         paddingRight={24}
//         paddingLeft={24}
//       >
//         {renderGoBackButton}
//       </Box>
//     </>
//   );
// };
