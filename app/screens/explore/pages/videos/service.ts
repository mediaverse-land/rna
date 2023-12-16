import { ApiHandler } from '../../../../utils/api-handler';

const _api = new ApiHandler();

export const getVideosPageDatApiHandler = async () => {
  const url = '/videos';

  return await _api.get(url);
};
