'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import VisuallyHiddenInput from '@/components/ui/VisuallyHiddenInput';
import CustomJoditEditor from '@/components/editor/CustomJoditEditor';
import { simplifyRatio, uploadImageToImgBB } from '@/utils/helper';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { IoIosCloudUpload } from 'react-icons/io';
import { FaDeleteLeft } from 'react-icons/fa6';
import { toast } from 'react-toastify';

import manualPaymentMethodValidations, {
  UpdateManualPaymentMethodValidation,
} from '@/validations/manual-payment-method.validation';
import {
  createManualPaymentMethodMutation,
  getManualPaymentMethodByIdQuery,
  updateManualPaymentMethodMutation,
} from '@/query/services/manual-payment-method';
import {
  CreateManualPaymentMethodPayload,
  UpdateManualPaymentMethodPayload,
} from '@/types/manual-payment-method.type';
import { useParams, useRouter } from 'next/navigation';

type FormValue = {
  name: string;
  logo: File | null;
  description: string;
  numbers: string[];
  number: string;
};

type FormError = Partial<Record<keyof FormValue | 'coverPhoto', string>>;

const formDefaultValue: FormValue = {
  name: '',
  logo: null,
  description: '',
  numbers: [],
  number: '',
};

function Page() {
  const [form, setForm] = useState<FormValue>(formDefaultValue);
  const [errors, setErrors] = useState<FormError>({});
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, isPending, error } = getManualPaymentMethodByIdQuery(id as string);
  const { mutate, isPending: isUpdating } = updateManualPaymentMethodMutation();
  const router = useRouter();

  useEffect(() => {
    if (!data?.success || isLoading || error || !data?.data) return;

    const method = data.data;

    setForm({
      name: method.name,
      logo: null,
      description: method.description,
      numbers: [],
      number: '',
    });
  }, [data, isLoading, error]);

  if (isLoading || isPending)
    return (
      <div className="h-[600px] flex justify-center items-center">
        <CircularProgress />
      </div>
    );

  if (error) return <Typography>{'Something went wrong'}</Typography>;

  const method = data?.data!;
  // -------------------------------------------------------------
  // ✅ Handlers
  // -------------------------------------------------------------
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image ratio (1:1)
    const dimensions = await new Promise<{ width: number; height: number }>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => reject(new Error('Image load failed'));
      img.src = URL.createObjectURL(file);
    });

    if (simplifyRatio(dimensions.width, dimensions.height) !== '1:1') {
      setErrors(prev => ({
        ...prev,
        coverPhoto: 'Invalid image ratio. Required: 1:1',
      }));
      return;
    }

    setErrors(prev => ({ ...prev, coverPhoto: undefined }));
    setForm(prev => ({ ...prev, logo: file }));
  };

  const addNumber = () => {
    setErrors({});
    const trimmed = form.number.trim();

    if (!trimmed) return setErrors({ number: 'Number is required' });
    if (!/^[0-9]{6,15}$/.test(trimmed))
      return setErrors({ number: 'Enter a valid number (6–15 digits)' });
    if (form.numbers.includes(trimmed)) return setErrors({ number: 'This number already exists' });

    setForm(prev => ({
      ...prev,
      numbers: [...prev.numbers, trimmed],
      number: '',
    }));
  };

  const removeNumber = (index: number) => {
    setForm(prev => ({
      ...prev,
      numbers: prev.numbers.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setForm(formDefaultValue);
    setErrors({});
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const payload: UpdateManualPaymentMethodValidation = {
      name: form.name,
      description: form.description,
    };

    if (form.logo) {
      payload.logo = form.logo;
    }

    const validation =
      manualPaymentMethodValidations.updateManualPaymentMethodValidation.safeParse(payload);

    if (!validation.success) {
      const fieldErrors: FormError = {};
      validation.error.issues.forEach(err => {
        const field = err.path[0] as keyof FormValue;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const toastId = toast.loading('Updating...');
    try {
      const finalPayload: UpdateManualPaymentMethodPayload = {
        name: form.name,
        description: form.description,
      };

      if (form.logo) {
        finalPayload.logo = await uploadImageToImgBB(form.logo);
      }

      mutate(
        {
          id,
          payload: finalPayload,
        },
        {
          onSuccess: () => {
            toast.dismiss(toastId);
            toast.success('Payment method updated successfully');
            router.push('/control-dashboard/payment-methods/manual');
          },
          onError: (error: any) => {
            toast.dismiss(toastId);
            toast.error(error.message);
          },
        },
      );
    } catch {
      toast.dismiss(toastId);
      toast.error('Image upload failed');
    }
  };
  // -------------------------------------------------------------
  // ✅ Render
  // -------------------------------------------------------------

  return (
    <Box>
      <DashboardPageHeading title="Add Manual Payment Method" />

      <form
        onSubmit={handleSubmit}
        className="p-3 md:p-5 lg:p-10 dark:bg-paper rounded-lg lg:w-10/12 glass"
      >
        {/* ---------------- Logo Upload ---------------- */}
        <Box>
          <img
            src={form.logo ? URL.createObjectURL(form.logo) : method.logo}
            alt="Logo Preview"
            className="w-[200px] h-[200px] object-cover rounded outline-2 outline-offset-2"
          />

          <Button
            component="label"
            variant="contained"
            startIcon={<IoIosCloudUpload />}
            sx={{ mt: 1 }}
          >
            Upload Image
            <VisuallyHiddenInput type="file" accept="image/*" onChange={handleLogoChange} />
          </Button>

          <FormHelperText>Required ratio: 1:1 (e.g., 400x400)</FormHelperText>
          {errors.coverPhoto && <FormHelperText error>{errors.coverPhoto}</FormHelperText>}
        </Box>

        {/* ---------------- Basic Info ---------------- */}
        <Stack spacing={3} mt={3}>
          {/* Name */}
          <TextField
            label="Name"
            name="name"
            defaultValue={method.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />

          {/* Add Number */}
          <Box
            sx={{
              display: 'none',
            }}
          >
            <TextField
              label="Number"
              name="number"
              value={form.number}
              onChange={handleChange}
              error={!!errors.number}
              helperText={errors.number}
              fullWidth
            />
            <Stack direction="row" justifyContent="flex-end" mt={1}>
              <Button variant="outlined" onClick={addNumber}>
                Add Number
              </Button>
            </Stack>

            {form.numbers.length > 0 && (
              <Stack direction="row" flexWrap="wrap" gap={1} mt={2}>
                {form.numbers.map((num, i) => (
                  <Chip
                    key={i}
                    label={num}
                    onDelete={() => removeNumber(i)}
                    color="primary"
                    variant="outlined"
                    deleteIcon={<FaDeleteLeft />}
                  />
                ))}
              </Stack>
            )}
          </Box>

          {/* Description */}
          <Box>
            <Typography color="text.primary" mb={1} fontSize={18} fontWeight={600}>
              Description
            </Typography>
            <CustomJoditEditor
              defaultValue={method.description}
              onChange={value => setForm(prev => ({ ...prev, description: value }))}
            />
            {errors.description && <FormHelperText error>{errors.description}</FormHelperText>}
          </Box>
        </Stack>

        {/* ---------------- Actions ---------------- */}
        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={4}>
          <Button color="warning" disabled={isPending} onClick={resetForm} variant="outlined">
            Reset
          </Button>
          <Button type="submit" disabled={isPending} variant="contained" color="primary">
            Save
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default Page;
