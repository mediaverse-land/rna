import { memo, useCallback, useEffect, useState } from 'react';
import { Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box } from '../box';
import { UseNavigationType } from '../../types/use-navigation';
import {
  // BANNER_ITEM_GRADIENT_IMAGE,
  IMAGE_THUMBNAIL_PLACEHOLDER,
} from '../../constaints/images';
import { windowSize } from '../../utils/window-size';
// import { Text } from "../text";
import { Text } from '../../types/text';

type Props = {
  data: any;
  disableOnIntractions?: boolean;
};

const { width: WINDOW_WIDTH } = windowSize();

const ROW_WIDTH = WINDOW_WIDTH - 48;

function Masonry({ data, disableOnIntractions = false }: Props) {
  const [chunkedList, setChunkedList] = useState<Image[]>([]);

  let direction: 'row' | 'row-reverse' = 'row';

  const navigation = useNavigation<UseNavigationType>();

  useEffect(() => {
    sortMasonryData();
  }, [data]);

  const sortMasonryData = () => {
    const newChunk = chunkData(data);
    setChunkedList(newChunk);
  };

  const chunkData = useCallback(
    (__data: Image[]) =>
      __data.reduce((all: any, one: any, i: number) => {
        const chunk = Math.floor(i / 6);
        all[chunk] = [].concat(all[chunk] || [], one);
        return all;
      }, []),
    [data],
  );

  const navigateRedirectHandler = (
    name: string,
    id: number,
    asset_username: string,
    asset_user_image_url: string,
  ) => {
    if (disableOnIntractions) {
      return;
    }
    navigation.navigate('SingleImageScreen', {
      id,
      name,
      isOwner: false,
      asset_username,
      asset_user_image_url,
    });
  };

  const _key = () => Math.random().toString();

  const RenderItem = ({ row }: { row: any }) => {
    direction = direction === 'row' ? 'row-reverse' : 'row';

    const firstRow: Record<string, Text> = {
      bigImage: row?.[0],
      topImage: row?.[1],
      bottomImage: row?.[2],
    };

    const secRows: Text[] = [row?.[3], row?.[4], row?.[5]];

    return (
      <Box width={ROW_WIDTH} height={ROW_WIDTH} marginBottom={8}>
        <Box
          id="top"
          width="100%"
          direction={direction}
          justifyContent="space-between"
          height={'66%'}
          position="relative"
          right={direction === 'row-reverse' ? -8 : 0}
          additionalStyles={{
            gap: 8,
          }}
        >
          <Box width={ROW_WIDTH / 1.48} height="100%">
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                navigateRedirectHandler(
                  firstRow?.bigImage.name,
                  firstRow?.bigImage.id,
                  firstRow?.bigImage?.asset?.user?.username,
                  firstRow?.bigImage?.asset?.user?.image_url,
                )
              }
            >
              <Image
                source={{
                  uri:
                    firstRow?.bigImage?.asset?.thumbnails?.['525x525'] ||
                    firstRow?.bigImage?.asset?.thumbnails['336x366'] ||
                    firstRow?.bigImage?.asset?.thumbnails['226x226'] ||
                    IMAGE_THUMBNAIL_PLACEHOLDER,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 8,
                }}
              />
            </TouchableOpacity>
          </Box>
          <Box width={ROW_WIDTH / 3 - 3} height="100%">
            <Box width="100%" marginBottom={8} height={ROW_WIDTH / 3 - 5}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigateRedirectHandler(
                    firstRow?.topImage.name,
                    firstRow?.topImage.id,
                    firstRow?.topImage?.asset?.user?.username,
                    firstRow?.topImage?.asset?.user?.image_url,
                  )
                }
              >
                <Image
                  source={{
                    uri:
                      firstRow?.topImage?.asset?.thumbnails?.['525x525'] ||
                      firstRow?.topImage?.asset?.thumbnails['336x366'] ||
                      firstRow?.topImage?.asset?.thumbnails['226x226'] ||
                      IMAGE_THUMBNAIL_PLACEHOLDER,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 8,
                  }}
                />
              </TouchableOpacity>
            </Box>
            <Box width="100%" height={ROW_WIDTH / 3 - 5}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigateRedirectHandler(
                    firstRow?.bottomImage.name,
                    firstRow?.bottomImage.id,
                    firstRow?.bottomImage?.asset?.user?.username,
                    firstRow?.bottomImage?.asset?.user?.image_url,
                  )
                }
              >
                <Image
                  source={{
                    uri:
                      firstRow?.bottomImage?.asset?.thumbnails?.['525x525'] ||
                      firstRow?.bottomImage?.asset?.thumbnails['336x366'] ||
                      firstRow?.bottomImage?.asset?.thumbnails['226x226'] ||
                      IMAGE_THUMBNAIL_PLACEHOLDER,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 8,
                  }}
                />
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
        <Box
          id="bottom"
          width="100%"
          marginTop={8}
          height={'33%'}
          additionalStyles={{
            gap: 8,
            flexWrap: 'nowrap',
          }}
          direction="row"
          // justifyContent="space-between"
        >
          {secRows?.map((_item: Text, index) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                navigateRedirectHandler(
                  _item.name,
                  _item.id,
                  _item?.asset?.user?.username,
                  _item?.asset?.user?.image_url,
                )
              }
              key={index}
            >
              <Image
                source={{
                  uri:
                    _item?.asset?.thumbnails?.['525x525'] ||
                    _item?.asset?.thumbnails['336x366'] ||
                    _item?.asset?.thumbnails['226x226'] ||
                    IMAGE_THUMBNAIL_PLACEHOLDER,
                }}
                style={{
                  width: ROW_WIDTH / 3 - 3,
                  height: ROW_WIDTH / 3 - 5,
                  borderRadius: 8,
                }}
              />
            </TouchableOpacity>
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Box width="100%" marginTop={24} flex={1}>
      <FlatList
        data={chunkedList}
        keyExtractor={_key}
        renderItem={(item: any) => {
          return <RenderItem row={item.item} />;
        }}
      />
    </Box>
  );
}

