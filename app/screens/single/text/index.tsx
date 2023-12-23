import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomSafeArea } from '../../../components/custom-safe-area';
import { ScreenGradient } from '../../../components/screen-gradient';
import { VirtualizedList } from '../../../components/virtualized-list';
import { ComponentNavigationProps } from '../../../types/component-navigation-props';
import { SingleTextComponents } from './components';
import { tokenContext } from '../../../context/token';
import { retriveToken } from '../../../utils/retrive-token';
import {
  useGetSingleTextQuery,
} from '../../../services/single-text.service';
import { AppDispatch, RootState } from '../../../store';
import {
  clearState,
  openConvertTextToTextBottomSheet,
  openYoutubeShareBottomSheet,
  setDataToState,
  setTokenToState,
  openSelectLanguageBottomSheet,
  openConvertTextToAudioView,
} from '../../../slices/single-text.slice';
import { CommentsModalComponent } from '../components/comments-modal';
import { RenderIf } from '../../../components/render-if';
import { useIsFocused } from '@react-navigation/native';
import { Spacer } from '../../../components/spacer';
import { FocusedStatusBar } from '../../../components/focused-statusbar';
import { ToolbarOptions } from '../components/toolbar-woindow';
import { useFocusEffect } from '@react-navigation/native';

export function SingleTextScreen({ route }: ComponentNavigationProps) {
  const { id } = route.params;
  // const { id, ORIGIN } = route.params;

  const [token, setToken] = useState<string>(null);

  const { id: assetMainId } = useSelector((state: RootState) => state.singelTextSlice);

  const tokenCtx = useContext(tokenContext);
  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();

  // Fetch single text asset data
  const { data, isLoading, isFetching, refetch } = useGetSingleTextQuery(
    {
      token,
      id,
    },
    { skip: !token ? true : false },
  );

  useEffect(() => {
    getToken();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (isFocused) {
        return;
      }
      dispatch(clearState());
    }, [isFocused]),
  );

  useEffect(() => {
    if (token) {
      dispatch(setTokenToState(token));
    }
  }, [token]);

  // Refetch the dat
  useEffect(() => {
    if (isFocused) {
      if (token) {
        refetch();
      }
    }
  }, [isFocused]);

  useEffect(() => {
    setDataToStore();
  }, [data]);

  if (!isFocused) {
    return <></>;
  }

  const setDataToStore = async () => {
    if (!data) {
      return;
    }
    dispatch(setDataToState(data));
  };

  const getToken = async () => {
    const _token: any = await retriveToken(tokenCtx);
    setToken(_token);
  };

  const openTextToTextBottoSheet = useCallback(() => {
    dispatch(openConvertTextToTextBottomSheet());
  }, []);

  // Send text to image convert request
  const convertTextToImageHandler = async () => {};

  const openTranslateBottomSheet = useCallback(() => {
    dispatch(openSelectLanguageBottomSheet());
  }, []);

  const openYoutubeShareBottomSheetHandler = useCallback(() => {
    dispatch(openYoutubeShareBottomSheet());
  }, []);

  const convertTextToAudioHandler = useCallback(async () => {
    
    dispatch(openConvertTextToAudioView());
    dispatch(openSelectLanguageBottomSheet())
    
    // dispatch(closeToolbarHandler());

  }, [token, assetMainId]);

  const toolbarOptions = useMemo<ToolbarOptions>(
    () => [
      {
        id: 1,
        title: 'Convert text to text',
        function: openTextToTextBottoSheet,
        shouldCloseModalAfterClick: true,
      },
      {
        id: 2,
        title: 'Convert text to image',
        function: convertTextToImageHandler,
      },
      {
        id: 3,
        title: 'Convert text to audio',
        function: convertTextToAudioHandler,
      },
      {
        id: 5,
        title: 'Share to youtube',
        function: openYoutubeShareBottomSheetHandler,
        shouldCloseModalAfterClick: true,
      },
      {
        id: 6,
        title: 'Translate',
        function: openTranslateBottomSheet,
        shouldCloseModalAfterClick: true,
      },
    ],
    [],
  );

  if (!token) {
    return null;
  }

  return (
    <>
      <FocusedStatusBar showOnAndroid />
      <CustomSafeArea>
        <ScreenGradient>
          <RenderIf condition={isLoading || isFetching}>
            <VirtualizedList>
              <SingleTextComponents.Header />
              <SingleTextComponents.ToolbarWindow toolbarOptions={toolbarOptions} />
              <SingleTextComponents.Description />
              <SingleTextComponents.MetaData />
              <SingleTextComponents.CommentsCard />
              <Spacer margin={200} />
            </VirtualizedList>
            <SingleTextComponents.FooterCard />
          </RenderIf>
        </ScreenGradient>

        {/* Comments modal */}
        <CommentsModalComponent />
        <SingleTextComponents.ConvertTextToTextModal />
        {/* <SingleTextComponents.SelectLanguageModal setSelectedLanguage={() => {}}/> */}
        <SingleTextComponents.YoutubeShareBottomSheet />
        <SingleTextComponents.GoogleDriveShareBottomSheet />
        <SingleTextComponents.ConvertTextToAudioModal />
      </CustomSafeArea>
    </>
  );
}

