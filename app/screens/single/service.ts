import { ApiHandler } from "../../utils/api-handler";

const _app = new ApiHandler();

export const getImageDetailApiHandler = async (
  token: string,
  shouldSearchByAssetId: boolean,
  id: number
) => {
  const url = shouldSearchByAssetId ? `/search/${id}` : `/images/${id}`;

  const config = {
    headers: { Authorization: `Bearer ${token}` ,"X-App": "_ReactNative",},
  };

  return await _app.get(url, config);
};

export const getVideoDetailApiHandler = async (
  token: string,
  shouldSearchByAssetId: boolean,
  id: number
) => {
  const url = shouldSearchByAssetId ? `/search/${id}` : `/videos/${id}`;

  const config = {
    headers: { Authorization: `Bearer ${token}`,"X-App": "_ReactNative", },
  };

  return await _app.get(url, config);
};

export const getTextDetailApiHandler = async (
  token: string,
  shouldSearchByAssetId: boolean,
  id: number
) => {
  const url = `/texts/${id}`;

  const config = {
    headers: { Authorization: `Bearer ${token}` ,"X-App": "_ReactNative",},
  };

  return await _app.get(url, config);
};

export const getSoundDetailApiHandler = async (
  token: string,
  shouldSearchByAssetId: boolean,
  id: number
) => {
  const url = shouldSearchByAssetId ? `/search/${id}` : `/audios/${id}`;

  const config = {
    headers: { Authorization: `Bearer ${token}`,"X-App": "_ReactNative", },
  };

  return await _app.get(url, config);
};

export const getFilesApiHandler = async (token: string, file_id: number) => {
  const url = `/assets/files/${file_id}`;

  const config = {
    headers: { Authorization: `Bearer ${token}`,"X-App": "_ReactNative", },
  };

  return await _app.get(url, config);
};

export const getLiveDataApiHandler = async (token: string, id: number) => {
  const url = `/lives/${id}`;

  const config = {
    headers: { Authorization: `Bearer ${token}`,"X-App": "_ReactNative", },
  };

  return await _app.get(url, config);
};

export const getTextFileApiHandler = async (url: string) => {
  return await _app.get(url, null, true);
};

export const reportAssetApiHandler = async (
  token: string,
  assetId: number,
  reportCategoryId: number
) => {
  const url = "/reports";

  const data = {
    type: reportCategoryId,
    asset_id: assetId,
    description: "",
  };

  const config = {
    headers: { Authorization: `Bearer ${token}`,"X-App": "_ReactNative", },
  };

  return await _app.post(url, data, config);
};

export const convertVideoToSoundHandler = async (token: string, id: number) => {
  const url = `/convert/video-audio`;

  const body = {
    video: id,
    start: 0,
    length: 0,
  };

  const config = {
    headers: { Authorization: `Bearer ${token}`,"X-App": "_ReactNative", },
  };

  return await _app.post(url, body, config);
};

export const recordVideoHandler = async (token: string, id: number) => {
  const url = `/convert/texts/${id}/image`;

  const config = {
    headers: { Authorization: `Bearer ${token}`,"X-App": "_ReactNative", },
  };

  return await _app.post(url, {}, config);
};

export const convertTextToImageHandler = async (
  token: string,
  id: number,
  body: any
) => {
  const url = `/convert/text-image`;

  const config = {
    headers: { Authorization: `Bearer ${token}` ,"X-App": "_ReactNative",},
  };

  return await _app.post(url, body, config);
};

export const convertTextToAudioHandler = async (
  token: string,
  id: number,
  body: any
) => {
  const url = `/convert/text-audio`;

  const config = {
    headers: { Authorization: `Bearer ${token}` ,"X-App": "_ReactNative",},
  };

  return await _app.post(url, body, config);
};

export const translateTextApiHandler = async (
  token: string,
  id: number,
  body: any
) => {
  const url = `/translate/text`;

  const config = {
    headers: { Authorization: `Bearer ${token}`,"X-App": "_ReactNative", },
  };

  return await _app.post(url, body, config);
};


export const convertAudioToImageHandler = async (
  token: string,
  id: number,
  body: any
) => {
  const url = `/convert/audio-text`;

  const config = {
    headers: { Authorization: `Bearer ${token}`,"X-App": "_ReactNative", },
  };

  return await _app.post(url, body, config);
};

export const translateAudioHandler = async (
  token: string,
  id: number,
  body: any
) => {
  const url = `/translate/audio`;

  const config = {
    headers: { Authorization: `Bearer ${token}`,"X-App": "_ReactNative", },
  };

  return await _app.post(url, body, config);
};
