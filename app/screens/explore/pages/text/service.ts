import { ApiHandler } from "../../../../utils/api-handler";

const _api = new ApiHandler();

export async function getTextDataApiHandler(url: string, token: string) {

  const config = {
    headers: { Authorization: `Bearer ${token}`, "X-App": "_Android" },
  };

  return await _api.get(url, config);
}
