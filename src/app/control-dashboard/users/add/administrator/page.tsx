'use client';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import { createAdministratorMutation } from '@/query/services/administrator';
import { AdministratorLevel } from '@/types/user.type';
import { uploadImageToImgBB } from '@/utils/helper';
import administratorValidation, {
  CreateAdministratorValidation,
} from '@/validations/administrator.validation';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  level: string;
  profilePicture: File | null;
}

type ErrorState = Partial<Record<keyof FormState, string>>;
function page() {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    level: '',
    password: '',
    profilePicture: null,
  });

  const [errors, setErrors] = useState<ErrorState>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>,
  ) => {
    const { name, value } = e.target;

    setForm(prev => ({ ...prev, [name as string]: value }));
  };

  const handleFileChange = async (file: File) => {
    const dimensions = await new Promise<{ width: number; height: number }>((resolve, reject) => {
      const image = new Image();

      image.onload = () => {
        resolve({
          width: image.width,
          height: image.height,
        });
        URL.revokeObjectURL(image.src); // cleanup
      };

      image.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      image.src = URL.createObjectURL(file);
    });

    // Example validation: require at least 1920×720
    // if (simplifyRatio(dimensions.width, dimensions.height) !== '16:9') {
    //   setErrors(p => ({
    //     ...p,
    //     profilePicture: `Invalid image ratio require ratio is 16:9`,
    //   }));
    //   return;
    // }

    setForm(p => ({ ...p, profilePicture: file }));
  };

  const handleReset = () => {
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      level: '',
      password: '',
      profilePicture: null,
    });
    setErrors({});
  };

  const { mutate } = createAdministratorMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = administratorValidation.createAdministratorSchema.safeParse(form);

    if (!result.success) {
      // collect errors
      const fieldErrors: Partial<Record<keyof CreateAdministratorValidation, string>> = {};

      result.error.issues.forEach(err => {
        const fieldName = err.path[0] as keyof CreateAdministratorValidation;
        fieldErrors[fieldName] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    // upload image
    const imageUrl = await uploadImageToImgBB(form.profilePicture as File);

    mutate(
      {
        name: {
          first: form.firstName,
          last: form.lastName,
        },
        level: form.level,
        email: form.email,
        profilePicture: imageUrl,
        password: form.password,
      },
      {
        onSuccess: data => {
          toast.success(data.message);
          handleReset();
        },
        onError: data => {
          toast.error(data.message);
        },
      },
    );
  };

  return (
    <div>
      <DashboardPageHeading title="Add Administrator" />
      <form
        onSubmit={handleSubmit}
        className="p-5 md:p-8 lg:p-10 space-y-6 dark:bg-paper glass rounded-lg lg:w-1/2"
      >
        {/* Profile Picture */}
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Avatar
            src={form.profilePicture ? URL.createObjectURL(form.profilePicture) : ''}
            alt="Profile Preview"
            sx={{ width: 120, height: 120 }}
          />
          <Button
            variant="outlined"
            component="label"
            color={errors.profilePicture ? 'error' : 'primary'}
          >
            Upload Profile Picture
            <input
              type="file"
              hidden
              accept="image/*"
              name="profilePicture"
              onChange={e => {
                if (e.target.files && e.target.files[0]) {
                  handleFileChange(e.target.files[0]); // custom handler
                }
              }}
            />
          </Button>
          {errors.profilePicture && <p className="text-red-500">{errors?.profilePicture}</p>}
        </Box>

        {/* Name & Level */}
        <Grid container columns={1} spacing={3}>
          <Grid size={1}>
            <TextField
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              fullWidth
              required
            />
          </Grid>
          <Grid size={1}>
            <TextField
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              fullWidth
              required
            />
          </Grid>

          <Grid size={1}>
            <FormControl fullWidth error={!!errors.level}>
              <InputLabel id="level-label">Level</InputLabel>
              <Select
                labelId="level-label"
                name="level"
                value={form.level || ''}
                onChange={handleChange as any}
                required
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Object.values(AdministratorLevel).map(level => (
                  <MenuItem key={level} value={level}>
                    {level.replace('_', ' ')}
                  </MenuItem>
                ))}
              </Select>
              {errors.level && <p className="text-red-500">{errors.level}</p>}
            </FormControl>
          </Grid>
          <Grid size={1}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              required
            />
          </Grid>

          <Grid size={1}>
            <FormControl fullWidth error={!!errors.password}>
              <TextField
                label="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
                required
              />
              {errors.password && <p className="text-red-500">{errors.password}</p>}
            </FormControl>
          </Grid>
        </Grid>

        {/* Actions */}
        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={10}>
          <Button color="warning" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default page;
