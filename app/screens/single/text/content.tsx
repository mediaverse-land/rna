import { TouchableOpacity } from "react-native";
import { Box } from "../../../components/box";
import { PaddingContainer } from "../../../styles/grid";
import { SingleItemDescription } from "../components/description";
import { MetaDataType, SingleItemMetaData } from "../components/item-metadata";
import { FileType, SingleItemFiles } from "../components/files";
import { Text } from "../../../components/text";

type Props = {
  description: string;
  metaDataList: MetaDataType[];
  showTextModalHandler: () => void;
  isOwner: boolean;
  isSubscriber: boolean;
};

export function SingleTextContent({
  description,
  metaDataList,
  showTextModalHandler,
  isOwner,
  isSubscriber,
}: Props) {
  const hasPermission = isOwner || isSubscriber;

  return (
    <PaddingContainer>
      <Box position="relative" zIndex={20} width="100%" marginTop={32}>
        <SingleItemDescription description={description} />
        <TouchableOpacity activeOpacity={1} onPress={showTextModalHandler}>
          {hasPermission ? <Text color="#fff">more...</Text> : null}
        </TouchableOpacity>
        <Box marginTop={8}>
          <SingleItemMetaData data={metaDataList} />
        </Box>
      </Box>
    </PaddingContainer>
  );
}
