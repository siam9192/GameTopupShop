import { z } from 'zod';

const updateCustomerProfileValidation = z
  .object({
    name: z.object({
      first: z.string().nonempty().max(25),
      last: z.string().nonempty().max(25),
    }),
    profilePicture: z.instanceof(File, { message: 'Profile picture is required' }),
    phone: z.string().nonempty().max(40),
  })
  .partial();

const updateAdministratorProfileValidation = z
  .object({
    name: z.object({
      first: z.string().nonempty().max(25),
      last: z.string().nonempty().max(25),
    }),
    profilePicture: z.instanceof(File, { message: 'Profile picture is required' }),
  })
  .partial();

export type UpdateAdministratorProfileValidation = z.infer<
  typeof updateAdministratorProfileValidation
>;
export type UpdateCustomerProfileValidation = z.infer<typeof updateAdministratorProfileValidation>;

const userValidations = {
  updateCustomerProfileValidation,
  updateAdministratorProfileValidation,
};

export default userValidations;
