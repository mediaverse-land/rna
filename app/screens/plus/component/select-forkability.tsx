import { memo, useCallback, useMemo, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import { theme } from '../../../constaints/theme';
import { Box } from '../../../components/box';
import { AppDispatch, RootState } from '../../../store';
import { closeForkabilityBottomSheet, setForkability } from '../../../slices/plus.slice';
import { Text } from '../../../components/text';

const SelectForkabilityMemo = () => {
  const dispatch = useDispatch<AppDispatch>();

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const { isForkabilityBottomSheetOpen } = useSelector((state: RootState) => state.plusSlice);

  const bottomSheetRef = useRef(null);

  const closeBottomSheetHandler = () => {
    dispatch(closeForkabilityBottomSheet());
  };

  const _selectPlanHandler = (item: string) => {
    let status: boolean;

    if (item === 'yes') {
      status = true;
    } else {
      status = false;
    }
    dispatch(setForkability(status));
    dispatch(closeForkabilityBottomSheet());
  };

  const renderItem = useCallback(({ item }: { item: string }) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => _selectPlanHandler(item)}>
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
          <Text color="#ccc">{item}</Text>
        </Box>
      </TouchableOpacity>
    );
  }, []);

  return (
    <>
      {isForkabilityBottomSheetOpen ? (
        <BottomSheet
          snapPoints={snapPoints}
          ref={bottomSheetRef}
          onClose={closeBottomSheetHandler}
          enablePanDownToClose
          handleComponent={null}
          backgroundStyle={{
            backgroundColor: theme.color.light.ADD_ACCOUNT_MODAL_BAKGROUND,
          }}
        >
          <BottomSheetView>
            <Box width="100%" height={400}>
              <BottomSheetFlatList
                data={['yes', 'no']}
                keyExtractor={(item) => item}
                renderItem={renderItem}
                ListHeaderComponent={
                  <Box marginBottom={24}>
                    <Text color="#fff" fontWeight={400} fontSize={16} lineHeight={16}>
                      Choose forkability status
                    </Text>
                  </Box>
                }
                contentContainerStyle={{
                  paddingLeft: 24,
                  paddingRight: 24,
                  paddingTop: 16,
                }}
              />
            </Box>
          </BottomSheetView>
        </BottomSheet>
      ) : null}
    </>
  );
};

const SelectForkability = memo(SelectForkabilityMemo);
export default SelectForkability;
