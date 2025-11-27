'use client';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormHelperText,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { IoIosCloudUpload } from 'react-icons/io';
import { FaDeleteLeft } from 'react-icons/fa6';
import { toast } from 'react-toastify';

import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import VisuallyHiddenInput from '@/components/ui/VisuallyHiddenInput';
import CustomJoditEditor from '@/components/editor/CustomJoditEditor';
import AddInfoField from '@/components/sections/control-dashboard/AddInfoField';

import {
  createTopupMutation,
  getTopupByIdQuery,
  updateTopupMutation,
} from '@/query/services/topup';
import {
  CreatePackage,
  CreateTopupPayload,
  TopupInfoField,
  TopupPackage,
  TopupPackageStatus,
  UpdateTopupPayload,
} from '@/types/topup.type';
import { simplifyRatio, uploadImageToImgBB } from '@/utils/helper';
import topupValidation from '@/validations/topup.validation';

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

function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [packages, setPackages] = useState<(CreatePackage | TopupPackage)[]>([]);
  const [infoFields, setInfoFields] = useState<TopupInfoField[]>([]);
  const [form, setForm] = useState<FormValue>(formDefaultValue);
  const [errors, setErrors] = useState<FormError>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCoverPhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const image = new Image();
    image.src = URL.createObjectURL(file);

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = reject;
    });

    const ratio = simplifyRatio(image.width, image.height);
    if (ratio !== '16:9') {
      setErrors(prev => ({
        ...prev,
        coverPhoto: 'Invalid image ratio. Required ratio is 16:9 (e.g. 1200x720px)',
      }));
      return;
    }

    setErrors(prev => ({ ...prev, coverPhoto: '' }));
    setForm(prev => ({ ...prev, coverPhoto: file }));
  };

  const handleAddPackage = () => {
    const { packageName, packagePrice } = form;
    const price = Number(packagePrice);
    const fieldErrors: FormError = {};

    if (!packageName.trim()) fieldErrors.packageName = 'Package name is required';
    else if (packageName.length > 30)
      fieldErrors.packageName = 'Package name must be 30 characters or less';

    if (Number.isNaN(price) || price < 1) fieldErrors.packagePrice = 'Invalid package price';

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...fieldErrors }));
      return;
    }

    setPackages(prev => [
      ...prev,
      { name: packageName, price, status: TopupPackageStatus.AVAILABLE },
    ]);

    setForm(prev => ({ ...prev, packageName: '', packagePrice: '' }));
  };

  const removePackage = (index: number) => {
    setPackages(prev => prev.filter((_, i) => i !== index));
  };

  const removeInfoField = (index: number) => {
    setInfoFields(prev => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setForm(formDefaultValue);
    setErrors({});
    setInfoFields([]);
    setPackages([]);
  };

  const { mutate, isPending } = updateTopupMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    const payload: UpdateTopupPayload = {
      name: form.name,
      platformName: form.platformName,
      description: form.description,
      infoFields,
      packages: packages.map(_ => ({
        name: _.name,
        price: _.price,
        status: TopupPackageStatus.AVAILABLE,
      })),
    };
    const validation = topupValidation.updateTopupValidation.safeParse(payload);

    if (!validation.success) {
      const fieldErrors: FormError = {};
      validation.error.issues.forEach(issue => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      console.log(fieldErrors);
      return;
    }

    if (form.coverPhoto) {
      payload.coverPhoto = await uploadImageToImgBB(form.coverPhoto);
    }

    const toastId = toast.loading('Submitting...');
    mutate(
      { id: topup!._id as string, payload },
      {
        onSuccess: () => {
          toast.dismiss(toastId);
          toast.success('Top-up updated successfully');
          handleReset();
          router.push('/control-dashboard/products/topups');
        },
        onError: error => {
          toast.dismiss(toastId);
          toast.error(error.message || 'Failed to create top-up');
        },
      },
    );
  };

  const { data, isLoading, error } = getTopupByIdQuery(id as string);
  const topup = data?.data;

  useEffect(() => {
    if (!data?.success || isLoading || error || !data?.data) return;

    const topup = data.data;

    setPackages(
      topup.packages.map(p => ({
        name: p.name,
        price: p.price,
        status: TopupPackageStatus.AVAILABLE,
      })),
    );
    setInfoFields(topup.infoFields);

    setForm({
      name: topup.name,
      coverPhoto: null,
      platformName: topup.platformName,
      packageName: '',
      packagePrice: '',
      description: topup.description,
    });
  }, [data, isLoading, error]);

  if (isLoading)
    return (
      <div className="h-[600px] flex justify-center items-center">
        <CircularProgress />
      </div>
    );

  if (error) return <Typography color="error">Something went wrong</Typography>;

  return (
    <div>
      <DashboardPageHeading title="Add / Edit Top-Up" />

      <form
        onSubmit={handleSubmit}
        className="p-3 md:p-5 lg:p-10 dark:bg-paper rounded-lg lg:w-10/12 glass"
      >
        {/* Cover Photo */}
        <Box>
          {form.coverPhoto ? (
            <img
              src={URL.createObjectURL(form.coverPhoto)}
              alt="Preview"
              className="w-[400px] h-[225px] rounded-md object-cover"
            />
          ) : (
            <img
              src={topup?.coverPhoto}
              alt="Preview"
              className="w-[400px] h-[225px] rounded-md object-cover"
            />
          )}

          <Button
            component="label"
            variant="contained"
            startIcon={<IoIosCloudUpload />}
            sx={{ mt: 1 }}
          >
            Upload Image
            <VisuallyHiddenInput type="file" accept="image/*" onChange={handleCoverPhotoChange} />
          </Button>
          <FormHelperText>Required image ratio: 16:9 (example: 1200×720px)</FormHelperText>
          {errors.coverPhoto && <p className="text-red-500">{errors.coverPhoto}</p>}
        </Box>

        {/* Basic Info */}
        <Stack spacing={2} mt={2}>
          <TextField
            label="Name"
            name="name"
            defaultValue={topup?.name || ''}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />
          <TextField
            label="Platform Name"
            name="platformName"
            defaultValue={topup?.platformName || ''}
            onChange={handleChange}
            error={!!errors.platformName}
            helperText={errors.platformName}
            fullWidth
          />
        </Stack>

        {/* Packages */}
        <Box mt={3}>
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
                  defaultValue={form.packageName || ''}
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
                  defaultValue={form.packagePrice || ''}
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
        </Box>

        {/* Description */}
        <Box mt={3}>
          <Typography mb={1} color="text.primary" fontSize={22}>
            Description
          </Typography>
          <CustomJoditEditor
            defaultValue={topup?.description || ''}
            onChange={value => setForm(prev => ({ ...prev, description: value }))}
          />
        </Box>

        {/* Info Fields */}
        <Box mt={3}>
          <Box>
            <AddInfoField onSubmit={val => setInfoFields(p => [...p, val])} />
            {infoFields.length ? (
              <Typography color="text.primary" fontSize={22}>
                Added Info Fields:
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
              {infoFields.map((_, index) => (
                <Grid key={index} size={1}>
                  <Box className="p-2 dark:bg-black bg-gray-100 rounded-lg relative">
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      flexWrap="wrap"
                      gap={2}
                      p={2}
                      borderRadius={2}
                    >
                      {/* Left side: Index + field details */}
                      <Stack direction="row" gap={1} flexWrap="wrap" alignItems="center">
                        <Typography variant="h6" color="primary">
                          {index + 1}.
                        </Typography>

                        <Chip label={`Name: ${_.name}`} size="small" />
                        <Chip label={`Placeholder: ${_.placeholder}`} size="small" />
                        <Chip label={`Min: ${_.minLength}`} size="small" />
                        <Chip label={`Max: ${_.maxLength}`} size="small" />
                        <Chip label={`Type: ${_.type}`} size="small" />
                        <Chip
                          label={_.optional ? 'Optional' : 'Required'}
                          size="small"
                          color={_.optional ? 'default' : 'error'}
                          variant="outlined"
                        />
                      </Stack>

                      {/* Right side: Delete button */}
                      <IconButton
                        color="error"
                        style={{
                          position: 'absolute',
                          top: '2px',
                          right: '2px',
                        }}
                        onClick={() => removeInfoField(index)}
                      >
                        <FaDeleteLeft />
                      </IconButton>
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* Actions */}
        <Stack direction="row" justifyContent="end" mt={3} spacing={2}>
          {/* <Button type="reset" onClick={handleReset} color="warning" disabled={isPending}>
            Reset
          </Button> */}
          <Button type="submit" variant="contained" color="primary" disabled={isPending}>
            {isPending ? 'Submitting...' : 'Update'}
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default Page;
