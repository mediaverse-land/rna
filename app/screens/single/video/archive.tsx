// import { useContext, useEffect, useRef, useState } from 'react';
// import { View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useIsFocused } from '@react-navigation/native';
// import { ScreenGradient } from '../../../components/screen-gradient';
// import { Box } from '../../../components/box';
// import { SingleVideoContent } from './content';
// import { CommentCard } from '../../../components/comment-card';
// import { BuyBottom } from '../components/buy-button';
// import { tokenContext } from '../../../context/token';
// import { VirtualizedList } from '../../../components/virtualized-list';
// import { RenderIf } from '../../../components/render-if';
// import { MetaDataType } from '../components/item-metadata';
// import { userContext } from '../../../context/user';
// import { ifUserIsOwner } from '../../../utils/if-user-is-owner';
// import { SingleVideoHeader } from './header';
// import { Video } from '../../../types/video';
// import { getVideoDetailApiHandler } from '../service';
// import { SingleItemFiles } from '../components/files';
// import { useClickOutside } from 'react-native-click-outside';
// import { ReportModal } from '../components/report-modal';
// import { RenderIfWithoutLoading } from '../../../components/render-if-without-loading';
// import { retriveToken } from '../../../utils/retrive-token';
// import { FocusedStatusBar } from '../../../components/focused-statusbar';
// import { VIDEO_THUMBNAIL_PLACEHOLDER } from '../../../constaints/images';
// import { SingleAssetFooter } from '../components/footer';
// import { EDIT_SCREEN } from '../../../constaints/consts';
// import { useYoutubeShareMutation } from '../../../services/asset.service';
// import { YoutubeShare } from '../components/youtube-share';
// import { BackButtonRedirector } from '../utils/back-button-redirector';

// const _youtubeShare = new YoutubeShare();
// const _backButtonRedirector = new BackButtonRedirector();

// export function SingleVideoScreen({ navigation, route }: any) {


//   const { id, ORIGIN } = route.params;
//   const isFocused = useIsFocused();

//   const [data, setData] = useState<Video>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isOwner, setIsOwner] = useState<boolean>(null);
//   const [isSubscriber, setIsSubscriber] = useState<boolean>(null);
//   const [videoUri, setVideoUri] = useState<string>(null);
//   const [openReportModal, setOpenReportModal] = useState(false);
//   const [token, setToken] = useState(null);

//   const [_currentUserId, _setCurrentUserId] = useState<number>(null);

//   // ReportModalRef close while clicked outside
//   const ref = useClickOutside<View>(() => {
//     setOpenReportModal(false);
//   });

//   const tokenCtx = useContext(tokenContext);
//   const userCtx = useContext(userContext);

//   const youtubeShareRef = useRef(null);

//   const youtubeShareWrapperRef = useClickOutside<View>(() => {
//     youtubeShareRef?.current?.close();
//   });

//   const [
//     _shareYoutubeApiFunction,
//     { isLoading: isYoutubeShareLoading, isFetching: isYoutubeShareFetching },
//   ] = useYoutubeShareMutation();

//   _youtubeShare.config({
//     modalRef: youtubeShareRef,
//     modalWrapperRef: youtubeShareWrapperRef,
//     token: token,
//     shareYoutubeApiFunction: _shareYoutubeApiFunction,
//     assetId: data?.asset_id,
//     isLoading: isYoutubeShareLoading || isYoutubeShareFetching,
//   });

//   useEffect(() => {
//     _backButtonRedirector.addListener(ORIGIN, navigation);

//     if (!isFocused) {
//       return _backButtonRedirector.cleanup(navigation);
//     }
//   }, []);

//   useEffect(() => {
//     getData();
//     stopLoad();
//   }, [isFocused]);

//   const getData = async () => {
//     startLoad();
//     const token = await retriveToken(tokenCtx);
//     if (token === null) {
//       stopLoad();
//       return;
//     }

//     setToken(token);
//     await getSingleData(token);
//     stopLoad();
//   };

//   const getSingleData = async (token: string) => {
//     startLoad();

//     const shouldSearchByAssetId = route.params?.saech__asset_id ? true : false;

//     const { isError, res } = await getVideoDetailApiHandler(
//       token,
//       shouldSearchByAssetId,
//       route.params?.saech__asset_id ? route.params?.saech__asset_id : id,
//     );

//     if (isError) {
//       stopLoad();
//       return;
//     }

//     const assetData = res.data;

//     // is user owner
//     const currentUserId = userCtx.getUser();
//     _setCurrentUserId(currentUserId.id);

//     const isUserOwner = ifUserIsOwner(assetData?.asset?.user?.id, currentUserId.id);

//     const fileUrl = assetData?.file?.url || assetData?.asset?.file?.url;

//     if (isUserOwner === true) {
//       setVideoUri(fileUrl);
//     }

//     setIsOwner(isUserOwner);

