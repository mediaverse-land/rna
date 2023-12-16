import { memo, useCallback, useMemo, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import { theme } from '../../../constaints/theme';
import { Box } from '../../../components/box';
import { AppDispatch, RootState } from '../../../store';
import { closeSelectPlanBottomSheet, setSelectedPlan } from '../../../slices/plus.slice';
import { Text } from '../../../components/text';

const SelectPlanMemo = () => {
  const dispatch = useDispatch<AppDispatch>();

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const { isSelectPlanBottomSheetOpen } = useSelector((state: RootState) => state.plusSlice);

  const bottomSheetRef = useRef(null);

  const closeBottomSheetHandler = () => {
    dispatch(closeSelectPlanBottomSheet());
  };

  const _selectPlanHandler = (lang: string) => {
    dispatch(setSelectedPlan(lang));
    dispatch(closeSelectPlanBottomSheet());
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
      {isSelectPlanBottomSheetOpen ? (
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
                data={['Free', 'Ownership', 'Subscription']}
                keyExtractor={(item) => item}
                renderItem={renderItem}
                ListHeaderComponent={
                  <Box marginBottom={24}>
                    <Text color="#fff" fontWeight={400} fontSize={16} lineHeight={16}>
                      Choose a plan
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

const SelectPlan = memo(SelectPlanMemo);

export default SelectPlan;
