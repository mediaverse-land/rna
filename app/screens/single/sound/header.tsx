// import { Image, TouchableOpacity } from 'react-native';
// import { Box } from '../../../components/box';
// import { Text } from '../../../components/text';
// import { GoBackButton } from '../components/goback-button';
// import { SingleItemUsernameAndDuration } from '../components/username-and-duration';
// import { ICON_SOUND_WHITE } from '../../../constaints/icons';
// import {
//   AUDIO_THUMBNAIL_PLACEHOLDER,
//   PROFILE_ONE,
//   SINGLE_SOUND_COVER_IMAGE_GRADIENT,
//   SINGLE_VIDEO_COVER_IMAGE_GRADIENT,
// } from '../../../constaints/images';
// import { theme } from '../../../constaints/theme';

// type Props = {
//   goBackHandler: () => void;
//   thumnailImageUri: string;
//   contentName: string;
//   isOwner: boolean;
//   isOwnerOrSubscriber: boolean;
//   playSoundHandler: () => void;
//   stopSoundHandler: () => void;
//   openReportModalHandler: () => void;
//   username: string;
//   userProfileUri: string;
// };

// const thumbnailHeight = 332;

// export function SingleSoundHeader({
//   goBackHandler,
//   thumnailImageUri,
//   contentName,
//   isOwner = false,
//   username = '',
//   userProfileUri = PROFILE_ONE,
//   openReportModalHandler,
// }: Props) {
//   // const [isPlaying, setIsPlaying] = useState(false);

//   // const _playSoundHandler = () => {
//   //     playSoundHandler()
//   //     setIsPlaying(true);
//   // }

//   // const _pauseSoundHandler = () => {
//   //     stopSoundHandler()
//   //     setIsPlaying(false);
//   // }

//   const thumbnailHeaderGradient = (
//     <Image
//       source={{
//         uri: SINGLE_SOUND_COVER_IMAGE_GRADIENT,
//       }}
//       style={{
//         position: 'absolute',
//         top: -30,
//         left: 0,
//         width: '100%',
//         zIndex: 2,
//         height: thumbnailHeight + 30,
//         borderBottomLeftRadius: 16,
//         borderBottomRightRadius: 16,
//       }}
//       resizeMode="stretch"
//     />
//   );

//   const thumbnailCoverGradient = (
//     <Image
//       source={{
//         uri: SINGLE_VIDEO_COVER_IMAGE_GRADIENT,
//       }}
//       style={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: 198,
//         height: 198,
//         zIndex: 2,
//         borderBottomLeftRadius: 16,
//         borderBottomRightRadius: 16,
//         borderRadius: 16,
//       }}
//     />
//   );

//   return (
//     <Box position="relative" zIndex={20}>
//       <GoBackButton goBackHandler={goBackHandler} />
//       <Box width="100%" height={thumbnailHeight}>
//         <GoBackButton goBackHandler={goBackHandler} hasBackground={false} isOwner={isOwner} />
//         <Box
//           width={'100%'}
//           height={'100%'}
//           position="relative"
//           zIndex={11}
//           alignItems="center"
//           justifyContent="center"
//         >
//           <Box>
//             <Image
//               source={{ uri: thumnailImageUri || AUDIO_THUMBNAIL_PLACEHOLDER }}
//               style={{
//                 width: 198,
//                 height: 198,
//                 borderRadius: 16,
//               }}
//             />
//             <ICON_SOUND_WHITE
//               style={{
//                 width: 20,
//                 height: 17.99,
//                 position: 'absolute',
//                 zIndex: 10,
//                 left: 24,
//                 bottom: 24,
//                 borderRadius: 16,
//               }}
//             />
//             {thumbnailCoverGradient}
//           </Box>
//           {/* title */}
//           <Text
//             color={theme.color.light.WHITE}
//             fontSize={20}
//             lineHeight={20}
//             fontWeight={600}
//             marginTop={24}
//           >
//             {contentName}
//           </Text>
//           <Box
//             width={198}
//             marginTop={16}
//             direction="row"
//             alignItems="center"
//             justifyContent="center"
//           >
//             <SingleItemUsernameAndDuration
//               username={username}
//               duration={null}
//               profileUri={userProfileUri}
//             />
//             <Box width={50}>
//               <TouchableOpacity activeOpacity={1} onPress={openReportModalHandler}>
//                 <Text color={'#666680'} fontSize={14} fontWeight={400}>
//                   Report
//                 </Text>
//               </TouchableOpacity>
//             </Box>
//           </Box>
//         </Box>
//         {thumbnailHeaderGradient}
//       </Box>
//     </Box>
//   );
// }