//     // is user subscriber
//     if (fileUrl) {
//       setVideoUri(fileUrl);
//       setIsSubscriber(true);
//     } else {
//       setIsSubscriber(false);
//     }

//     setData(assetData);
//     stopLoad();
//   };

//   const goBackHandler = () => {
//     navigation.goBack();
//   };

//   const stopLoad = () => {
//     setIsLoading(false);
//   };

//   const startLoad = () => {
//     setIsLoading(true);
//   };

//   const _openReportModalHandler = () => {
//     setOpenReportModal(true);
//   };

//   const _closeReportModalHandler = () => {
//     setOpenReportModal(false);
//   };

//   const navigateToEditScreen = () => {
//     const isDisableEditIcon = data?.asset?.user?.id === _currentUserId ? false : true;

//     if (isDisableEditIcon) {
//       return;
//     }
//     navigation.navigate(EDIT_SCREEN, {
//       id: data?.id,
//       assetType: 'video',
//     });
//   };

//   const thumnailImageUri = data?.asset?.thumbnails?.['390x264'] || VIDEO_THUMBNAIL_PLACEHOLDER;

//   const price = data?.asset?.price || null;

//   const metaDataList: MetaDataType[] =
//     [
//       {
//         id: 1,
//         key: 'Genre',
//         value: data?.genre,
//       },
//       {
//         id: 2,
//         key: 'Type',
//         value: 'Video/Clip',
//       },
//       {
//         id: 3,
//         key: 'Lanuage',
//         value: data?.language,
//       },
//     ] || [];

//   const textFiles = data?.asset?.file
//     ? [
//         {
//           id: 1,
//           chapterName: data?.asset?.file?.details?.name || data?.name,
//           duration: '',
//         },
//       ]
//     : null;

//   const isDisableEditIcon = data?.asset?.user?.id === _currentUserId ? false : true;
//   const accountId: number = userCtx.getUser().id;

//   const shareToYoutubeHandler = () => {
//     _youtubeShare.openModal();
//   };

//   const youtubeShareTemplate = _youtubeShare.template();

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <FocusedStatusBar />
//       <ScreenGradient>
//         <VirtualizedList>
//           <RenderIf condition={isLoading}>
//             <Box width="100%">
//               <RenderIfWithoutLoading condition={data ? true : false}>
//                 <SingleVideoHeader
//                   thumnailImageUri={thumnailImageUri}
//                   goBackHandler={goBackHandler}
//                   contentName={data?.name || ''}
//                   tokenCtx={tokenCtx}
//                   isOwner={isOwner === true ? true : false}
//                   isSubscriber={isSubscriber === true ? true : false}
//                   videoUri={videoUri}
//                   isFocused={isFocused}
//                   openReportModalHandler={_openReportModalHandler}
//                   id={data?.id}
//                   asset_id={data?.asset_id}
//                   userId={data?.asset?.user?.id}
//                   shareToYoutubeHandler={shareToYoutubeHandler}
//                   isDisableEditIcon={isDisableEditIcon}
//                   forkability_status={data?.asset?.forkability_status === 2 ? true : false}
//                 />
//                 <SingleVideoContent
//                   description={data?.description || ''}
//                   metaDataList={metaDataList}
//                   username={data?.asset?.user?.username || ''}
//                   userProfile={data?.asset?.user?.image_url || ''}
//                   duration={data?.length}
//                 />
//                 <RenderIfWithoutLoading condition={data?.asset?.file ? true : false}>
//                   <SingleItemFiles data={textFiles} />
//                 </RenderIfWithoutLoading>
//                 <CommentCard assetId={data?.id} />
//               </RenderIfWithoutLoading>
//             </Box>
//           </RenderIf>
//         </VirtualizedList>
//         {data ? (
//           <BuyBottom
//             isLoading={isLoading}
//             price={price}
//             thumbnail={thumnailImageUri}
//             title={data.name}
//             assetId={data.asset_id || data.id}
//             isSubscriber={isSubscriber}
//             isOwner={isOwner}
//           />
//         ) : null}
//         <RenderIfWithoutLoading condition={isOwner}>
//           <SingleAssetFooter
//             fileName={data?.name}
//             editorHandler={navigateToEditScreen}
//             asset_Id={data?.asset_id}
//             parent_Id={accountId}
//             tokenCtx={tokenCtx}
//             token={token}
//           />
//         </RenderIfWithoutLoading>
//         {data?.asset_id && openReportModal ? (
//           <View
//             ref={ref}
//             style={{
//               position: 'absolute',
//               zIndex: 40000,
//               top: 320,
//               right: 20,
//               backgroundColor: '#0f172cab',
//               width: 250,
//               height: 250,
//             }}
//           >
//             <ReportModal
//               assetId={data?.asset_id}
//               reportModalCloseHandler={_closeReportModalHandler}
//             />
//           </View>
//         ) : null}
//       </ScreenGradient>
//       {youtubeShareTemplate}
//     </SafeAreaView>
//   );
// }
