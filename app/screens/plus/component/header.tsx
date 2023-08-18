import { TouchableOpacity } from "react-native";
import { Box } from "../../../components/box";
import { PaddingContainer } from "../../../styles/grid";
import {
  ICON_ARROW_LEFT_WHITE,
  ICON_FOLDER_WHITE,
  ICON_SEARCH_WHITE,
} from "../../../constaints/icons";

type Props = {
  justBackButtonVisible: boolean;
  openWebViewHandler?: () => void;
  searchGalleryViewHandler?: () => void;
  goBackHandler?: () =>void
};

export const CreateContentHeader = ({
  justBackButtonVisible,
  openWebViewHandler,
  searchGalleryViewHandler,
  goBackHandler
}: Props) => {
  return (
    <PaddingContainer>
      <Box
        width="100%"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        position="absolute"
        zIndex={10000000000}
      >
        <TouchableOpacity  onPress={goBackHandler}>
          <Box
            id="go-back-button"
            width={72}
            height={40}
            backgroundColor="rgba(14, 14, 18, 0.5)"
            borderRadius={20}
            alignItems="center"
            justifyContent="center"
          >
            <ICON_ARROW_LEFT_WHITE />
          </Box>
        </TouchableOpacity>
        {!justBackButtonVisible ? (
          <Box direction="row" alignItems="center">
            <TouchableOpacity
              activeOpacity={1}
              onPress={searchGalleryViewHandler}
            >
              <Box
                id="search-in-local-folders"
                width={40}
                height={40}
                alignItems="center"
                justifyContent="center"
                backgroundColor="rgba(14, 14, 18, 0.5)"
                borderRadius={100}
              >
                <ICON_FOLDER_WHITE width={16} height={16} />
              </Box>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={openWebViewHandler}>
              <Box
                id="search-in-google"
                width={40}
                height={40}
                alignItems="center"
                justifyContent="center"
                backgroundColor="rgba(14, 14, 18, 0.5)"
                borderRadius={100}
                marginLeft={16}
              >
                <ICON_SEARCH_WHITE width={16} height={16} />
              </Box>
            </TouchableOpacity>
          </Box>
        ) : null}
      </Box>
    </PaddingContainer>
  );
};