// import { BackHandler } from 'react-native';

// import { AppState, AppStateStatus } from 'react-native';

// const MyComponent = () => {
//   useEffect(() => {
//     const handleAppStateChange = (nextAppState: AppStateStatus) => {
//       // Handle app state change
//     };
//       // Subscribe to app state changes
//     const subscription = AppState.addEventListener('change', handleAppStateChange);

//       // Cleanup function to unsubscribe from the event
//     return subscription.remove
//   }, []);

//   return <View>My Component</View>;
// };

// import { BackHandler } from 'react-native';

// const MyComponent = () => {
//   useEffect(() => {
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

//       // Cleanup function to remove the event listener
//     return backHandler.remove
//   }, []);

// const handleBackPress = () => {
//     // Handle back button press
//     return true; // Prevent default behavior
//   };

//    return <View>My Component</View>;
// };

///////////////////////////////

// import { useContext, useEffect, useMemo, useRef, useState } from 'react';
// import { View } from 'react-native';
// import { useIsFocused } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useClickOutside } from 'react-native-click-outside';
// import SelectLanguageBottomSheet from './../../../components/select-language';
// import { SingleTextHeader } from './header';
// import { SingleTextContent } from './content';
// import { AssetModal } from './text-modal';
// import { ScreenGradient } from '../../../components/screen-gradient';
// import { CommentCard } from '../../../components/comment-card';
// import { BuyBottom } from '../components/buy-button';
// import { VirtualizedList } from '../../../components/virtualized-list';
// import { RenderIf } from '../../../components/render-if';
// import { MetaDataType } from '../components/item-metadata';
// import { SingleItemFiles } from '../components/files';
// import { FocusedStatusBar } from '../../../components/focused-statusbar';
// import { ModalBottomSheet } from '../../../components/bottom-sheet-modal';
// import { RenderIfWithoutLoading } from '../../../components/render-if-without-loading';
// import { ReportModal } from '../components/report-modal';
// import { tokenContext } from '../../../context/token';
// import { userContext } from '../../../context/user';
// import { tokenStringResolver } from '../../../utils/token-string-resolver';
// import { ifUserIsOwner } from '../../../utils/if-user-is-owner';
// import { retriveToken } from '../../../utils/retrive-token';
// import {
//   convertTextToAudioHandler,
//   convertTextToImageHandler,
//   getTextDetailApiHandler,
//   translateTextApiHandler,
// } from '../service';
// import { ComponentNavigationProps } from '../../../types/component-navigation-props';
// import type { Text as TextType } from '../../../types/text';
// import {
//   ICON_SHARE_YOUTUBE,
//   ICON_SINGLE_CONVERT_TO_AUDIO,
//   ICON_SINGLE_CONVERT_TO_IMAGE,
//   ICON_SINGLE_EDIT,
//   ICON_SINGLE_TRANSLATE,
//   ICON_TEXT_TO_TEXT,
// } from '../../../constaints/icons';
// import { TEXT_THUMBNAIL_PLACEHOLDER } from '../../../constaints/images';
// import { EDIT_SCREEN, REDIRECTED_FROM_CREATE_ASSET } from '../../../constaints/consts';
// import { PaddingContainer } from '../../../styles/grid';
// import { Toolbar } from '../components/toolbar';
// import { YoutubeShare } from '../components/youtube-share';
// import { useYoutubeShareMutation } from '../../../services/asset.service';
// import { Toaster } from '../../../utils/toaster';
// import { TextToTextConvert } from '../components/text-to-text-convert';
// import { useConvertTextToTextMutation } from '../../../services/single-text.service';
// import { SingleAssetFooter } from '../components/footer';
// import { BackButtonRedirector } from '../utils/back-button-redirector';
// import { PROFILE } from '../../stack';

// const _toaster = new Toaster();
// const _textToTextConver = new TextToTextConvert();
// const _youtubeShare = new YoutubeShare();
// const _backButtonRedirector = new BackButtonRedirector();

