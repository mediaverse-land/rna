import { ApiHandler } from '../../utils/api-handler';

const _app = new ApiHandler();

const urls = {
  image: '/images',
  video: '/videos',
  text: '/texts',
  sound: '/audios',
};

export const getAssetApiHandler = async (
  token: string,
  id: number,
  assetType: 'image' | 'video' | 'sound' | 'text',
) => {
  const url = urls[assetType] + `/${id}`;

  const config = {
    headers: { Authorization: `Bearer ${token}`, 'X-App': '_Android' },
  };

  return await _app.get(url, config);
};

export const updateAssetApiHandler = async (
  token: string,
  id: number,
  assetType: 'image' | 'video' | 'sound' | 'text',
  data: any,
) => {
  const url = urls[assetType] + `/${id}`;

  const config = {
    headers: { Authorization: `Bearer ${token}`, 'X-App': '_Android' },
  };

  return await _app.put(url, data, config);
};
