import { mainApiEndPoint } from "@/assets/assets";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import axios, { type AxiosRequestConfig } from "axios";

interface PostOptions<TRequest, TResponse> {
  url: string;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: unknown) => void;
    config?: AxiosRequestConfig<any>;
}

export function usePost<TRequest, TResponse>({
  url,
  onSuccess,
  onError,
  config,
}: PostOptions<TRequest, TResponse>): UseMutationResult<
  TResponse,
  unknown,
  TRequest
> {
  return useMutation<TResponse, unknown, TRequest>({
    mutationFn: async (payload: TRequest) => {
      const response = await axios.post<TResponse>(
        mainApiEndPoint + url,
        payload,
        config
      );
      return response.data;
    },
    onSuccess,
    onError,
    retry: 0,
  });
}
