import { memo } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MasonryComponents } from "./style";
import { Flex } from "../../styles/grid";
import { Box } from "../box";
import { Asset } from "../../types/asset";
import { UseNavigationType } from "../../types/use-navigation";
import {
  BANNER_ITEM_GRADIENT_IMAGE,
  IMAGE_THUMBNAIL_PLACEHOLDER,
} from "../../constaints/images";
import type { Image as ImageType } from "./../../types/image";

type Props = {
  data: any;
  disableOnIntractions?: boolean;
};

const { MasonryWrapper, MasonryRow } = MasonryComponents;

const defaultThumb = BANNER_ITEM_GRADIENT_IMAGE;

function Masonry({ data, disableOnIntractions = false }: Props) {
  const navigation = useNavigation<UseNavigationType>();

  let direction: "row" | "row-reverse" = "row";
  let wasRowReverse = false;
  let wasPrevRowBig = false;

  const chunkData = data.reduce((all: any, one: any, i: number) => {
    const chunk = Math.floor(i / 3);
    all[chunk] = [].concat(all[chunk] || [], one);
    return all;
  }, []);

  const navigateRedirectHandler = (
    name: string,
    id: number,
    asset_username: string,
    asset_user_image_url: string
  ) => {
    if (disableOnIntractions) {
      return;
    }
    navigation.navigate("SingleImageScreen", {
      id,
      name,
      isOwner: false,
      asset_username,
      asset_user_image_url,
    });
  };

  const renderMasonryList = chunkData.map((row: ImageType[]) => {
    direction = direction === "row" ? "row-reverse" : "row";

    const ndirection = row[0] && row[1] && row[2] ? "column" : "row";

    wasPrevRowBig = !wasPrevRowBig;

    if (wasPrevRowBig) {
      wasRowReverse = !wasRowReverse;
      return (
        <Flex
          justify="space-between"
          direction={wasRowReverse ? "row" : "row-reverse"}
        >
          <Box direction={ndirection} marginBottom={8} width="32%">
            {[row[0], row[1]].map(
              (_oneInOneItem: ImageType, _oneInOneItemIndex: number) => {
                return (
                  <>
                    {_oneInOneItem ? (
                      <TouchableOpacity
                        key={_oneInOneItemIndex}
                        activeOpacity={1}
                        onPress={() =>
                          navigateRedirectHandler(
                            _oneInOneItem.name,
                            _oneInOneItem.id,
                            _oneInOneItem?.asset?.user?.username,
                            _oneInOneItem?.asset?.user?.image_url
                          )
                        }
                        style={{
                          width: "100%",
                        }}
                      >
                        <Image
                          source={{
                            uri:
                              _oneInOneItem?.asset?.thumbnails["336x366"] ||
                              _oneInOneItem?.asset?.thumbnails["226x226"] ||
                              IMAGE_THUMBNAIL_PLACEHOLDER,
                          }}
                          style={[
                            styles.oneInOneImageStyle,
                            {
                              width: "100%",
                            },
                            _oneInOneItemIndex / 2 === 0 && {
                              marginBottom: 8,
                            },
                            ndirection === "row" &&
                              _oneInOneItemIndex !== 0 && {
                                marginLeft: 8,
                              },
                          ]}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </>
                );
              }
            )}
          </Box>
          {row[2] ? (
            <Box width="65.9%">
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigateRedirectHandler(
                    row[2].name,
                    row[2].id,
                    row[2]?.asset?.user?.username,
                    row[2]?.asset?.user?.image_url
                  )
                }
              >
                <Image
                  source={{
                    uri:
                      row[2]?.asset?.thumbnails["336x366"] ||
                      row[2]?.asset?.thumbnails["226x226"] ||
                      IMAGE_THUMBNAIL_PLACEHOLDER,
                  }}
                  style={{
                    width: "100%",
                    height: 226,
                    borderRadius: 8,
                  }}
                />
              </TouchableOpacity>
            </Box>
          ) : null}
        </Flex>
      );
    } else {
      return (
        <MasonryRow key={row[0].id}>
          <Box width="100%" marginBottom={8}>
            <Flex
              direction="row"
              height="109px"
              justify="space-between"
              align="center"
            >
              {row.map((r: ImageType, index: number) => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={[
                      {
                        width: "32%",
                        height: 109,
                        borderRadius: 8,
                      },
                      // index !== 0 && {
                      //     marginLeft: 8
                      // }
                    ]}
                    onPress={() =>
                      navigateRedirectHandler(
                        r.name,
                        r.id,
                        r?.asset?.user?.username,
                        r?.asset?.user?.image_url
                      )
                    }
                  >
                    <Image
                      key={r.id}
                      style={[
                        {
                          width: "100%",
                          height: 109,
                          borderRadius: 8,
                        },
                      ]}
                      source={{
                        uri:
                          r?.asset?.thumbnails["336x366"] ||
                          r?.asset?.thumbnails["226x226"] ||
                          IMAGE_THUMBNAIL_PLACEHOLDER,
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </Flex>
          </Box>
        </MasonryRow>
      );
    }
  });

  return <MasonryWrapper>{renderMasonryList}</MasonryWrapper>;
}

export default memo(Masonry);

const styles = StyleSheet.create({
  oneInOneImageStyle: {
    width: "100%",
    height: 109,
    borderRadius: 8,
  },
});
