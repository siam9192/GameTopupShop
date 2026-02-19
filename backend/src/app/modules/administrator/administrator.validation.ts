import { z } from 'zod';
import { AccountStatus, AdministratorLevel } from '../user/user.interface';

const createAdministratorValidation = z.object({
  name: z.object({
    first: z.string().nonempty().max(25),
    last: z.string().nonempty().max(25),
  }),
  profilePicture: z.string().url(),
  level: z.nativeEnum(AdministratorLevel),
  email: z.string().email(),
  password: z.string().min(6),
});
const updateAdministratorStatus = z.object({
  id: z.string().nonempty(),
  status: z.enum([AccountStatus.ACTIVE, AccountStatus.BLOCKED]),
});

const updateAdministratorLevel = z.object({
  id: z.string().nonempty(),
  level: z.nativeEnum(AdministratorLevel),
});

const administratorValidations = {
  createAdministratorValidation,
  updateAdministratorStatus,
  updateAdministratorLevel,
};

export default administratorValidations;
