export const ERROR_UNAUTHENTICATED = {
  status: 401,
  message_fa: "خطای تایید هویت کاربر",
};

export const ERROR_RATE_LIMMIT = {
  status: 429,
  message_fa: "خطای تعداد درخواست بیش از حد مجاز",
};

export const ERROR_PERMISSION = {
  status: 403,
  message_fa: "خطای دسترسی به منبع مورد نظر",
};

export const ERROR_INPUT_VALIDATION = {
  status: 422,
  message_fa: "خطای اعتبارسنجی پارامتر های درخواست",
};

export const ERROR_NOT_FOUND = {
  status: 404,
  message_fa: "خطای یافت نشدن منبع مورد نظر",
};

export const ERROR_EXTERNAL_ACCOUNT_CREATION_MSG =
  "Error while creating new external account; Your email is registered";

export const EXTERNAL_ACCOUNT_CREATION_SUCCESS_MSG =
  "New external account has been created successfully";

  export const ERROR_FETCH_GOOGLE_DATA = "Error wile fetching userGoogleData"

  export const NO_ACCESS_TOKEN_MSG = "No access token"