import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';

function useFetch<TData = unknown, TError = unknown>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<TData, TError>({
    queryKey,
    queryFn,
    ...options,
  });
}

export default useFetch;
