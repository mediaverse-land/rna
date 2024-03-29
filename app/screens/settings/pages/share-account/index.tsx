import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenGradient } from '../../../../components/screen-gradient';
// import { AddAccountModal } from './add-account-modal';

// const pageHeaderComponent = (
//     <Box marginBottom={48}>
//         <PaddingContainer>
//             <SettingsScreenTitle title="Share account" />
//         </PaddingContainer>
//     </Box>
// );

// const keyExtractor = (item: AccountType): string => item.id.toString();

export function ShareAccountPage() {
  // const [isOpen, setIsOpen] = useState(false);

  // const sheetRef = useRef<BottomSheet>(null);
  // const confirmAlertRef = useRef(null);

  // const snapPoints = ['42'];

  // const openModalHandler = () => {
  //     setIsOpen(true);
  //     sheetRef.current?.expand();
  // };

  // const closeModalHandler = () => {
  //     sheetRef.current?.close();
  //     setIsOpen(false);
  // };

  // const renderAccountItem = ({ item }: { item: AccountType }) => {
  //     return (
  //         <PaddingContainer>
  //             <Box
  //                 width="100%"
  //                 height={57}
  //                 marginBottom={8}
  //                 direction="row"
  //                 alignItems="center"
  //             >
  //                 <Image
  //                     source={{ uri: SIGNINS_LIST_ITEM_GRADIET }}
  //                     style={{
  //                         width: '100%',
  //                         height: 56,
  //                         position: 'absolute',
  //                         top: 0,
  //                         left: 0,
  //                         borderRadius: 16
  //                     }}
  //                 />
  //                 <Box
  //                     width="100%"
  //                     height={56}
  //                     paddingLeft={16}
  //                     paddingRight={16}
  //                     direction="row"
  //                     alignItems="center"
  //                     justifyContent="space-between"
  //                 >
  //                     <Box direction="row" alignItems="center">
  //                         <item.appIcon
  //                             style={{
  //                                 width: 18,
  //                                 height: 18
  //                             }}
  //                         />
  //                         <Text
  //                             color={theme.color.light.WHITE}
  //                             marginLeft={16}
  //                             fontSize={14}
  //                             fontWeight={theme.numericLineHeight.md}
  //                         >
  //                             {item.username}
  //                         </Text>
  //                     </Box>
  //                     <Box>
  //                         <TouchableOpacity
  //                             activeOpacity={1}
  //                             onPress={() => confirmAlertRef.current?.open()}
  //                         >
  //                             <ICON_TRASHBEEN
  //                                 style={{
  //                                     width: 16.22,
  //                                     height: 18
  //                                 }}
  //                             />
  //                         </TouchableOpacity>
  //                     </Box>
  //                 </Box>
  //             </Box>
  //         </PaddingContainer>
  //     );
  // };

  // const isFocused = useIsFocused();

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {/* {isFocused ? (
                    <StatusBar
                        backgroundColor={'#030340'}
                        barStyle="light-content"
                    />
                ) : null} */}
        <ScreenGradient>
          <></>
          {/* <Box width="100%">
                        <FlatList
                            ListHeaderComponent={pageHeaderComponent}
                            data={accounts}
                            renderItem={renderAccountItem}
                            keyExtractor={keyExtractor}
                        />
                    </Box>
                    <View
                        style={{
                            width: '100%',
                            height: 104,
                            position: 'absolute',
                            top: Math.floor(height) - 104
                        }}
                    >
                        <Box
                            width="100%"
                            height={104}
                            backgroundColor="transparent"
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Image
                                source={{ uri: ADD_ACCOUNT_BUTTON_GRADIENT }}
                                style={{
                                    width: '100%',
                                    height: 104,
                                    position: 'absolute',
                                    top: 0
                                }}
                            />
                            <Box
                                width="100%"
                                paddingRight={24}
                                paddingLeft={24}
                            >
                                <AddAccountButton
                                    activeOpacity={1}
                                    onPress={openModalHandler}
                                >
                                    <Text
                                        color={
                                            theme.color.light.LIGHT_DESCRIPTION
                                        }
                                        fontSize={14}
                                        fontWeight={600}
                                        marginRight={10}
                                        paddingBottom={2}
                                    >
                                        Add Account
                                    </Text>
                                    <ICON_ADD
                                        style={{
                                            width: 16,
                                            height: 16
                                        }}
                                    />
                                </AddAccountButton>
                            </Box>
                        </Box> */}
          {/* </View> */}
        </ScreenGradient>
      </SafeAreaView>

      {/* <ConfirmAlert ref={confirmAlertRef} />
            {isOpen ? (
                <AddAccountModal
                    sheetRef={sheetRef}
                    windowHeight={Math.floor(height)}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    snapPoints={snapPoints}
                    closeModalHandler={closeModalHandler}
                />
            ) : null} */}
    </>
  );
}
