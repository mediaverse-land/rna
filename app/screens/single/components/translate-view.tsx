import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { openSelectLanguageBottomSheet } from '../../../slices/single-asset.slice';
import { SoundComponents } from '../sound/components';
import { useTranslateAssetMutation } from '../../../services/asset.service';
import { useToken } from '../../../hooks/use-token';

export const TranalateView = () => {
  const { isTranalateViewOpen, type, assetId } = useSelector(
    (state: RootState) => state.singleAssetSlice,
  );

  if (!isTranalateViewOpen) {
    return null;
  }

  return <Wrapper type={type} assetId={assetId}/>;
};

const WrapperMemo = ({ type, assetId }: { type: Partial<1 | 2 | 3 | 4>; assetId: number }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedLanguage, setSelectedLanguage] = useState<string>(null);

  const [_translateApi, { isLoading, isFetching }] = useTranslateAssetMutation();
  const [token] = useToken();

  const onTranalateApiSubmitHandler = async () => {
    const requestURL = type === 3 ? '/translate/audio' : '/translate/text';

    const requestBody = {
      url: requestURL,
      body: {
        audio: assetId,
        language: selectedLanguage,
      },
      token
    };

    const response = await _translateApi(requestBody);
    console.log(response);
  };

  useEffect(() => {
    openSelectLanguageModalHandler();
  }, []);

  useEffect(() => {
    if (!selectedLanguage) {
      return;
    }
    onTranalateApiSubmitHandler();
  }, [selectedLanguage]);

  const openSelectLanguageModalHandler = () => {
    dispatch(openSelectLanguageBottomSheet());
  };

  return (
    <SoundComponents.SelectLanguageModal
      setSelectedLanguage={setSelectedLanguage}
      showLoading={isLoading || isFetching}
    />
  );
};

const Wrapper = memo(WrapperMemo);
