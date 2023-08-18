import { ApiHandler } from '../../../../utils/api-handler';

const api = new ApiHandler();

export async function signinApiHandler(body: object) {
    return await api.post('/auth/sign-in', body);
}
