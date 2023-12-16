export type SignupWindows = 'SINGUP_WITH_PROVIDER' | 'SIGNUP_WITH_USERNAME';
export type SignUpWithUsernameWindows = 'INSERT_PHONE' | 'SEND_CODE' | 'FILL_DATA';
export type AuthWindows = 'root' | 'login' | 'singin';
export type LoginWindows = 'INSERT_PHONE' | 'EMAIL_PASS' | 'USER_PASS';

export const SINGUP_WITH_PROVIDER = 'SINGUP_WITH_PROVIDER';
export const SIGNUP_WITH_USERNAME = 'SIGNUP_WITH_USERNAME';
export const FILL_DATA = 'FILL_DATA';
export const INSERT_PHONE = 'INSERT_PHONE';
export const SIGNIN = 'singin';

export type LoginNavigationEvent = {
  navigateToEmailLogin: () => void;
  navigateToUsernameLogin: () => void;
  navigateToPhoneLogin: () => void;
};
