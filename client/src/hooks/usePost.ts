import { mainApiEndPoint } from "@/assets/assets";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

interface PostOptions<TRequest, TResponse> {
  url: string;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: unknown) => void;
}

export function usePost<TRequest, TResponse>({
  url,
  onSuccess,
  onError,
}: PostOptions<TRequest, TResponse>): UseMutationResult<
  TResponse,
  unknown,
  TRequest
> {
  return useMutation<TResponse, unknown, TRequest>({
    mutationFn: async (payload: TRequest) => {
      const response = await axios.post<TResponse>(
        mainApiEndPoint + url,
        payload
      );
      return response.data;
    },
    onSuccess,
    onError,
    retry: 0,
  });
}
