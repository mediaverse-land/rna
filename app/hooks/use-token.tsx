import { useCallback, useContext, useEffect, useState } from 'react';
import { retriveToken } from '../utils/retrive-token';
import { tokenContext } from '../context/token';
import { userContext } from '../context/user';

export const useToken = () => {
  const [token, setToken] = useState<string>(null);
  const [currentUserId, setCurrentUserId] = useState<number>(null);

  const tokenCtx = useContext(tokenContext);
  const userCtx = useContext(userContext);

  useEffect(() => {
    getToken();
    getUser();
  }, []);


  
  const getUser = useCallback(async () => {
    const _user = await userCtx.getUser();
    setCurrentUserId(_user?.id)
  }, [token]);

  const getToken = useCallback(async () => {
    const _token: any = await retriveToken(tokenCtx);
    setToken(_token);
  }, [token]);

  return [token, currentUserId];
};
