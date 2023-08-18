import axios, { AxiosError } from 'axios';

const BASE_URL = 'https://api.mediaverse.land/v2';

export class ApiHandler {
    async post(endpoint: string, data: object, config?: object) {
        let isSuccess = false;
        let isError = false;
        let res = null;
        let errorRes = null;
        
        try {
            const request = await axios.post(
                `${BASE_URL}${endpoint}`,
                data,
                config
            );

            isSuccess = true;
            res = request;
        } catch (err) {
            if (err instanceof AxiosError) {
                const { data } = err.response;
                isError = true;
                errorRes = data;
            }
        }

        return {
            isSuccess,
            isError,
            res,
            errorRes
        };
    }

    async get(endpoint: string, config?: object, notUseBaseUrl?:boolean) {
        let isSuccess = false;
        let isError = false;
        let res = null;
        let errorRes = null;

        const url = !notUseBaseUrl ?`${BASE_URL}${endpoint}`: endpoint


        try {
            const request = await axios.get(url, config);

            isSuccess = true;
            res = request;
        } catch (err) {
            if (err instanceof AxiosError) {
                const {  data } = err.response;
                isError = true;
                errorRes = data;
            }
        }

        return {
            isSuccess,
            isError,
            res,
            errorRes
        };
    }

    async put(endpoint: string, data: object, config?: object) {
        let isSuccess = false;
        let isError = false;
        let res = null;
        let errorRes = null;

        try {
            const request = await axios.put(
                `${BASE_URL}${endpoint}`,
                data,
                config
            );

            isSuccess = true;
            res = request;
        } catch (err) {
            if (err instanceof AxiosError) {
                const {  data } = err.response;
                isError = true;
                errorRes = data;
            }
        }

        return {
            isSuccess,
            isError,
            res,
            errorRes
        };
    }

    async patch(endpoint: string, body: any, config?: object) {
        let isSuccess = false;
        let isError = false;
        let res = null;
        let errorRes = null;

        try {
            const request = await axios.patch(
                `${BASE_URL}${endpoint}`,
                body,
                config
            );

            isSuccess = true;
            res = request;
        } catch (err) {
            if (err instanceof AxiosError) {
                const { data } = err.response;
                isError = true;
                errorRes = data;
            }
        }

        return {
            isSuccess,
            isError,
            res,
            errorRes
        };
    }

    async delete(endpoint: string, config?: object) {
        let isSuccess = false;
        let isError = false;
        let res = null;
        let errorRes = null;

        try {
            const request = await axios.delete(
                `${BASE_URL}${endpoint}`,
                config
            );

            isSuccess = true;
            res = request;
        } catch (err) {
            if (err instanceof AxiosError) {
                const { data } = err.response;
                isError = true;
                errorRes = data;
            }
        }

        return {
            isSuccess,
            isError,
            res,
            errorRes
        };
    }
}
