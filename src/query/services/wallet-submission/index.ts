import {
  approveWalletSubmission,
  declineWalletSubmission,
  getWalletSubmissionById,
  getWalletSubmissions,
} from '@/api-services/wallet-submission';
import useFetch from '@/query/client/useFetch';
import useMutate from '@/query/client/useMutation';
import { Param } from '@/types/metadata.type';
import { IResponse } from '@/types/response.type';
import { DeclineWalletSubmissionPayload, WalletSubmission } from '@/types/wallet-submission.type';

export function getWalletSubmissionsQuery(params: Param[]) {
  return useFetch<IResponse<WalletSubmission[]>>(['getWalletSubmissions'], () =>
    getWalletSubmissions(params),
  );
}

export function getWalletSubmissionByIdQuery(id: string) {
  return useFetch<IResponse<WalletSubmission>>(['getWalletSubmissionById', id], () =>
    getWalletSubmissionById(id),
  );
}

export function approveWalletSubmissionMutation() {
  return useMutate<IResponse<WalletSubmission>, string>(approveWalletSubmission);
}

export function declineWalletSubmissionMutation() {
  return useMutate<
    IResponse<WalletSubmission>,
    { id: string; payload: DeclineWalletSubmissionPayload }
  >(declineWalletSubmission);
}
