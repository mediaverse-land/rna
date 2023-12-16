import React, {  useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import {
  useGetCountriesQuery,
} from "../../services/language.service";
import { Box } from "../box";
import { theme } from "../../constaints/theme";
import { Text } from "../text";
import { LoadingSpinner } from "../loader-spinner";

const SelectCountryBottomSheet = ({
  setSelectedCountry,
  isFocused,
}: {
  setSelectedCountry: (lang: string) => void;
  isFocused: boolean;
}) => {
  const { data, isFetching, refetch } = useGetCountriesQuery({}, false);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setSelectedCountry(item.iso)}
      >
        <Box
          paddingLeft={8}
          paddingBottom={8}
          paddingTop={8}
          additionalStyles={{
            borderBottomWidth: 0.5,
            borderBottomColor: theme.color.light.TEXT,
          }}
          width="100%"
          direction="row"
        >
          <Text color="#ccc">{item.name}</Text>
        </Box>
      </TouchableOpacity>
    );
  };

  const _key = (item: any) => item.calling_code;

  return (
    <>
      {isFetching ? (
        <LoadingSpinner />
      ) : (
        <BottomSheetFlatList
          data={data}
          keyExtractor={_key}
          renderItem={renderItem}
          ListHeaderComponent={
            <Box marginBottom={24}>
              <Text color="#fff" fontWeight={400} fontSize={16} lineHeight={16}>
                Select a country
              </Text>
            </Box>
          }
          contentContainerStyle={{
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 16,
            paddingBottom: 800,
          }}
        />
      )}
    </>
  );
};

export default SelectCountryBottomSheet
