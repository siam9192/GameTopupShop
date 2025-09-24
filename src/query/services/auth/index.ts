import {
  administratorSignin,
  customerSignin,
  customerSignup,
  CustomerSignupPayload,
  SigninPayload,
} from '@/api-services/auth';
import useMutate from '@/query/client/useMutation';
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
