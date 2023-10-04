import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Coachmark, CoachmarkComposer } from "react-native-coachmark";
import { Box } from "../../../components/box";
import { ScreenGradient } from "../../../components/screen-gradient";
import { VirtualizedList } from "../../../components/virtualized-list";
import { PaddingContainer } from "../../../styles/grid";
import { Title } from "../../../components/title";
import { Input, RadioButton } from "../../../components/form";
import { Button } from "../../../components/button";
import { useIsFocused } from "@react-navigation/native";
import { StorageService } from "../../../services/storage.service";
import { HAS_USER_SEEN_PLUS_CREATE_FORM_TOUR } from "../../../constaints/consts";

type Props = {
  formStructure: any;
  // createAssetRequest: (...args:any) => void;
  onSubmitHandler: (...args: any) => void;
  _getSelectedOption: (option: Record<string, boolean | string>) => void;
  isLoading: boolean;
};

const TOUR_GUIDES = {
  // Name
  60: "Specify the name of the digital asset",
  // Price
  61: "Announce its selling price",
  // Description
  62: "Explain about it",
  // Sales type
  63: "And at the end, determine the method of sale, whether your asset will be offered for free or will be sold as a subscription or ownership",
};

const _storageService = new StorageService();
const CoachmarkWrapper: any = Coachmark;

export const CreateAssetForm = ({
  formStructure,
  onSubmitHandler,
  isLoading,
  _getSelectedOption,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<
    Record<string, string | boolean>
  >({
    plan: "ownership",
    eligible_for_audio_extraction: true,
    eligible_for_image_extraction: true,
    eligible_for_video_extraction: true,
  });

  const isFocused = useIsFocused();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    resetField,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    _getSelectedOption(selectedOption);

    if (selectedOption.plan === "free") {
      setValue("price", 10);
    } else {
      resetField("price");
    }

    if (selectedOption.plan !== "subscription") {
      setValue("subscription_period", "__");
    } else {
      resetField("subscription_period");
    }
  }, [selectedOption]);

  const hasUserSeenTour = async () => {
    const res = await _storageService.get(HAS_USER_SEEN_PLUS_CREATE_FORM_TOUR);
    return res ? true : false;
  };

  const _userSeenTourHandler = async () => {
    await _storageService.set(
      HAS_USER_SEEN_PLUS_CREATE_FORM_TOUR,
      HAS_USER_SEEN_PLUS_CREATE_FORM_TOUR
    );
  };

  const onSubmit = async (data: any) => {
    await onSubmitHandler(data);
  };

  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const planRef = useRef();

  const setupTour = async () => {
    const hasSeen = await hasUserSeenTour();
    if (hasSeen) {
      return;
    }

    if (
      nameRef?.current &&
      priceRef?.current &&
      descriptionRef?.current &&
      planRef?.current
    ) {
      setTimeout(() => {
        const composer = new CoachmarkComposer([
          nameRef,
          priceRef,
          descriptionRef,
          planRef,
        ]);
        composer.show().then(async () => {
          await _userSeenTourHandler();
        });
      }, 3000);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setupTour();
    }
  }, [nameRef, priceRef, descriptionRef, planRef]);

  const getCurrentTour = (name: string) => {
    switch (name) {
      case "name":
        return {
          text: TOUR_GUIDES[60],
          ref: nameRef,
        };
      case "price":
        return {
          text: TOUR_GUIDES[61],
          ref: priceRef,
        };
      case "description":
        return {
          text: TOUR_GUIDES[62],
          ref: descriptionRef,
        };
    }
    return null;
  };

  const getSelectedOption = (option: string, name: string) => {
    setSelectedOption({ ...selectedOption, [name]: option });
  };

  return (
    <Box
      width="100%"
      height="100%"
      position="absolute"
      top={0}
      left={0}
      bottom={0}
      right={0}
      zIndex={10000}
    >
      <ScreenGradient>
        <VirtualizedList>
          <Box width="100%" flex={1} paddingBottom={100} paddingTop={100}>
            <PaddingContainer>
              <Title str="Fill data" />
              <Box marginTop={24}></Box>
              {formStructure.map((form: any) => (
                <Box key={form.id} marginBottom={16}>
                  {form.type === "radio-button" ? (
                    <CoachmarkWrapper
                      allowBackgroundInteractions={false}
                      ref={form.labelText === "Plan" ? planRef : null}
                      message="And at the end, determine the method of sale, whether your asset will be offered for free or will be sold as a subscription or ownership"
                    >
                      <Box position="relative">
                        <RadioButton
                          labelText={form.labelText}
                          dataList={form.options}
                          getSelectedOption={(option: any) =>
                            getSelectedOption(option, form.name)
                          }
                          defaultOption={form.defaultSelected}
                        />
                      </Box>
                    </CoachmarkWrapper>
                  ) : null}
                  {form.type === "input" || form.type === "textarea" ? (
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => {
                        // Get current input {text, ref} for indicating tour guide
                        const _currentTour = getCurrentTour(form.name);

                        if (selectedOption.plan === "free" && form.id === 2) {
                          return null;
                        }
                        if (
                          form.id === 7 &&
                          selectedOption.plan !== "subscription"
                        ) {
                          return null;
                        }

                        return (
                          <CoachmarkWrapper
                            allowBackgroundInteractions={false}
                            ref={_currentTour?.ref}
                            message={_currentTour?.text}
                          >
                            <Box position="relative" top={-14}>
                              <Input
                                placeholder={form.placeholder}
                                labelText={form.labelText}
                                hasError={errors?.[form.name] ? true : false}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                additionalProps={{
                                  inputMode: form.inputMode,
                                }}
                                isTextArea={
                                  form?.type === "textarea" ? true : false
                                }
                              />
                            </Box>
                          </CoachmarkWrapper>
                        );
                      }}
                      name={form.name}
                      rules={form.validators}
                    />
                  ) : null}
                </Box>
              ))}
            </PaddingContainer>
          </Box>
        </VirtualizedList>
        <Box
          width="100%"
          position="absolute"
          bottom={10}
          paddingLeft={24}
          paddingRight={24}
        >
          <Button
            onpressHandler={handleSubmit(onSubmit)}
            varient="primary"
            text="Submit asset"
            isLoading={isLoading}
          />
        </Box>
      </ScreenGradient>
    </Box>
  );
};
