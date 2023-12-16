import { ApiHandler } from '../../../../utils/api-handler';

const _api = new ApiHandler();

export const getSoundPageDatApiHandler = async () => {
  const url = '/audios';

  return await _api.get(url);
};

export const getSoundPageBestInMonthDatApiHandler = async () => {
  const url = '/audios/most-viwed';

  return await _api.get(url);
};
