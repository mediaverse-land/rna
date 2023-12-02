import { LegacyRef, ReactNode, RefObject } from "react";
import { ModalBottomSheet } from "../../../components/bottom-sheet-modal";
import { View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Box } from "../../../components/box";
import { Text } from "../../../components/text";
import { theme } from "../../../constaints/theme";
import { Input } from "../../../components/form";
import { Button } from "../../../components/button";
import { LoadingSpinner } from "../../../components/loader-spinner";
import { Toaster } from "../../../utils/toaster";

type BottomSheetModalCustomType = {
  open: () => void;
} & BottomSheetModal;

interface ITextToTextConvert {
  ref: RefObject<BottomSheetModalCustomType>;
  innerRef: any;
  isLoading: boolean;
  token: string;
  apiFunction: { token: string; body: any };

  // inputValue: string;
  config: (...args: any) => void;
  openModal: () => void;
  closeModal: () => void;
  template: () => ReactNode;
  submitHandler: (func: any) => void;
}

type Config = {
  ref: RefObject<BottomSheetModalCustomType>;
  innerRef: LegacyRef<View>;
  _apiFunction: () => void;
  isLoading: boolean;
  token: string;
  assetId: number;
};

const _toaster = new Toaster();

let inputValue = "";

export class TextToTextConvert implements ITextToTextConvert {
  private _snapPoints = ["30%", "70%"];
  ref: RefObject<BottomSheetModalCustomType>;
  innerRef: LegacyRef<View>;
  apiFunction: any;
  isLoading = false;
  token = "";
  assetId: number;

  config({ ref, innerRef, _apiFunction, isLoading, token, assetId }: Config) {
    this.ref = ref;
    this.innerRef = innerRef;
    this.apiFunction = _apiFunction;
    this.isLoading = isLoading;
    this.token = token;
    this.assetId = assetId;
  }

  openModal() {
    this.ref?.current?.open();
  }

  closeModal() {
    this?.ref?.current?.close();
  }

  async submitHandler(func: any) {
    const body = {
      text: this.assetId,
      prefix: `Write an article for following content: ${inputValue}`,
    };

    try {
      const result = await func({ token: this.token, body });
      if (result?.error) {
        _toaster.show("Convert text to text failed");
      }

      if (result?.data) {
        this.closeModal();
        _toaster.show("Text converted successfully");
      }
    } catch (err) {
      _toaster.show("Convert text to text failed");
    }
  }

  template() {
    if (!this.token) {
      return <></>;
    }
    return (
      <ModalBottomSheet ref={this.ref} snapPoints={this._snapPoints}>
        <View
          ref={this.innerRef}
          style={{
            marginBottom: 200,
            flex: 1,
            height: 1000,
          }}
        >
          {!this.isLoading ? (
            <Box width={"100%"} flex={1} paddingLeft={24} paddingRight={24}>
              <Text color={theme.color.light.WHITE} marginBottom={32}>
                Convert text to text
              </Text>
              <Input
                labelText="Prefix"
                onChangeText={(text: string) => {
                  inputValue = text;
                }}
              />
              <Button
                varient="primary"
                text="Submit"
                onpressHandler={() => this.submitHandler(this.apiFunction)}
                marginTop={32}
                borderRadius={8}
                size="lg"
              />
            </Box>
          ) : (
            <LoadingSpinner />
          )}
        </View>
      </ModalBottomSheet>
    );
  }
}
