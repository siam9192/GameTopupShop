import { getAdministrators, getAdministratorById, updateAdministratorLevel, updateAdministratorStatus, deleteAdministrator } from '@/api-services/administrator';
import useFetch from '@/query/client/useFetch';
import useMutate from '@/query/client/useMutation';
import { Administrator } from '@/types/administrator.type';
import { Param } from '@/types/metadata.type';
import { IResponse } from '@/types/response.type';
import { AccountStatus, AdministratorLevel } from '@/types/user.type';


export function getAdministratorsQuery(params: Param[]) {
  return useFetch<IResponse<Administrator[]>>(['getAdministrators'], () =>
    getAdministrators(params),
  );
}

export function getAdministratorByIdQuery(id: string) {
  return useFetch<IResponse<Administrator>>(
    ['getAdministratorById', id],
    () => getAdministratorById(id),
    { enabled: !!id },
  );
}



export function  updateAdministratorLevelMutation () {
  return useMutate<IResponse<null>,{id:string,level:AdministratorLevel}>(updateAdministratorLevel)
}



export function updateAdministratorStatusMutation() {
  return useMutate<IResponse<Administrator>, { id: string; status: AccountStatus }>(
    updateAdministratorStatus,
  );
}



export function deleteAdministratorMutation() {
  return useMutate<IResponse<null>, string>(deleteAdministrator);
}
