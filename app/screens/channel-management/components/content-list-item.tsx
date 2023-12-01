import { TouchableOpacity } from "react-native";
import { windowSize } from "../../../utils/window-size";
import { Box } from "../../../components/box";
import { Image } from "react-native";
import { Text } from "../../../components/text";
import { theme } from "../../../constaints/theme";


const {width} = windowSize(); 
const ITEM_WIDTH = (width - 48 - 16) / 2;


export const ContentListItem = ({ item, setSelectedItemId, selectedItemId }: any) => {
    const thumbnail =
      item?.asset?.thumbnails?.["336x366"] ||
      item?.asset?.thumbnails?.["226x226"];
  
    const userData = item?.asset?.user;
 
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setSelectedItemId(item?.asset?.id)}
        style={{
          marginBottom: 32,
        }}
      >
        <Box width={ITEM_WIDTH} flex={1}>
          <Box
            position="relative"
            id="thumbnail_box"
            width={ITEM_WIDTH}
            height={ITEM_WIDTH}
          >
            <Image
              source={{ uri: thumbnail }}
              style={{
                width: ITEM_WIDTH,
                height: ITEM_WIDTH,
                borderRadius: 16,
                borderWidth: selectedItemId === item?.asset?.id ? 2 : 0,
                borderColor: selectedItemId === item?.asset?.id ? "blue" : "transparent",
              }}
            />
            <Box
              id="fade-bg"
              width={ITEM_WIDTH - 1}
              height={ITEM_WIDTH - 3}
              position="absolute"
              borderRadius={16}
              top={1}
              left={1}
              backgroundColor="#00000042"
            ></Box>
          </Box>
          <Box
            id="body"
            width={ITEM_WIDTH}
            paddingRight={8}
            paddingLeft={8}
            marginTop={16}
            height={50}
          >
            <Text color={theme.color.light.TEXT} fontWeight={400} fontSize={14}>
              {item?.name}
            </Text>
            <Box marginTop={8} direction="row" alignItems="center">
              {userData?.image_url ? (
                <Image
                  source={{
                    uri: userData?.image_url,
                  }}
                  style={{
                    width: 16,
                    height: 16,
                    marginRight: 8,
                  }}
                />
              ) : null}
              <Text color={theme.color.light.TEXT}>{userData?.username}</Text>
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  };