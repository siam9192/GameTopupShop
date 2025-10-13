import { AdministratorLevel } from '@/types/user.type';
import { z } from 'zod';

const createAdministratorSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  profilePicture: z.any().refine(file => file instanceof File && file.size > 0, {
    message: 'Profile picture is required',
  }),
  level: z.nativeEnum(AdministratorLevel),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type CreateAdministratorValidation = z.infer<typeof createAdministratorSchema>;

export default {
  createAdministratorSchema,
};
