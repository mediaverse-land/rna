import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SingleTextComponents } from './index';
import { AppDispatch, RootState } from '../../../../store';
import {
  closeConvertTextToAudioView,
  closeSelectLanguageBottomSheet,
  closeToolbarHandler,
  openSelectLanguageBottomSheet,
} from '../../../../slices/single-text.slice';
import { useConvertTextToAudioMutation } from '../../../../services/single-text.service';

export const ConvertTextToAudioModal = () => {
  const { isConvertTextToAudioViewOpen, token, id } = useSelector(
    (state: RootState) => state.singleAssetSlice,
  );

  if (!isConvertTextToAudioViewOpen) {
    return <></>;
  }

  return <Wrapper token={token} assetId={id} />;
};

const Wrapper = ({ token, assetId }: { token: string; assetId: number }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(null);
  const dispatch = useDispatch<AppDispatch>();

  const [_requestConvertApi] = useConvertTextToAudioMutation();

  const openSelectLanguageBottomSheetHandler = () => {
    dispatch(openSelectLanguageBottomSheet());
  };

  const closeSelectLanguageBottomSheetHandler = () => {
    dispatch(closeSelectLanguageBottomSheet());
  };

  const closeConvertTextToAudioViewHandler = () => {
    dispatch(closeConvertTextToAudioView());
  };
  const toolbarCloserHandler = () => {
    dispatch(closeToolbarHandler());
  };

  useEffect(() => {
    setSelectedLanguage(null);
    openSelectLanguageBottomSheetHandler();
  }, []);

  useEffect(() => {
    toolbarCloserHandler();
    translateHandler();
  }, [selectedLanguage]);

  const onChangeCloserHandler = () => {
    closeSelectLanguageBottomSheetHandler();
    closeConvertTextToAudioViewHandler();
  };

  const translateHandler = async () => {
    if (!selectedLanguage) {
      return;
    }

    const requestBody: Record<string, string | number> = {
      text: assetId,
      language: selectedLanguage,
    };

    const response = await _requestConvertApi({ token, body: requestBody });
    console.log(response);
    onChangeCloserHandler();
  };

  return (
    <SingleTextComponents.SelectLanguageModal
      onModalChange={(index) => {
        if (index === -1) {
          onChangeCloserHandler();
        }
      }}
      setSelectedLanguage={setSelectedLanguage}
    />
  );
};
