import {
  approveWalletSubmission,
  cancelWalletSubmission,
  createWalletSubmission,
  declineWalletSubmission,
  getMyRecentWalletSubmissions,
  getMyWalletSubmissionById,
  getMyWalletSubmissions,
  getWalletSubmissionById,
  getWalletSubmissions,
} from '@/api-services/wallet-submission';
import useFetch from '@/query/client/useFetch';
import useMutate from '@/query/client/useMutation';
import { Param } from '@/types/metadata.type';
import { IResponse } from '@/types/response.type';
import {
  CreateWalletSubmissionPayload,
  DeclineWalletSubmissionPayload,
  WalletSubmission,
} from '@/types/wallet-submission.type';

export function getWalletSubmissionsQuery(params: Param[]) {
  return useFetch<IResponse<WalletSubmission[]>>(['getWalletSubmissions'], () =>
    getWalletSubmissions(params),
  );
}

export function getMyWalletSubmissionsQuery(params: Param[]) {
  return useFetch<IResponse<WalletSubmission[]>>(['getMyWalletSubmissions'], () =>
    getMyWalletSubmissions(params),
  );
}

export function getMyRecentWalletSubmissionsQuery(params: Param[]) {
  return useFetch<IResponse<WalletSubmission[]>>(['getMyRecentWalletSubmissions'], () =>
    getMyRecentWalletSubmissions(params),
  );
}

export function getMyWalletSubmissionByIdQuery(id: string) {
  return useFetch<IResponse<WalletSubmission>>(['getMyWalletSubmissionById', id], () =>
    getMyWalletSubmissionById(id),
  );
}

export function getWalletSubmissionByIdQuery(id: string) {
  return useFetch<IResponse<WalletSubmission>>(['getWalletSubmissionById', id], () =>
    getWalletSubmissionById(id),
  );
}

export function cancelWalletSubmissionMutation() {
  return useMutate<IResponse<WalletSubmission>, string>(cancelWalletSubmission);
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

export function createWalletSubmissionMutation() {
  return useMutate<IResponse<WalletSubmission>, CreateWalletSubmissionPayload>(
    createWalletSubmission,
  );
}
