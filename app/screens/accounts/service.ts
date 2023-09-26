import { Logger } from "../../utils/logger";

const _logger = new Logger();

export async function getUserEmailByAccessToken(token: string) {
  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (err) {
    _logger.logErro(JSON.stringify(err));
    return null;
  }
}
