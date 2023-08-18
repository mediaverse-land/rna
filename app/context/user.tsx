/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState, useEffect, ReactNode } from 'react';
import { StorageService } from '../services/storage.service';
import { RootService } from '../services/root.service';
import { User } from '../types/user';

type Props = {
    children: ReactNode;
};

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue((value) => value + 1);
}

export const userContext = createContext({
    getUser: (): any => {},
    setUser: (user: User): any => {},
    updateUser: function (): any {}
});

const _storageService = new StorageService();
const _rootService = new RootService();

export const UserContextProvider: React.FC<Props> = ({ children }) => {
    const [userData, setUserData] = useState<User>(null);

    const forceUpdate = useForceUpdate();

    useEffect(() => {
        getDefaultData();
    }, []);

    const getDefaultData = async () => {
        const token = await _storageService.get('user_data');
        if (!token) {
            return;
        }

        const formattedToken =
            token?.charAt(0) === '"' ? token.slice(1, token.length - 1) : token;
        const { isSuccess, isError, res } = await _rootService.getUserData(
            formattedToken
        );

        if (isError || !isSuccess) {
            await _storageService.removeItem('user_data');
            return;
        }

        setUserData(res.data);
    };

    const updateUserData = async () => {
        await getDefaultData();
    };

    const setUserHandler = (user: User) => {
        setUserData(user);
    };

    const getUserHandler = () => {
        return userData;
    };

    const store: {
        getUser: () => any;
        setUser: any;
        updateUser: () => any;
    } = {
        getUser: getUserHandler,
        setUser: setUserHandler,
        updateUser: updateUserData
    };

    return (
        <userContext.Provider value={store}>{children}</userContext.Provider>
    );
};