// export function SingleTextScreen({ navigation, route }: ComponentNavigationProps) {
//   const { id, ORIGIN } = route.params;

//   const [data, setData] = useState<TextType>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isOwner, setIsOwner] = useState<boolean>(null);
//   const [token, setToken] = useState(null);
//   const [isSubscriber, setIsSubscriber] = useState<boolean>(null);

//   const [openReportModal, setOpenReportModal] = useState(false);
//   const [showTextModal, setShowTextModal] = useState(false);

//   const [currentUserId, setCurrentUserId] = useState<number>(null);

//   const [selectedLanguage, setSelectedLanguage] = useState('');

//   const isFocused = useIsFocused();
//   const selectLanguageRef = useRef(null);
//   const youtubeShareRef = useRef(null);

//   const textToTextRef = useRef(null);

//   const youtubeShareWrapperRef = useClickOutside<View>(() => {
//     youtubeShareRef?.current?.close();
//   });

//   const textToTextWrapperRef = useClickOutside<View>(() => {
//     textToTextRef?.current?.close();
//   });

//   const [
//     _shareYoutubeApiFunction,
//     { isLoading: isYoutubeShareLoading, isFetching: isYoutubeShareFetching },
//   ] = useYoutubeShareMutation();

//   const [
//     _convertTextToTextApiFunction,
//     { isLoading: _convertTextToTextIsLoading, isFetching: _convertTextToTextIsFetching },
//   ] = useConvertTextToTextMutation();

//   _youtubeShare.config({
//     modalRef: youtubeShareRef,
//     modalWrapperRef: youtubeShareWrapperRef,
//     token: token,
//     shareYoutubeApiFunction: _shareYoutubeApiFunction,
//     assetId: data?.asset_id,
//     isLoading: isYoutubeShareLoading || isYoutubeShareFetching,
//   });

//   _textToTextConver.config({
//     ref: textToTextRef,
//     innerRef: textToTextWrapperRef,
//     _apiFunction: _convertTextToTextApiFunction,
//     isLoading: _convertTextToTextIsLoading || _convertTextToTextIsFetching,
//     token,
//     assetId: data?.id,
//   });

//   const ref = useClickOutside<View>(() => {
//     setOpenReportModal(false);
//   });

//   const innerSelectLanguageBottomSheet = useClickOutside<View>(() => {
//     selectLanguageRef?.current.close();
//   });

//   const tokenCtx = useContext(tokenContext);
//   const userCtx = useContext(userContext);

//   useEffect(() => {
//     _backButtonRedirector.addListener(ORIGIN, navigation);

//     if (!isFocused) {
//       return _backButtonRedirector.cleanup(navigation);
//     }
//   }, []);

//   useEffect(() => {
//     getData();
//   }, [isFocused]);

//   useEffect(() => {
//     _translateTextHandler();
//   }, [selectedLanguage]);

//   const getData = async () => {
//     startLoad();

//     const token = await tokenCtx.getToken();

//     if (token === null) {
//       setIsLoading(false);
//       return;
//     }

//     const formattedToken = tokenStringResolver(token);
//     setToken(formattedToken);

//     await getSingleData(formattedToken);
//     setIsLoading(false);
//   };

//   const getSingleData = async (token: string) => {
//     const shouldSearchByAssetId = route.params?.saech__asset_id ? true : false;

//     const { isError, res } = await getTextDetailApiHandler(
//       token,
//       shouldSearchByAssetId,
//       route.params?.saech__asset_id ? route.params?.saech__asset_id : id,
//     );

//     if (isError) {
//       return;
//     }

//     const assetData = res.data;

//     const currentUserId = userCtx.getUser();

//     setCurrentUserId(currentUserId.id);

//     const isUserOwner = ifUserIsOwner(assetData?.asset?.user?.id, currentUserId.id);

//     setIsOwner(isUserOwner);

//     // User cant be subscriber if is owner
//     if (isUserOwner) {
//       setIsSubscriber(false);
//     }
//     if (!isUserOwner) {
//       const fileUrl = assetData?.asset?.file?.url;

//       // is user subscriber
//       if (fileUrl) {
//         setIsSubscriber(true);
//       } else {
//         setIsSubscriber(false);
//       }
//     }

//     setData(assetData);
//     stopLoad();
//   };

//   const _translateTextHandler = async () => {
//     if (!selectedLanguage) {
//       return;
//     }
//     const token = await retriveToken(tokenCtx);
//     if (!token) {
//       return;
//     }

//     const itemId = await data?.id;

//     const body: any = {
//       text: itemId,
//       target_language: selectedLanguage,
//       language: selectedLanguage,
//     };

