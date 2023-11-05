import { ApiHandler } from '../../../utils/api-handler';

type Args = {
    type?: 1 | 2 | 3 | 4;
    name?: string;
    tag?: string;
    plan?: string;
    token: string | any;
};

const _api = new ApiHandler();

export const searchAllApiHandler = async ({ name, tag, plan, token }: Args) => {
    let url = `/search?`;
    if (plan) url = url + `&plan=${plan}`;
    if (tag) url = url + `&tag=${tag}`;
    if (name) url = url + `&q=${name}`;

    const config = {
        headers: { Authorization: `Bearer ${token}`,"X-App": "_Android", }
    };

    return await _api.get(url, config);
};

export const searchImageApiHandler = async ({
    name,
    tag,
    plan,
    token
}: Args) => {
    let url = `/search?type=2`;
    if (plan) url = url + `&plan=${plan}`;
    if (tag) url = url + `&tag=${tag}`;
    if (name) url = url + `&q=${name}`;

    const config = {
        headers: { Authorization: `Bearer ${token}`,"X-App": "_Android", }
    };

    return await _api.get(url, config);
};

export const searchSoundApiHandler = async ({
    name,
    tag,
    plan,
    token
}: Args) => {
    let url = `/search?type=3`;
    if (plan) url = url + `&plan=${plan}`;
    if (tag) url = url + `&tag=${tag}`;
    if (name) url = url + `&name=${name}`;

    const config = {
        headers: { Authorization: `Bearer ${token}`,"X-App": "_Android", }
    };

    return await _api.get(url, config);
};

export const searchTextApiHandler = async ({
    name,
    tag,
    plan,
    token
}: Args) => {
    let url = `/search?type=1`;
    if (plan) url = url + `&plan=${plan}`;
    if (tag) url = url + `&tag=${tag}`;
    if (name) url = url + `&name=${name}`;

    const config = {
        headers: { Authorization: `Bearer ${token}`,"X-App": "_Android", }
    };

    return await _api.get(url, config);
};

export const searchVideoApiHandler = async ({
    name,
    tag,
    plan,
    token
}: Args) => {
    let url = `/search?type=4`;
    if (plan) url = url + `&plan=${plan}`;
    if (tag) url = url + `&tag=${tag}`;
    if (name) url = url + `&name=${name}`;

    const config = {
        headers: { Authorization: `Bearer ${token}`,"X-App": "_Android", }
    };

    return await _api.get(url, config);
};
