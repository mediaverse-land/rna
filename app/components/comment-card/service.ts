import { ApiHandler } from "../../utils/api-handler";

const _api = new ApiHandler();

export const getCommentApiHandler = async (token: string, assetId: number) => {
  const url = `/assets/${assetId}/comments`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-App": "_ReactNative",
    },
  };

  return await _api.get(url, config);
};

export const submitCommentApiHandler = async (token: string, body: any) => {
  const url = `/assets/comments`;

  const config = {
    headers: { Authorization: `Bearer ${token}`, "X-App": "_ReactNative" },
  };

  return await _api.post(url, body, config);
};
