import React, { useCallback, useRef, useMemo, useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Box } from '../../../../components/box';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { ImageAlbum } from '../../../../types/image-album';
import { windowSize } from '../../../../utils/window-size';
import { Text } from '../../../../components/text';
import { ICON_ARROW_DOWN_SVG } from '../../../../constaints/icons';
import { GALLERY_MODAL_BG } from '../../../../constaints/images';

type Props = {
  openModal: boolean;
  setOpenModal: (cond: boolean) => void;
};

const dropDownList: any = [
  {
    id: 1,
    title: 'Gallery',
  },
  {
    id: 2,
    title: 'Camera',
  },
  {
    id: 3,
    title: 'Download',
    hasWhiteBorder: true,
  },
  {
    id: 4,
    title: 'Photos',
  },
  {
    id: 5,
    title: 'Videos',
  },
];

type Album = 'Camera' | 'Gallery' | 'Download' | 'Photos' | 'Videos';

export const ImagesModal = ({ openModal, setOpenModal }: Props) => {
  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  const [selectedAlbum, setSelectedAlbum] = useState<Album>('Camera');
  const [images, setImages] = useState<ImageAlbum[]>([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    getSelectedAlbumImages();
  }, [selectedAlbum]);

  const getSelectedAlbumImages = async () => {
    const albumId = await getSelectedAlbumId();
    if (!albumId) {
      return;
    }

    const album = await MediaLibrary.getAssetsAsync({
      album: albumId,
      mediaType: 'photo',
      first: 40,
      sortBy: ['creationTime'],
    });
    const { assets }: any = album;
    setImages(assets);
  };

  const getSelectedAlbumId = async () => {
    const result = await MediaLibrary.getAlbumAsync(selectedAlbum);
    return result?.id || null;
  };

  const snapPoints = useMemo(() => ['80%'], []);

  const handleClosePress = useCallback(() => {
    setOpenModal(false);
    sheetRef.current?.close();
  }, []);

  // render
  const renderItem = useCallback(
    ({ item }: { item: ImageAlbum }) => (
      <Box width={109} marginBottom={10} height={109}>
        <Image
          source={{ uri: item.uri }}
          style={{
            width: 109,
            height: 109,
            borderRadius: 8,
          }}
        />
      </Box>
    ),
    [],
  );

  const handleComponent = (
    <Box
      width="100%"
      paddingLeft={24}
      paddingRight={24}
      paddingTop={32}
      paddingBottom={16}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box id="dropdown">
        <TouchableOpacity onPress={() => setIsDropdownOpen(true)} activeOpacity={1}>
          <Box direction="row" alignItems="center" justifyContent="center">
            <Text color="#D9D9FF" lineHeight={16} fontSize={16} fontWeight={400}>
              {selectedAlbum}
            </Text>
            <Box marginLeft={8}>
              <ICON_ARROW_DOWN_SVG />
            </Box>
          </Box>
        </TouchableOpacity>
      </Box>
      <Box id="cancel-btn" height={48} justifyContent="center">
        <Text color="#83839C">Cancel</Text>
      </Box>
    </Box>
  );

  const _selectDropdown = (title: Album) => {
    setSelectedAlbum(title);
    setIsDropdownOpen(false);
  };

  const dropDown = (
    <Box
      position="absolute"
      top={80}
      left={24}
      width={143}
      zIndex={1000}
      backgroundColor="#0f172cab"
      borderRadius={16}
      paddingRight={16}
      paddingLeft={16}
      paddingTop={20}
      paddingBottom={20}
    >
      {/* <Image
        source={{uri: BLUR_BG}}
        style={{
          position:'absolute',
          top: 0,
          left: 0,
          zIndex:10,
          width: 143,
          height: 200,
          opacity: 0.9
        }} 
        blurRadius={2}
      /> */}
      {dropDownList.map((f: any) => (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            _selectDropdown(f.title);
          }}
          key={f.id}
        >
          <Text color="#fff" marginBottom={24} lineHeight={20} fontSize={16}>
            {f.title}
          </Text>
          {f?.hasWhiteBorder ? (
            <Box
              additionalStyles={{
                borderBottomWidth: 0.5,
                borderBottomColor: '#fff',
              }}
              marginBottom={24}
            ></Box>
          ) : null}
        </TouchableOpacity>
      ))}
    </Box>
  );

  return (
    <>
      {openModal ? (
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          onChange={() => {
            //
          }}
          backgroundStyle={{
            backgroundColor: 'transparent',
          }}
          handleComponent={null}
          backdropComponent={() => (
            <>
              <TouchableOpacity activeOpacity={1} onPress={() => handleClosePress()}>
                <Box
                  width="100%"
                  height={windowSize().height}
                  hasBlackBorder
                  position="absolute"
                  top={0}
                  left={0}
                ></Box>
              </TouchableOpacity>
            </>
          )}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <GALLERY_MODAL_BG
              width="101%"
              height="103%"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                // left: -4,
              }}
            />
            {handleComponent}
            {isDropdownOpen ? dropDown : null}
            {images.length ? (
              <BottomSheetFlatList
                style={{
                  backgroundColor: 'transparent',
                }}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  paddingLeft: 24,
                  paddingRight: 24,
                }}
                numColumns={3}
                data={images}
                keyExtractor={(i) => i.id}
                renderItem={renderItem}
                contentContainerStyle={styles.contentContainer}
              />
            ) : null}
          </View>
        </BottomSheet>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    // backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    // backgroundColor: "#eee",
  },
});
