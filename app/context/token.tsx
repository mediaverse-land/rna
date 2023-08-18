/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState, useEffect, ReactNode } from 'react';
import { StorageService } from '../services/storage.service';
import { User } from '../types/user';

type Props = {
    children: ReactNode;
};

export const tokenContext = createContext({
    getToken: () => {},
    setToken: (tokenStr: string) => {},
    clearToken: () => {},
    getUser: (): any => {},
    setUser: (user: User): any => {}
});

const _storageService = new StorageService();

export const TokenContextProvider: React.FC<Props> = ({ children }) => {
    const [token, setToken] = useState<string>(null);
    const [userData, setUserData] = useState<User>(null);

    useEffect(() => {
        const getDefaultToken = async () => {
            const tk = await _storageService.get('user_data');
            setToken(tk);
        };

        getDefaultToken();
    }, []);

    const getTokenHandler=  async () => {
        return token;
    };

    const setTokenHandler = async (tokenStr: string) => {
        await _storageService.set('user_data', tokenStr);
        setToken(tokenStr);
    };

    const clearTokenHandler = () => {
        setToken(null);
    };

    const setUserHandler = (user: User) => {
        setUserData(user);
    };

    const getUserHandler = () => {
        return userData;
    };

    const store: {
        getToken: () => Promise<string>;
        setToken: (tokenStr: string) => void;
        clearToken: () => void;
        getUser: () => any;
        setUser: any;
    } = {
        getToken: getTokenHandler,
        setToken: setTokenHandler,
        clearToken: clearTokenHandler,
        getUser: getUserHandler,
        setUser: setUserHandler
    };

    return (
        <tokenContext.Provider value={store}>{children}</tokenContext.Provider>
    );
};
