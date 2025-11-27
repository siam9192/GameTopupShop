'use client';
import VisuallyHiddenInput from '@/components/ui/VisuallyHiddenInput';
import { useCurrentUser } from '@/provider/CurrentUserProvider';
import { updateUserProfileMutation } from '@/query/services/metadata';
import { Administrator, UpdateAdministratorProfilePayload } from '@/types/administrator.type';
import { Name } from '@/types/user.type';
import { simplifyRatio, uploadImageToImgBB } from '@/utils/helper';
import userValidations, {
  UpdateAdministratorProfileValidation,
} from '@/validations/user.validation';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { IoIosCloudUpload } from 'react-icons/io';
import { toast } from 'react-toastify';

type FormValue = Partial<
  Pick<UpdateAdministratorProfilePayload, 'name'> & {
    profilePicture: File;
  }
>;

function Page() {
  const [form, setForm] = useState<FormValue>({
    name: { first: '', last: '' },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const currentUser = useCurrentUser();
  const user = currentUser.user! as Administrator;

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
      });
    }
  }, [currentUser.isLoading]);

  const handleProfilePictureChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const file = files[0];

    try {
      const dimensions = await new Promise<{ width: number; height: number }>((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
          resolve({ width: image.width, height: image.height });
          URL.revokeObjectURL(image.src);
        };
        image.onerror = () => reject(new Error('Failed to load image'));
        image.src = URL.createObjectURL(file);
      });

      if (simplifyRatio(dimensions.width, dimensions.height) !== '1:1') {
        setErrors(p => ({
          ...p,
          profilePicture: `Invalid image ratio. Required ratio is 1:1.`,
        }));
        return;
      }

      setErrors(p => ({ ...p, profilePicture: '' }));
      setForm(p => ({ ...p, profilePicture: file }));
    } catch (err) {
      setErrors(p => ({
        ...p,
        profilePicture: 'Unable to read image dimensions.',
      }));
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm(p => ({
      ...p,
      name: {
        ...((p.name ?? {}) as Name), // ensure name object always exists
        [name as keyof Name]: value,
      },
    }));
  };

  const { mutate } = updateUserProfileMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const payload: UpdateAdministratorProfileValidation = {
      name: form.name,
    };

    if (form.profilePicture) {
      payload['profilePicture'] = form.profilePicture;
    }

    const result = userValidations.updateAdministratorProfileValidation.safeParse(payload);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(err => {
        const fieldName = err.path.join('.') as keyof FormValue;
        fieldErrors[fieldName] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }
    let toastId = toast.loading('Pending...');

    const finalPayload: UpdateAdministratorProfilePayload = {
      name: form.name,
    };
    if (form.profilePicture) {
      finalPayload['profilePicture'] = await uploadImageToImgBB(form.profilePicture);
    }

    mutate(finalPayload, {
      onSuccess: data => {
        toast.dismiss(toastId);
        toast.success(data.message);
      },
      onError: error => {
        toast.dismiss(toastId);
        toast.error(error.message);
      },
    });
  };

  return (
    <Box width={{ xs: '100%', lg: '80%' }} height={'100%'}>
      <Typography fontSize={20} fontWeight={600} color="text.primary" mb={2}>
        My Personal Information
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Profile Picture Upload */}
        <Box mb={4}>
          <Box
            component="img"
            src={
              form.profilePicture
                ? URL.createObjectURL(form.profilePicture)
                : user.profilePicture || ''
            }
            alt="Profile"
            sx={{
              width: 150,
              height: 150,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #ccc',
            }}
          />

          <Button
            component="label"
            variant="contained"
            startIcon={<IoIosCloudUpload />}
            sx={{ mt: 1 }}
          >
            Upload Image
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
          </Button>
          <FormHelperText>Required ratio: 1:1 (e.g., 100x100)</FormHelperText>
          {errors.profilePicture && <FormHelperText error>{errors.profilePicture}</FormHelperText>}
        </Box>

        <Stack spacing={3}>
          <FormControl fullWidth variant="standard" error={!!errors.first}>
            <InputLabel htmlFor="first">First Name</InputLabel>
            <Input
              id="first"
              name="first"
              value={form.name?.first ?? ''}
              onChange={handleNameChange}
              aria-describedby="first-text"
              error={!!errors['name.first']}
            />
            {errors['name.first'] && <FormHelperText error>{errors['name.first']}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth variant="standard" error={!!errors.last}>
            <InputLabel htmlFor="last">Last Name</InputLabel>
            <Input
              id="last"
              name="last"
              value={form.name?.last ?? ''}
              onChange={handleNameChange}
              aria-describedby="last-text"
              error={!!errors['name.last']}
            />
            {errors['name.last'] && <FormHelperText error>{errors['name.last']}</FormHelperText>}
          </FormControl>

          <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
            <Button variant="outlined" color="warning" type="button">
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save Changes
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}

export default Page;
