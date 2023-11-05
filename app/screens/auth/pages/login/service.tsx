import { ApiHandler } from "../../../../utils/api-handler";

const api = new ApiHandler();

export async function signinApiHandler(body: object) {
  const config = {
    headers: { "X-App": "_Android" },
  };

  return await api.post("/auth/sign-in", body, config);
}
