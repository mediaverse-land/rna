export type SignupWindows = 'SINGUP_WITH_PROVIDER' | 'SIGNUP_WITH_USERNAME';
export type SignUpWithUsernameWindows =
    | 'INSERT_PHONE'
    | 'SEND_CODE'
    | 'FILL_DATA';
export type AuthWindows = 'root' | 'login' | 'singin';
export type LoginWindows = 'INSERT_PHONE' | 'SEND_CODE' | 'USER_PASS';

export const SINGUP_WITH_PROVIDER = 'SINGUP_WITH_PROVIDER';
export const SIGNUP_WITH_USERNAME = 'SIGNUP_WITH_USERNAME';
export const INSERT_PHONE = 'INSERT_PHONE';
