/* eslint-disable react-hooks/exhaustive-deps */
import axios, { AxiosHeaders } from 'axios';
import { useCallback, useEffect, useState } from 'react';

export function useFetch<T>(
  url: string,
  fetchOnLoad?: boolean,
  onSuccess?: (data: T) => void,
  onFailed?: (error: string) => void,
  headers: AxiosHeaders = new AxiosHeaders({
    Accept: 'application/json',
    'Access-Control-Allow-Origin': true,
  })
) {
  interface useStates {
    isLoading: boolean;
    error: string | null;
    data: T | null;
  }

  const [states, setStates] = useState<useStates>({
    isLoading: false,
    error: null,
    data: null,
  });

  const setState = (keys: string[], values: any[]) => {
    keys.forEach((key, index) => {
      setStates((prevStates) => ({
        ...prevStates,
        [key]: values[index],
      }));
    });
  };

  useEffect(() => {
    // if fetchOnLoad, fetch the data
    if (fetchOnLoad) {
      setState(['isLoading'], [true]);
      fetch();
    }
  }, []);

  // FETCH URI
  const fetch = useCallback(async () => {
    setState(['isLoading'], [true]);
    try {
      const data = (
        await axios.get<T>(url, {
          headers,
        })
      ).data;
      setTimeout(() => {
        setState(['data', 'isLoading'], [data, false]);
      }, 1000);
      // onSuccess callback
      if (onSuccess) {
        onSuccess(data as T);
      }
    } catch (error: any) {
      setState(['error', 'isLoading'], [error.message, false]);
      if (onFailed) {
        onFailed(error);
      } // end if
    } // end catch
  }, []);

  return { ...states, fetch };
}
