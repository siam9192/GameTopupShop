import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';

function useFetch<
  TQueryFnData = unknown, // raw return type from queryFn
  TError = unknown, // error type
  TData = TQueryFnData, // final data type after select
>(
  queryKey: QueryKey,
  queryFn: () => Promise<TQueryFnData>,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<TQueryFnData, TError, TData>({
    queryKey,
    queryFn,
    ...options,
  });
}

export default useFetch;
