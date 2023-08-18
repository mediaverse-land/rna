import { ApiHandler } from '../../../../utils/api-handler';

const api = new ApiHandler();

export async function requestCodeApiHandler(phoneNumber: string) {
    const data = {
        cellphone: `+98${phoneNumber}`,
        captcha: 'abc123xyz456'
    };

    return await api.post('/auth/otp/request', data);
}

export async function submitCodeApiHandler(
    phoneNumber: string,
    otp: number | string
) {
    const data = {
        cellphone: `+98${phoneNumber}`,
        otp: otp
    };

    return await api.post('/auth/otp/submit', data);
}

export type SignupCompleteionBody = {
    usermame: string;
    password: string;
    first_name?: string;
    last_name?: string;
};

export async function signupCompeletionApiHandler(body: object, token: string) {
    const config = {
        headers: { Authorization: `Bearer ${token}`,
        "X-App": "_ReactNative",
    }
    };

    return await api.post('/auth/sign-up-completion', body, config);
}

export async function googleAuthApiHandler(token: string) {
    const url = '/auth/google';

    const body = {
        id_token: token
    };

    return await api.post(url, body);
}
