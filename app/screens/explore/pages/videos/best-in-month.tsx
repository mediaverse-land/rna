import { View } from "react-native";
import { Title } from "../../../../components/title";
import { HorizontalSlider } from "../../../../components/horizontal-slider";
import { Asset } from "../../../../types/asset";
import { Box } from "../../../../components/box";
import { LoadingSpinner } from "../../../../components/loader-spinner";
import { Text } from "../../../../components/text";

type Props = {
  isLoading: boolean;
  data: Asset[];
  disableOnIntractions?: boolean;
};

export function VideoPageBestInMonth({
  isLoading,
  data,
  disableOnIntractions = false,
}: Props) {
  return (
    <Box paddingLeft={24}>
      <Box marginRight={32}>
        <Title str="Best in month" />
      </Box>
      <View style={{ marginTop: 24 }}>
        {isLoading ? (
          <Box
            width="100%"
            paddingRight={24}
            height={100}
            alignItems="center"
            justifyContent="center"
          >
            <LoadingSpinner color="red" />
          </Box>
        ) : data.length === 0 ? (
          <Box
            width="100%"
            alignItems="flex-start"
            justifyContent="center"
            paddingLeft={24}
          >
            <Text color="#fff">No item to show</Text>
          </Box>
        ) : (
          <HorizontalSlider
            disableOnIntractions={disableOnIntractions}
            data={data}
          />
        )}
      </View>
    </Box>
  );
}
