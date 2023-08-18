import { tokenStringResolver } from "./token-string-resolver";

export const retriveToken = async (tokenCtx: any) => {
  const token = await tokenCtx.getToken();

  if (!token) {
    console.log("no token, func: retriveToken");
    return;
  }

  const tk = await tokenStringResolver(token);
  return tk;
};
