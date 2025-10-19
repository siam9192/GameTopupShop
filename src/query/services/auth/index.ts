import {
  administratorSignin,
  changePassword,
  customerSignin,
  customerSignup,
  CustomerSignupPayload,
  SigninPayload,
} from '@/api-services/auth';
import useMutate from '@/query/client/useMutation';
import { ChangePasswordPayload } from '@/server/utils/auth.type';
import { IResponse } from '@/types/response.type';

export function customerSignupMutation() {
  return useMutate<null, CustomerSignupPayload>(customerSignup);
}

export function customerSigninMutation() {
  return useMutate(customerSignin);
}

export function administratorSigninMutation() {
  return useMutate<IResponse<{ accessToken: string; refreshToken: string }>, SigninPayload>(
    administratorSignin,
  );
}

export function changePasswordMutation() {
  return useMutate<IResponse<null>, ChangePasswordPayload>(changePassword);
}
