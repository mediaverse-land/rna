import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Box } from '../../components/box';
import { SearchObjectProperty } from './navigator';
import { SearchParam } from '.';
import { useSearchMutation } from '../../services/asset.service';
import { tokenContext } from '../../context/token';
import { retriveToken } from '../../utils/retrive-token';
import { getUrl } from './utils';
import { addTypeToAsset } from '../../utils/add-type-to-assets';
import { Asset } from '../../types/asset';
import { List } from './components/list';
import { ActivityIndicator } from 'react-native';

type Props = {
  searchObject: SearchObjectProperty;
  searchParams: SearchParam;
};

export const SearchResult: FC<Props> = ({ searchObject, searchParams }) => {
  const { name, plan, tag, type } = searchParams;

  const [searchHandler, { isLoading, isFetching }] = useSearchMutation();

  const [page, setPage] = useState(1);
  const [assetList, setAssetsList] = useState<Asset[]>([]);
  const [hasMoreItem, setHasMoreItem] = useState(true);

  const tokenCtx = useContext(tokenContext);

  const searchObjectType: any = searchObject?.type;

  useEffect(() => {
    applySearh();
  }, [name, plan, tag, type, page, searchObjectType]);

  useEffect(() => {
    setPage(1);
    setAssetsList([]);
  }, [name, plan, tag, type, searchObjectType]);

  const applySearh = async () => {
    const url = await generateUrl();
    if (url === '/search?&page=1') {
      return;
    }

    const token = await getToken();

    const requestBody = {
      url,
      token,
    };

    await callApi(requestBody);
  };

  const callApi = async (requestBody: Record<string, string>) => {
    const response = await searchHandler(requestBody);

    if (response?.data) {
      await formatInputData(response?.data);
    }
  };

  const generateUrl = async () => {
    return await getUrl({ searchObjectType, page, plan, tag, name });
  };

  const getToken = useCallback(async () => {
    return await retriveToken(tokenCtx);
  }, []);

  const formatInputData = (inputData: any) => {
    const { videos, texts, audios, images } = inputData;

    if (!videos?.length && !texts?.length && !audios?.length && !images?.length) {
      setHasMoreItem(false);
      return;
    }

    const formattedVideos = addTypeToAsset(videos, 4);
    const formattedImages = addTypeToAsset(images, 2);
    const formattedTexts = addTypeToAsset(texts, 1);
    const formattedAudios = addTypeToAsset(audios, 3);

    let concatedData: any = [];

    if (formattedVideos?.length) {
      concatedData = [...concatedData, ...formattedVideos];
    }
    if (formattedImages?.length) {
      concatedData = [...concatedData, ...formattedImages];
    }
    if (formattedTexts?.length) {
      concatedData = [...concatedData, ...formattedTexts];
    }
    if (formattedAudios?.length) {
      concatedData = [...concatedData, ...formattedAudios];
    }

    setAssetsList((prev) => [...prev, ...concatedData]);
  };

  const onEndReached = async () => {
    if (isFetching || isLoading) {
      return;
    }

    if (!hasMoreItem) {
      return;
    }
    setPage((prev) => prev + 1);
  };

  return (
    <Box flex={1} marginTop={120} paddingLeft={24} paddingRight={24}>
      <List data={assetList} onEndReached={onEndReached} isLoading={isLoading || isFetching} />
      {isLoading || isFetching ? (
        <Box height={50}>
          <ActivityIndicator color="#666680" />
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};
