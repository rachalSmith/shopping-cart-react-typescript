import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    fetchShopData(url);
  }, [url]);

  const fetchShopData = async (url: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, data };
};

export default useFetch;
