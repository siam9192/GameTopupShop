'use client';
import CustomJoditEditor from '@/components/editor/CustomJoditEditor';
import AddInfoField from '@/components/sections/control-dashboard/AddInfoField';

import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import VisuallyHiddenInput from '@/components/ui/VisuallyHiddenInput';
import { createTopupMutation, deleteTopupMutation } from '@/query/services/topup';
import {
  CreatePackage,
  CreateTopupPayload,
  TopupInfoField,
  TopupPackageStatus,
} from '@/types/topup.type';
import { simplifyRatio, uploadImageToImgBB } from '@/utils/helper';
import topupValidation, { CreateTopupValidation } from '@/validations/topup.validation';
import {
  Box,
  Button,
  Chip,
  FormHelperText,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { FaDeleteLeft } from 'react-icons/fa6';
import { IoIosCloudUpload } from 'react-icons/io';
import { toast } from 'react-toastify';

type FormValue = {
  name: string;
  coverPhoto: File | null;
  platformName: string;
  packageName: string;
  packagePrice: string | number;
  description: string;
};

type FormError = Record<string, string>;

const formDefaultValue: FormValue = {
  name: '',
  coverPhoto: null,
  platformName: '',
  packageName: '',
  packagePrice: '',
  description: '',
};

function page() {
  const [packages, setPackages] = useState<CreatePackage[]>([]);
  const [infoFields, setInfoFields] = useState<TopupInfoField[]>([]);

  const [form, setForm] = useState<FormValue>(formDefaultValue);
  const [errors, setErrors] = useState<FormError>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCoverPhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const file = files[0];

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
    if (simplifyRatio(dimensions.width, dimensions.height) !== '16:9') {
      setErrors(p => ({
        ...p,
        coverPhoto: `Invalid image ratio require ratio is 16:9`,
      }));
      return;
    }

    setForm(p => ({ ...p, coverPhoto: file }));
  };

  const handleAddPackage = () => {
    let { packageName, packagePrice } = form;
    const price = Number(packagePrice);
    const errors: { packageName?: string; packagePrice?: string } = {};

    // Validate package name
    if (!packageName || !packageName.trim()) {
      errors.packageName = 'Package Name is required';
    } else if (packageName.length > 30) {
      errors.packageName = 'Package Name must be 30 characters or less';
    }

    // Validate package price
    if (Number.isNaN(price)) {
      errors.packagePrice = 'Invalid package price';
    } else if (price < 1) {
      errors.packagePrice = 'Invalid package price';
    }

    // Stop if validation failed
    if (Object.keys(errors).length > 0) {
      setErrors(prev => ({ ...prev, ...errors }));
      return;
    }

    // Add package
    setPackages(prev => [
      ...prev,
      { name: packageName, price, status: TopupPackageStatus.AVAILABLE } as CreatePackage,
    ]);

    // Reset form
    setForm(prev => ({ ...prev, packageName: '', packagePrice: '' }));
    setErrors({ packageName: '', packagePrice: '' });
  };

  const removePackage = (index: number) => {
    setPackages(prev => prev.filter((_, i) => i !== index));
  };

  const removeInfoField = (index: number) => {
    setInfoFields(prev => prev.filter((_, i) => i !== index));
  };
  const handelReset = () => {
    setErrors({});
    setForm(formDefaultValue);
    setInfoFields([]);
    setPackages([]);
  };

  const { mutate, isPending } = createTopupMutation();

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const { coverPhoto, name, platformName, description } = form;

    const result = topupValidation.createTopupValidation.safeParse({
      name: name!,
      platformName: platformName!,
      description: description!,
      coverPhoto,
      infoFields,
      packages,
    });
    if (!result.success) {
      // collect errors
      const fieldErrors: Partial<Record<keyof CreateTopupValidation, string>> = {};

      result.error.issues.forEach(err => {
        const fieldName = err.path[0] as keyof CreateTopupValidation;
        fieldErrors[fieldName] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const coverPhotoUrl = await uploadImageToImgBB(coverPhoto as File);
    let toastId = toast.loading('Pending...');
    const payload: CreateTopupPayload = {
      name: name!,
      platformName: platformName!,
      description: description!,
      coverPhoto: coverPhotoUrl,
      infoFields,
      packages,
    };

    mutate(payload, {
      onSuccess: () => {
        toast.dismiss(toastId);
        toast.success('Topup created successfully');
        handelReset();
      },
      onError: error => {
        toast.dismiss(toastId);
        toast.error(error.message);
      },
    });
  };

  return (
    <div>
      <DashboardPageHeading title="Add Top Up" />
      <form
        action=""
        onSubmit={handelSubmit}
        className=" p-3 md:p-5 lg:p-10 dark:bg-paper  rounded-lg lg:w-10/12 glass"
      >
        <label htmlFor=""></label>
        <Box>
          {form.coverPhoto ? (
            <img
              src={URL.createObjectURL(form.coverPhoto)}
              alt=""
              className="w-[400px] h-[225px]"
            />
          ) : null}
          {/* Upload button */}
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            sx={{
              mt: 1,
            }}
            startIcon={<IoIosCloudUpload />}
          >
            Upload Image file
            <VisuallyHiddenInput type="file" accept="image/*" onChange={handleCoverPhotoChange} />
          </Button>
          <FormHelperText>Required image ratio is 16:9 example size (1200x720) px</FormHelperText>
          <p className="text-red-500">{errors.coverPhoto}</p>
        </Box>
        <Stack marginTop={2} spacing={2}>
          <Box>
            <TextField
              label="Name"
              name="name"
              value={form.name || ''}
              onChange={handleChange}
              error={!!errors.name}
              fullWidth
            />
            <p className="text-red-500">{errors.name}</p>
          </Box>
          <Box>
            <TextField
              label="Platform Name"
              name="platformName"
              value={form.platformName || ''}
              onChange={handleChange}
              error={!!errors.name}
              fullWidth
            />
            <p className="text-red-500">{errors.name}</p>
          </Box>
          <Box>
            {packages.length ? (
              <Typography color="text.primary" fontSize={22}>
                Added Packages:
              </Typography>
            ) : null}
            <Grid
              container
              columns={{
                xs: 1,
                md: 2,
              }}
              marginTop={2}
              spacing={2}
            >
              {packages.map((_, index) => (
                <Grid key={index} size={1}>
                  <Box className="p-2 dark:bg-black bg-gray-100 rounded-lg">
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                      <Typography color="primary" component={'p'} fontSize={18}>
                        {index + 1}.{' '}
                        <Typography component={'span'} color="text.primary" fontSize={'inherit'}>
                          {_.name}({_.price})
                        </Typography>
                      </Typography>
                      <IconButton onClick={() => removePackage(index)}>
                        <FaDeleteLeft />
                      </IconButton>
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box>
            <Typography color="text.primary" fontSize={22}>
              Add Package:
            </Typography>

            <Grid
              marginTop={2}
              container
              columns={{
                xs: 1,
                md: 2,
              }}
              spacing={2}
            >
              <Grid size={1}>
                <TextField
                  label="Package Name"
                  name="packageName"
                  value={form.packageName || ''}
                  onChange={handleChange}
                  error={!!errors.packageName}
                  fullWidth
                />
                <p className="text-red-500">{errors.packageName}</p>
              </Grid>
              <Grid size={1}>
                <TextField
                  label="Package Price"
                  name="packagePrice"
                  value={form.packagePrice || ''}
                  onChange={handleChange}
                  error={!!errors.packagePrice}
                  fullWidth
                />
                <p className="text-red-500">{errors.packagePrice}</p>
              </Grid>
            </Grid>
            <Stack marginTop={1} direction={'row'} justifyContent={'end'}>
              <Button type="button" onClick={handleAddPackage} variant="outlined" color="secondary">
                Add Package
              </Button>
            </Stack>
          </Box>
        </Stack>

        <Box>
          <AddInfoField onSubmit={val => setInfoFields(p => [...p, val])} />
          {infoFields.length ? (
            <Typography color="text.primary" fontSize={22}>
              Added Info Fields:
            </Typography>
          ) : null}
          <Grid container spacing={2} mt={1} columns={2}>
            {infoFields.map((f, i) => (
              <div
                key={i}
                className="
                 rounded-lg border p-4 shadow-sm
                 bg-gray-50 border-gray-200 text-gray-800
                 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200
                 transition-colors duration-300 relative
               "
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  {f.name}
                </Typography>

                <div className="mt-2 space-y-1 text-sm">
                  <p>
                    <strong>Type:</strong> {f.type}
                  </p>

                  {f.placeholder && (
                    <p>
                      <strong>Placeholder:</strong> {f.placeholder}
                    </p>
                  )}

                  {f.minLength !== undefined && (
                    <p>
                      <strong>Min Length:</strong> {f.minLength || 'N/A'}
                    </p>
                  )}

                  {f.maxLength !== undefined && (
                    <p>
                      <strong>Max Length:</strong> {f.maxLength || 'N/A'}
                    </p>
                  )}

                  {f.min !== undefined && (
                    <p>
                      <strong>Min:</strong> {f.min || 'N/A'}
                    </p>
                  )}

                  {f.max !== undefined && (
                    <p>
                      <strong>Max:</strong> {f.max || 'N/A'}
                    </p>
                  )}

                  <p>
                    <strong>Optional:</strong>{' '}
                    <span
                      className={
                        f.optional
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }
                    >
                      {f.optional ? 'Yes' : 'No'}
                    </span>
                  </p>
                </div>
                {/* Right side: Delete button */}
                <IconButton
                  color="error"
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                  }}
                  onClick={() => removeInfoField(i)}
                >
                  <FaDeleteLeft />
                </IconButton>
              </div>
            ))}
          </Grid>
        </Box>

        <Box>
          <Typography mb={1} color="text.primary" fontSize={22}>
            Description :
          </Typography>
          <CustomJoditEditor onChange={value => setForm(p => ({ ...p, description: value }))} />
        </Box>
        <Stack direction={'row'} justifyContent={'end'} marginTop={2}>
          <Button type="reset" disabled={isPending} onClick={handelReset} color="warning">
            Reset
          </Button>
          <Button type="submit" disabled={isPending} variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default page;
