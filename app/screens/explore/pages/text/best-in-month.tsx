import { useNavigation } from "@react-navigation/native";
import { Title } from "../../../../components/title";
import { Box } from "../../../../components/box";
import { Text } from "../../../../types/text";
import { TextSlider } from "../../../../components/text-slider";
import { UseNavigationType } from "../../../../types/use-navigation";

type Props = {
  data: Text[];
};

export function SoundsPageBestInMonth({ data }: Props) {
  const navigation = useNavigation<UseNavigationType>();

  return (
    <Box flex={1} paddingLeft={24}>
      <Box marginRight={32} >
        <Title str="Best in month" />
      </Box>
      <TextSlider data={data} isLoading={false} navigation={navigation} />
    </Box>
  );
}
