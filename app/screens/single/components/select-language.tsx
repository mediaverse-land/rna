import React, { memo, useEffect, useMemo } from "react";
import { Box } from "../../../components/box";
import { Text } from "../../../components/text";
import { useGetLanguagesQuery } from "../../../services/language.service";
import { FlatList, TouchableOpacity } from "react-native";
import { VirtualizedList } from "../../../components/virtualized-list";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { LoadingSpinner } from "../../../components/loader-spinner";
import { theme } from "../../../constaints/theme";

const SelectLanguage = ({
  setSelectedLanguage,
  isFocused
}: {
  setSelectedLanguage: (lang: string) => void;
  isFocused: boolean
}) => {
  const { data, isFetching, refetch } =
    useGetLanguagesQuery();

    useEffect(() => {
      if(isFocused){
        refetch();
      }
    }, [isFocused])

  const renderItem = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setSelectedLanguage(item)}
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
          <Text color="#ccc">{data[item]}</Text>
        </Box>
      </TouchableOpacity>
    );
  };

  const _key = (item: string) => item;

  return (
    <>
      {isFetching ? (
        <LoadingSpinner />
      ) : (
        <BottomSheetFlatList
          // focusHook={useFocusEffect}
          data={Object.keys(data)}
          keyExtractor={_key}
          renderItem={renderItem}
          ListHeaderComponent={
            <Box marginBottom={24}>
              <Text color="#fff" fontWeight={400} fontSize={16} lineHeight={16}>
                Select a language
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

export default memo(SelectLanguage);