// function Masonry({ data, disableOnIntractions = false }: Props) {
//   const navigation = useNavigation<UseNavigationType>();

//   let direction: "row" | "row-reverse" = "row";
//   let wasRowReverse = false;
//   let wasPrevRowBig = false;

//   const chunkData = data.reduce((all: any, one: any, i: number) => {
//     const chunk = Math.floor(i / 3);
//     all[chunk] = [].concat(all[chunk] || [], one);
//     return all;
//   }, []);

//   const navigateRedirectHandler = (
//     name: string,
//     id: number,
//     asset_username: string,
//     asset_user_image_url: string
//   ) => {
//     if (disableOnIntractions) {
//       return;
//     }
//     navigation.navigate("SingleImageScreen", {
//       id,
//       name,
//       isOwner: false,
//       asset_username,
//       asset_user_image_url,
//     });
//   };

//   const renderMasonryList = chunkData.map((row: ImageType[]) => {
//     direction = direction === "row" ? "row-reverse" : "row";

//     const ndirection = row[0] && row[1] && row[2] ? "column" : "row";

//     wasPrevRowBig = !wasPrevRowBig;

//     if (wasPrevRowBig) {
//       wasRowReverse = !wasRowReverse;
//       return (
//         <Flex
//           justify="space-between"
//           direction={wasRowReverse ? "row" : "row-reverse"}
//         >
//           <Box direction={ndirection} marginBottom={8} width="32%">
//             {[row[0], row[1]].map(
//               (_oneInOneItem: ImageType, _oneInOneItemIndex: number) => {
//                 return (
//                   <>
//                     {_oneInOneItem ? (
//                       <TouchableOpacity
//                         key={_oneInOneItemIndex}
//                         activeOpacity={1}
//                         onPress={() =>
//                           navigateRedirectHandler(
//                             _oneInOneItem.name,
//                             _oneInOneItem.id,
//                             _oneInOneItem?.asset?.user?.username,
//                             _oneInOneItem?.asset?.user?.image_url
//                           )
//                         }
//                         style={{
//                           width: "100%",
//                         }}
//                       >
//                         <Image
//                           source={{
//                             uri:
//                               _oneInOneItem?.asset?.thumbnails["336x366"] ||
//                               _oneInOneItem?.asset?.thumbnails["226x226"] ||
//                               IMAGE_THUMBNAIL_PLACEHOLDER,
//                           }}
//                           style={[
//                             styles.oneInOneImageStyle,
//                             {
//                               width: "100%",
//                             },
//                             _oneInOneItemIndex / 2 === 0 && {
//                               marginBottom: 8,
//                             },
//                             ndirection === "row" &&
//                               _oneInOneItemIndex !== 0 && {
//                                 marginLeft: 8,
//                               },
//                           ]}
//                         />
//                       </TouchableOpacity>
//                     ) : null}
//                   </>
//                 );
//               }
//             )}
//           </Box>
//           {row[2] ? (
//             <Box width="65.9%">
//               <TouchableOpacity
//                 activeOpacity={1}
//                 onPress={() =>
//                   navigateRedirectHandler(
//                     row[2].name,
//                     row[2].id,
//                     row[2]?.asset?.user?.username,
//                     row[2]?.asset?.user?.image_url
//                   )
//                 }
//               >
//                 <Image
//                   source={{
//                     uri:
//                       row[2]?.asset?.thumbnails["336x366"] ||
//                       row[2]?.asset?.thumbnails["226x226"] ||
//                       IMAGE_THUMBNAIL_PLACEHOLDER,
//                   }}
//                   style={{
//                     width: "100%",
//                     height: 226,
//                     borderRadius: 8,
//                   }}
//                 />
//               </TouchableOpacity>
//             </Box>
//           ) : null}
//         </Flex>
//       );
//     } else {
//       return (
//         <MasonryRow key={row[0].id}>
//           <Box width="100%" marginBottom={8}>
//             <Flex
//               direction="row"
//               height="109px"
//               justify="space-between"
//               align="center"
//             >
//               {row.map((r: ImageType, index: number) => {
//                 return (
//                   <TouchableOpacity
//                     activeOpacity={1}
//                     style={[
//                       {
//                         width: "32%",
//                         height: 109,
//                         borderRadius: 8,
//                       },
//                     ]}
//                     onPress={() =>
//                       navigateRedirectHandler(
//                         r.name,
//                         r.id,
//                         r?.asset?.user?.username,
//                         r?.asset?.user?.image_url
//                       )
//                     }
//                   >
//                     <Image
//                       key={r.id}
//                       style={[
//                         {
//                           width: "100%",
//                           height: 109,
//                           borderRadius: 8,
//                         },
//                       ]}
//                       source={{
//                         uri:
//                           r?.asset?.thumbnails["336x366"] ||
//                           r?.asset?.thumbnails["226x226"] ||
//                           IMAGE_THUMBNAIL_PLACEHOLDER,
//                       }}
//                     />
//                   </TouchableOpacity>
//                 );
//               })}
//             </Flex>
//           </Box>
//         </MasonryRow>
//       );
//     }
//   });

//   return <MasonryWrapper>{renderMasonryList}</MasonryWrapper>;
// }

export default memo(Masonry);
