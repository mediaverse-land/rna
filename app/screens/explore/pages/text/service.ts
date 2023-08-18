import { ApiHandler } from "../../../../utils/api-handler";

const _api = new ApiHandler();

export async function getTextDataApiHandler(token: string) {
  const url = `/texts/newest`;

  const config = {
    headers: { Authorization: `Bearer ${token}`, "X-App": "_ReactNative" },
  };

  return await _api.get(url, config);
}
