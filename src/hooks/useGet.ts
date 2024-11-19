import { useState, useEffect } from "react";

export const useGet = (url: string) => {
  const [data, setData] = useState<unknown | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);

        if (!response.ok) throw new Error("Failed to fetch Pokemon data");

        const data = await response.json();
        setData(data.results);
      } catch (err: unknown) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchdata();
  }, [url]);

  return { data, loading };
};