//     const { isError, isSuccess } = await translateTextApiHandler(token, data?.id, body);

//     if (isSuccess) {
//       _toaster.show('Translate text requested successfully');
//     }
//     if (isError) {
//       _toaster.show('Translate text requested faliled');
//     }

//     selectLanguageRef?.current?.close();
//   };

//   const _showTextModalHandler = () => {
//     setShowTextModal(true);
//   };

//   const _hideTextModalHandler = () => {
//     setShowTextModal(false);
//   };

//   const _openReportModalHandler = () => {
//     setOpenReportModal(true);
//   };

//   const _closeReportModalHandler = () => {
//     setOpenReportModal(false);
//   };

//   const stopLoad = () => {
//     setIsLoading(false);
//   };

//   const startLoad = () => {
//     setIsLoading(true);
//   };

//   const goBackHandler = () => {
//     if (ORIGIN && ORIGIN === REDIRECTED_FROM_CREATE_ASSET) {
//       navigation.navigate(PROFILE);
//       return;
//     }
//     navigation.goBack();
//   };

//   const thumnailImageUri = data?.asset?.thumbnails['852x480'] || TEXT_THUMBNAIL_PLACEHOLDER;

//   const price: number = data?.asset?.price || null;
//   const assetUser = data?.asset?.user;

//   const _convertTextToImageHandler = async () => {
//     const token = await retriveToken(tokenCtx);
//     if (!token) {
//       return;
//     }

//     const itemId = await data?.id;

//     const body: any = {
//       text: itemId,
//       size: '512x512',
//     };

//     const { isError, isSuccess } = await convertTextToImageHandler(token, data?.id, body);

//     if (isSuccess) {
//       _toaster.show('Convert text to image requested successfully');
//     }
//     if (isError) {
//       _toaster.show('Convert text to image requested faliled');
//     }
//   };

//   const _convertTextToAudioHandler = async () => {
//     const token = await retriveToken(tokenCtx);
//     if (!token) {
//       return;
//     }

//     const itemId = await data?.id;

//     const body: any = {
//       text: itemId,
//       language: 'en',
//     };

//     const { isError, isSuccess } = await convertTextToAudioHandler(token, data?.id, body);

//     if (isSuccess) {
//       _toaster.show('Convert text to audio requested successfully');
//     }
//     if (isError) {
//       _toaster.show('Convert text to audio requested faliled');
//     }
//   };

//   const openAddCardAlertHandler = () => {
//     selectLanguageRef.current?.open();
//   };

//   const isLoadedAndDataExists = !isLoading && data?.id ? true : false;

//   const fileUrl = data?.asset?.file?.url;

//   const hasAssetFile = isLoadedAndDataExists && data?.asset?.file ? true : false;

//   const shouldShowTextModal = fileUrl && showTextModal ? true : false;

//   const metaDataList: MetaDataType[] =
//     [
//       {
//         id: 1,
//         key: 'Suffix',
//         value: 'TXT',
//       },
//       {
//         id: 2,
//         key: 'Type',
//         value: 'text',
//       },
//     ] || [];

//   const navigateToEditScreen = () => {
//     navigation.navigate(EDIT_SCREEN, {
//       id: data?.id,
//       assetType: 'text',
//     });
//   };

//   const shareToYoutubeHandler = () => {
//     _youtubeShare.openModal();
//   };

//   const openTextToTextConvertModal = () => {
//     _textToTextConver.openModal();
//   };

//   const isDisableEditIcon = data?.asset?.user?.id === currentUserId ? false : true;

//   const hasEditPermission = data?.asset?.forkability_status === 2 ? true : false;

//   const TOOLBAR_OPTIONS = [
//     {
//       id: 6,
//       func: openTextToTextConvertModal,
//       icon: <ICON_TEXT_TO_TEXT width={24} height={24} />,
//       isDisable: !hasEditPermission,
//     },
//     {
//       id: 5,
//       func: shareToYoutubeHandler,
//       icon: <ICON_SHARE_YOUTUBE width={24} height={24} />,
//       isDisable: isOwner ? false : true,
//     },
//     {
//       id: 1,
//       func: _convertTextToImageHandler,
//       icon: <ICON_SINGLE_CONVERT_TO_IMAGE width={24} height={24} />,
//       isDisable: !hasEditPermission,
//     },
//     {
//       id: 2,
//       func: openAddCardAlertHandler,
//       icon: <ICON_SINGLE_TRANSLATE width={24} height={24} />,
//       isDisable: !hasEditPermission,
//     },
//     {
//       id: 3,
//       func: _convertTextToAudioHandler,
//       icon: <ICON_SINGLE_CONVERT_TO_AUDIO width={24} height={24} />,
//       isDisable: !hasEditPermission,
//     },
//     {
//       id: 4,
//       func: navigateToEditScreen,
//       icon: <ICON_SINGLE_EDIT width={24} height={24} />,
//       isDisable: isDisableEditIcon,
//     },
//   ];

