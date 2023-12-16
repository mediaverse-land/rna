import { ApiHandler } from '../../utils/api-handler';

const _api = new ApiHandler();

export const getViewAllDataApiHandler = async (url: string, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}`, 'X-App': '_Android' },
  };

  return _api.get(url, config);
};
