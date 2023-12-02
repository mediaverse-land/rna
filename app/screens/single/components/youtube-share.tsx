import React, { ReactNode } from "react";
import { View } from "react-native";
import { ModalBottomSheet } from "../../../components/bottom-sheet-modal";
import ExternalAccountBottomSheet from "../../../components/external-account-bottom-sheet";
import { ExternalAccount } from "../../../types/external-account";
import { Box } from "../../../components/box";
import { theme } from "../../../constaints/theme";
import { Text } from "../../../components/text";
import { Input } from "../../../components/form";
import { Toaster } from "../../../utils/toaster";
import { LoadingSpinner } from "../../../components/loader-spinner";

interface IYoutubeShare {
  closeModal: () => void;
  openModal: () => void;
  template: () => ReactNode;
  config: (...args: any) => void;
  addSelectedAccount: (
    _account: ExternalAccount,
    ___shareYoutubeApiFunction: any,
    assetId: number,
    time: string
  ) => void;
}

let title = "";
let description = "";
const _toaster = new Toaster();
export class YoutubeShare implements IYoutubeShare {
  _modalRef: any;
  _modalWrapperRef: any;
  _token: string;
  _assetId: number;
  _selectedAccount: ExternalAccount = null;
  _isLoading = false;
  _shareYoutubeApiFunction: ({ token, requestBody }: any) => void;

  private _snapPoints = ["45%", "50%"];

  config({
    modalRef,
    modalWrapperRef,
    token,
    shareYoutubeApiFunction,
    assetId,
    isLoading,
  }: any) {
    if (!token) {
      return;
    }
    this._token = token;
    this._modalRef = modalRef;
    this._modalWrapperRef = modalWrapperRef;
    this._shareYoutubeApiFunction = shareYoutubeApiFunction;
    this._assetId = assetId;
    this._isLoading = isLoading;
  }

  closeModal() {
    this._modalRef?.current?.close();
  }

  openModal() {
    this._modalRef?.current?.open();
  }

  async addSelectedAccount(
    _account: ExternalAccount,
    ___func: any,
    _assetId: number,
    time: string
  ) {
    this._selectedAccount = _account;
    const accountId = _account.id;

    await this.requestToShareAsset(accountId, ___func, _assetId, time);
  }

  async requestToShareAsset(
    _accountId: number,
    ___shareYoutubeApiFunction: any,
    _assetId: number,
    time: string
  ) {
    let requestBody: Record<string, any> = {
      account: _accountId,
      asset: _assetId,
      title,
      description,
      privacy: "private",
    };

    if (time) {
      requestBody["times"] = [time];
    }

    const result = await ___shareYoutubeApiFunction({
      token: this._token,
      body: requestBody,
    });



    if (result?.data) {
      this.closeModal();
      _toaster.show("Asset shared to youtube successfully");
    }
    if (result?.error) {
      this.closeModal();
      if (result?.error?.status === 403) {
        _toaster.show("Share to youtube failed, 403 youtube rate limmit error");
        return;
      }
      _toaster.show(
        "Share to youtube failed, try refresh your connected account to google"
      );
    }
  }

  getSelectedAccount() {
    return this._selectedAccount;
  }

  template() {
    const _headerElement = (
      <Box width="100%">
        <Text color={theme.color.light.WHITE} fontSize={16} fontWeight={600}>
          Fill share data
        </Text>
        <Box marginTop={24}>
          <Input
            labelText="Title"
            onChangeText={(text: string) => (title = text)}
          />
        </Box>
        <Box marginTop={8} marginBottom={32}>
          <Input
            labelText="Description"
            onChangeText={(text: string) => (description = text)}
          />
        </Box>
      </Box>
    );
    return (
      <ModalBottomSheet ref={this._modalRef} snapPoints={this._snapPoints}>
        <View
          ref={this._modalWrapperRef}
          style={{
            marginBottom: 200,
            flex: 1,
            height: 1000,
          }}
        >
          {this._isLoading ? (
            <LoadingSpinner />
          ) : (
            <ExternalAccountBottomSheet
              headerElement={_headerElement}
              token={this._token}
              setSelectedAccount={(e: any, time) => {
                this.addSelectedAccount(
                  e,
                  this._shareYoutubeApiFunction,
                  this._assetId,
                  time
                );
              }}
            />
          )}
        </View>
      </ModalBottomSheet>
    );
  }
}
