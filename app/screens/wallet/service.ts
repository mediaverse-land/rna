import { ApiHandler } from '../../utils/api-handler';

const _api = new ApiHandler();

export const getWalletsApiHandler = async (token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}`, 'X-App': '_Android' },
  };

  const url = '/wallets';

  return _api.get(url, config);
};

export const getHistoryApiHandler = async (token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}`, 'X-App': '_Android' },
  };

  const url = '/transactions';

  return _api.get(url, config);
};
