import React, { ReactNode } from "react";
import { View } from "react-native";
import { ModalBottomSheet } from "../../../components/bottom-sheet-modal";
import ExternalAccountBottomSheet from "../../../components/external-account-bottom-sheet";
import { ExternalAccount } from "../../../types/external-account";

interface IYoutubeShare {
  closeModal: () => void;
  openModal: () => void;
  template: () => ReactNode;
  config: (...args: any) => void;
  addSelectedAccount: (_account: ExternalAccount) => void;
}

export class YoutubeShare implements IYoutubeShare {
  _modalRef: any;
  _modalWrapperRef: any;
  _token: string;
  _assetId: number;
  _selectedAccount: ExternalAccount = null;
  _shareYoutubeApiFunction: ({ token, requestBody }: any) => void;

  private _snapPoints = ["25%", "50%"];

  config({
    modalRef,
    modalWrapperRef,
    token,
    shareYoutubeApiFunction,
    assetId,
  }: any) {
    if (!token) {
      return;
    }
    this._token = token;
    this._modalRef = modalRef;
    this._modalWrapperRef = modalWrapperRef;
    this._shareYoutubeApiFunction = shareYoutubeApiFunction;
    this._assetId = assetId;
  }

  closeModal() {
    this._modalRef?.current?.close();
  }

  openModal() {
    this._modalRef?.current?.open();
  }

  async addSelectedAccount(_account: ExternalAccount) {
    this._selectedAccount = _account;
    const accountId = _account.id;

    await this.requestToShareAsset(accountId);
  }

  async requestToShareAsset(_accountId: number) {
    const requestBody = {
      account: _accountId,
      asset: this._assetId,
    };
    const result = await this._shareYoutubeApiFunction({
      token: this._token,
      body: requestBody,
    });
  }

  getSelectedAccount() {
    return this._selectedAccount;
  }

  template() {
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
          <ExternalAccountBottomSheet
            token={this._token}
            setSelectedAccount={this.addSelectedAccount}
          />
        </View>
      </ModalBottomSheet>
    );
  }
}
