import { useDispatch, useSelector } from "react-redux";
import { Box } from "../../../../components/box";
import { Input } from "../../../../components/form";
import { Text } from "../../../../components/text";
import { theme } from "../../../../constaints/theme";
import { useKeyboard } from "../../../../hooks/use-keyboard";
import { PaddingContainer } from "../../../../styles/grid";
import { CreateAssetSelect } from "../../component/create-asset-select";
import { AppDispatch, RootState } from "../../../../store";
import {
  openForkabilityBottomSheet,
  openSelectPlanBottomSheet,
  setPrice,
  setSubscriptionPriod,
} from "../../../../slices/plus.slice";

export const SaveAndPublish = () => {
  const [keyboardHeight]: any = useKeyboard();

  const dispatch = useDispatch<AppDispatch>();

  const { forkabilityStatus, selectedPlan, price, subscriptionPriod } =
    useSelector((state: RootState) => state.plusSlice);

  const openSelectPlanBottomSheetHandler = () => {
    dispatch(openSelectPlanBottomSheet());
  };

  const openForkabilityBottomSheetHandler = () => {
    dispatch(openForkabilityBottomSheet());
  };

  const forkAbilityPlaceholder =
    forkabilityStatus === null
      ? "Choose forkability status"
      : forkabilityStatus === true
      ? "yes"
      : "no";

  const showPriceInput =
    selectedPlan === "Ownership" || selectedPlan === "Subscription";

  const showPeriodInput = selectedPlan === "Subscription";

  const updatePriceHandler = (_price: number) => {
    dispatch(setPrice(_price));
  };

  const updateSubscriptionPeriodHandler = (_price: number) => {
    dispatch(setSubscriptionPriod(_price));
  };

  return (
    <Box id="body" marginTop={49} paddingBottom={keyboardHeight}>
      <PaddingContainer>
        <Box width="100%">
          <Text color={theme.color.light.WHITE} fontSize={16} fontWeight={400}>
            Choose your plan
          </Text>
          <Box marginTop={16}>
            <CreateAssetSelect
              onPress={openSelectPlanBottomSheetHandler}
              title="Select your plan"
              selectedItem={selectedPlan}
            />
          </Box>
        </Box>
        <Box width="100%" marginTop={50}>
          <Text color={theme.color.light.WHITE} fontSize={16} fontWeight={400}>
            Choose forkability status
          </Text>
          <Box marginTop={16}>
            <CreateAssetSelect
              onPress={openForkabilityBottomSheetHandler}
              title="Select forkability status"
              selectedItem={forkAbilityPlaceholder}
            />
          </Box>
        </Box>
        {showPriceInput ? (
          <Box width="100%" marginTop={50}>
            <Text
              color={theme.color.light.WHITE}
              fontSize={16}
              fontWeight={400}
            >
              Price
            </Text>
            <Box marginTop={16}>
              <Input
                varient="flat-dark"
                placeholder="Insert price..."
                additionalProps={{
                  keyboardType: "numeric",
                }}
                onChangeText={updatePriceHandler}
                defaultValue={price}
              />
            </Box>
          </Box>
        ) : null}
        {showPeriodInput ? (
          <Box width="100%" marginTop={50}>
            <Text
              color={theme.color.light.WHITE}
              fontSize={16}
              fontWeight={400}
            >
              Subscription period
            </Text>
            <Box marginTop={16}>
              <Input
                varient="flat-dark"
                placeholder="Insert period..."
                additionalProps={{
                  keyboardType: "numeric",
                }}
                onChangeText={updateSubscriptionPeriodHandler}
                defaultValue={subscriptionPriod}
              />
            </Box>
          </Box>
        ) : null}
      </PaddingContainer>
    </Box>
  );
};
