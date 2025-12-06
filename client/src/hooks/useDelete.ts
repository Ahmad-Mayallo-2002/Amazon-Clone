import { mainApiEndPoint } from "@/assets/assets";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

interface DeleteOptions<TResponse> {
  url: string;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: unknown) => void;
}

export function useDelete<TResponse>({
  url,
  onSuccess,
  onError,
}: DeleteOptions<TResponse>): UseMutationResult<TResponse, unknown, void> {
  return useMutation<TResponse, unknown, void>({
    mutationFn: async () => {
      const response = await axios.delete(mainApiEndPoint + url);
      return response.data;
    },
    onSuccess,
    onError,
    retry: 0
  });
}
