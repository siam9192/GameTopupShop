import { IResponse } from '@/types/response.type';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

function useMutate<TData = unknown, TVariables = void, TError = Error>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>,
) {
  return useMutation<IResponse<TData>, TError, TVariables>({
    mutationFn,
    ...options,
  });
}

export default useMutate;
