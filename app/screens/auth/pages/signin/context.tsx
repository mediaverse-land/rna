/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState, ReactNode, FC } from 'react';

type Props = {
  children: ReactNode;
};

interface Context {
  setExpireTime: (time: string) => void;
  getExpireTime: () => string | null;
  setPhoneNumber: (phone: string) => void;
  getPhoneNumber: () => string | null;
  setToken: (phone: string) => void;
  getToken: () => string | null;
}

export const signupContext = createContext<Context>({
  setExpireTime: (time: string) => {},
  getExpireTime: () => {
    return null;
  },
  setPhoneNumber: (phone: string) => {},
  getPhoneNumber: () => {
    return null;
  },
  setToken: (token: string) => {
    return null;
  },
  getToken: () => {
    return null;
  },
});

export const TokenContextProvider: FC<Props> = ({ children }) => {
  const [expiredTime, setExpiredTime] = useState<string>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>(null);
  const [token, setToken] = useState<string>(null);

  const setExpireTimeHandler = (time: string) => {
    setExpiredTime(time);
  };

  const getExpireTimeHandler = () => {
    return expiredTime;
  };

  const setPhoneNumberHandler = (phone: string) => {
    setPhoneNumber(phone);
  };

  const getPhoneNumberHandler = () => {
    return phoneNumber;
  };

  const setTokenHandler = (tk: string) => {
    setToken(tk);
  };

  const getTokenHandler = () => {
    return token;
  };

  const store: Context = {
    setExpireTime: setExpireTimeHandler,
    getExpireTime: getExpireTimeHandler,
    setPhoneNumber: setPhoneNumberHandler,
    getPhoneNumber: getPhoneNumberHandler,
    setToken: setTokenHandler,
    getToken: getTokenHandler,
  };

  return <signupContext.Provider value={store}>{children}</signupContext.Provider>;
};