//   const textFiles = data?.asset?.file
//     ? [
//         {
//           id: 1,
//           chapterName: data?.asset?.file.details?.name,
//           duration: '',
//         },
//       ]
//     : null;

//   const snapPoints = useMemo(() => ['25%', '50%'], []);

//   const youtubeShareTemplate = _youtubeShare.template();
//   const textToTextTranslateTemplate = _textToTextConver.template();
//   const accountId: number = userCtx.getUser().id;

//   return (
//     <>
//       <SafeAreaView style={{ flex: 1 }}>
//         <FocusedStatusBar />
//         <ScreenGradient>
//           <VirtualizedList>
//             <RenderIf condition={isLoading}>
//               <RenderIfWithoutLoading condition={isLoadedAndDataExists}>
//                 <SingleTextHeader
//                   goBackHandler={goBackHandler}
//                   thumnailImageUri={thumnailImageUri}
//                   contentName={data?.name || ''}
//                   isOwner={isOwner}
//                   asset_username={assetUser?.username || ''}
//                   user_image_url={assetUser?.image_url || ''}
//                   openReportModalHandler={_openReportModalHandler}
//                   toolbar_options={TOOLBAR_OPTIONS}
//                   hasPermission={isOwner || isSubscriber}
//                 />
//                 <RenderIfWithoutLoading condition={isOwner || isSubscriber}>
//                   <PaddingContainer>
//                     <Toolbar toolbarList={TOOLBAR_OPTIONS} />
//                   </PaddingContainer>
//                 </RenderIfWithoutLoading>
//                 <SingleTextContent
//                   description={data?.description}
//                   metaDataList={metaDataList}
//                   showTextModalHandler={_showTextModalHandler}
//                   isOwner={isOwner}
//                   isSubscriber={isSubscriber}
//                 />
//                 <RenderIfWithoutLoading condition={hasAssetFile}>
//                   <SingleItemFiles data={textFiles} />
//                 </RenderIfWithoutLoading>
//                 <CommentCard assetId={data?.id} />
//               </RenderIfWithoutLoading>
//             </RenderIf>
//           </VirtualizedList>
//           <RenderIfWithoutLoading condition={isLoadedAndDataExists}>
//             <BuyBottom
//               isLoading={isLoading}
//               price={price}
//               thumbnail={thumnailImageUri}
//               title={data?.name || ''}
//               assetId={data?.asset_id || data?.id}
//               isSubscriber={isSubscriber}
//               isOwner={isOwner}
//             />
//           </RenderIfWithoutLoading>
//           <RenderIfWithoutLoading condition={isOwner}>
//             <SingleAssetFooter
//               fileName={data?.name}
//               editorHandler={navigateToEditScreen}
//               asset_Id={data?.asset_id}
//               parent_Id={accountId}
//               tokenCtx={tokenCtx}
//               token={token}
//             />
//           </RenderIfWithoutLoading>
//           <RenderIfWithoutLoading condition={shouldShowTextModal}>
//             <AssetModal
//               hideTextModalHandler={_hideTextModalHandler}
//               fileUrl={fileUrl}
//               title={data?.name || ''}
//             />
//           </RenderIfWithoutLoading>
//           {data?.asset_id && openReportModal ? (
//             <View
//               ref={ref}
//               style={{
//                 position: 'absolute',
//                 zIndex: 40000,
//                 top: 200,
//                 right: 20,
//                 backgroundColor: '#0f172cab',
//                 width: 250,
//                 height: 250,
//               }}
//             >
//               <ReportModal
//                 assetId={data?.asset_id}
//                 reportModalCloseHandler={_closeReportModalHandler}
//               />
//             </View>
//           ) : null}
//         </ScreenGradient>
//       </SafeAreaView>
//       <ModalBottomSheet ref={selectLanguageRef} snapPoints={snapPoints}>
//         <View
//           ref={innerSelectLanguageBottomSheet}
//           style={{
//             marginBottom: 200,
//             flex: 1,
//             height: 1000,
//           }}
//         >
//           <SelectLanguageBottomSheet
//             isFocused={isFocused}
//             setSelectedLanguage={setSelectedLanguage}
//           />
//         </View>
//       </ModalBottomSheet>
//       {youtubeShareTemplate}
//       {textToTextTranslateTemplate}
//     </>
//   );
// }
