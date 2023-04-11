import axios from 'axios';
import { useEffect, useState } from 'react';

export function useFetch<T>(
  url: string,
  onSuccess?: (data: T) => void,
  onFailed?: (error: string) => void
) {
  interface useFetchStates {
    isLoading: boolean;
    error: string | null;
    data: T | null;
  }

  const [fetch, setFetch] = useState<useFetchStates>({
    isLoading: false,
    error: null,
    data: null,
  });

  const setStates = (keys: string[], values: any[]) => {
    keys.forEach((key, index) => {
      setFetch((prevStates) => ({
        ...prevStates,
        [key]: values[index],
      }));
    });
  };

  useEffect(() => {
    //
    setStates(['isLoading'], [true]);
    // FETCH URI
    async function getData() {
      try {
        const data = (
          await axios.get<T>(url, {
            headers: { Accept: 'application/json' },
          })
        ).data;
        setStates(['data', 'isLoading'], [data, false]);
        // onSuccess callback
        onSuccess!(data);
      } catch (error: any) {
        setStates(['error', 'isLoading'], [error.message, false]);
        onFailed!(error);
      }
    }
    getData();
  }, []);

  return { ...fetch };
}
