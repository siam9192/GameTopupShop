import {
  customerSignin,
  customerSignup,
  CustomerSignupPayload,
  SigninPayload,
} from '@/api-services/auth';
import useMutate from '@/query/useMutation';

export function customerSignupMutation() {
  return useMutate<null, CustomerSignupPayload>(customerSignup);
}

export function customerSigninMutation() {
  return useMutate<{ accessToken: string; refreshToken: string }, SigninPayload>(customerSignin);
}
