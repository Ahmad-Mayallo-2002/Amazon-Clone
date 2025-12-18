import { mainApiEndPoint } from "@/assets/assets";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import axios, { type AxiosRequestConfig } from "axios";

interface PatchOptions<TRequest, TResponse> {
  url: string;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: any) => void;
  config?: AxiosRequestConfig<any>;
}

export function usePatch<TRequest, TResponse>({
  url,
  onSuccess,
  onError,
  config,
}: PatchOptions<TRequest, TResponse>): UseMutationResult<
  TResponse,
  unknown,
  TRequest
> {
  return useMutation<TResponse, unknown, TRequest>({
    mutationFn: async (payload: TRequest) => {
      const response = await axios.patch(
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
