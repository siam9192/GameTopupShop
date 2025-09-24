import { getCurrentUser, getRecentUsers } from '@/api-services/user';
import useFetch from '@/query/client/useFetch';
import { IResponse } from '@/types/response.type';
import { CurrentUser, RecentUser } from '@/types/user.type';

export function getCurrentUserQuery() {
  return useFetch<IResponse<CurrentUser>>(['getCurrentUser'], getCurrentUser);
}

export function getRecentUserQuery() {
  return useFetch<IResponse<RecentUser[]>>(['getCurrentUser'], getRecentUsers);
}
