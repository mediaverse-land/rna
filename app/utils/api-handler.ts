import axios, { AxiosError } from 'axios';
import { REACT_NATIVE_API_KEY } from '@env';
import {
    ERROR_INPUT_VALIDATION,
    ERROR_NOT_FOUND,
    ERROR_PERMISSION,
    ERROR_RATE_LIMMIT,
    ERROR_UNAUTHENTICATED
} from '../constaints/errors';
import logger from './logger';

const BASE_URL = REACT_NATIVE_API_KEY;

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
                const { status, data } = err.response;
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

    async get(endpoint: string, config?: object) {
        let isSuccess = false;
        let isError = false;
        let res = null;
        let errorRes = null;

        try {
            const request = await axios.get(`${BASE_URL}${endpoint}`, config);

            isSuccess = true;
            res = request;
        } catch (err) {
            if (err instanceof AxiosError) {
                const { status, data } = err.response;
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
