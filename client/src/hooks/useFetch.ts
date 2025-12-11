import { mainApiEndPoint } from "@/assets/assets";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

interface FetchOptions<T> {
  queryKey: any[];
  url: string;
  enabled?: boolean;
  select?: (data: T) => any;
}

export function useFetch<T>({
  queryKey,
  url,
  enabled = true,
  select,
}: FetchOptions<T>): UseQueryResult<T> {
  return useQuery<T>({
    queryKey,
    queryFn: async () => {
      const response = await axios.get<T>(mainApiEndPoint + url);
      return response.data;
    },
    enabled,
    select,
    retry: 0,
    staleTime: 1000 * 60 * 10,
  });
}
