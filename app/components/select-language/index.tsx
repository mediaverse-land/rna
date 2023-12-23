import React, {  useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useGetLanguagesQuery } from '../../services/language.service';
import { Box } from '../box';
import { theme } from '../../constaints/theme';
import { Text } from '../text';
import { LoadingSpinner } from '../loader-spinner';

const SelectLanguageBottom = ({
  setSelectedLanguage,
  isFocused,
  showTitle = true,
}: {
  setSelectedLanguage: (lang: string) => void;
  isFocused: boolean;
  showTitle?: boolean;
}) => {
  const { data, isFetching, refetch } = useGetLanguagesQuery();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const renderItem = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => setSelectedLanguage(item[0])}>
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
          <Text color="#ccc">{item[1]}</Text>
        </Box>
      </TouchableOpacity>
    );
  };

  const _key = (item: string) => item;

  const __data: any = data ? Object.keys(data).map((key) => [key, data[key]]) : [];

  return (
    <>
      {isFetching ? (
        <LoadingSpinner />
      ) : (
        <BottomSheetFlatList
          data={__data}
          keyExtractor={_key}
          renderItem={renderItem}
          ListHeaderComponent={
            <>
              {showTitle ? (
                <Box marginBottom={24}>
                  <Text color="#fff" fontWeight={400} fontSize={16} lineHeight={16}>
                    Select a language
                  </Text>
                </Box>
              ) : null}
            </>
          }
          contentContainerStyle={{
            // paddingLeft: 24,
            // paddingRight: 24,
            // paddingTop: 16,
            paddingBottom: 200,
          }}
        />
      )}
    </>
  );
};

export default SelectLanguageBottom;
