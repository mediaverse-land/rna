/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

export function useApi<DATA_TYPE>(getterFunction: Function) {
  const [data, setData] = useState<DATA_TYPE>();
  const [error, setError] = useState({});
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const result = await getterFunction();
      if (result) {
        setData(result);
        setIsPending(false);
      }
    };

    getData();
  }, []);

  const alertIfHasError = () => {
    Alert.alert('sdmflksdf');
  };

  return { isPending, data, error, alertIfHasError };
}
