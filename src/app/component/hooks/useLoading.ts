import { useApp } from "./useApp"
import { useCallback } from "react";


export const useLoading = () => {
  const { setLoading } = useApp();

  const loading = useCallback( async <T = any> ( promise: Promise<T>) => {
    try {
      setLoading(true);
      const result = await promise;
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      return Promise.reject(error);
    }
  }, [ setLoading ])

  return { loading };

}