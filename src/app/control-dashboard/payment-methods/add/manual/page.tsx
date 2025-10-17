'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import VisuallyHiddenInput from '@/components/ui/VisuallyHiddenInput';
import CustomJoditEditor from '@/components/editor/CustomJoditEditor';
import { simplifyRatio, uploadImageToImgBB } from '@/utils/helper';
import { Box, Button, Chip, FormHelperText, Stack, TextField, Typography } from '@mui/material';
import { IoIosCloudUpload } from 'react-icons/io';
import { FaDeleteLeft } from 'react-icons/fa6';
import { toast } from 'react-toastify';

import manualPaymentMethodValidations from '@/validations/manual-payment-method.validation';
import { createManualPaymentMethodMutation } from '@/query/services/manual-payment-method';
import { CreateManualPaymentMethodPayload } from '@/types/manual-payment-method.type';

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
  const { mutate, isPending } = createManualPaymentMethodMutation();

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

    const payload = {
      name: form.name,
      logo: form.logo,
      description: form.description,
    };

    const validation =
      manualPaymentMethodValidations.createManualPaymentMethodValidation.safeParse(payload);

    if (!validation.success) {
      const fieldErrors: FormError = {};
      validation.error.issues.forEach(err => {
        const field = err.path[0] as keyof FormValue;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (!form.logo) {
      setErrors(prev => ({ ...prev, coverPhoto: 'Logo image is required' }));
      return;
    }

    const toastId = toast.loading('Uploading...');
    try {
      const logoUrl = await uploadImageToImgBB(form.logo);

      const finalPayload: CreateManualPaymentMethodPayload = {
        name: form.name,
        logo: logoUrl,
        description: form.description,
      };

      mutate(finalPayload, {
        onSuccess: () => {
          toast.dismiss(toastId);
          toast.success('Payment method created successfully');
          resetForm();
        },
        onError: (error: any) => {
          toast.dismiss(toastId);
          toast.error(error.message || 'Failed to create method');
        },
      });
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
          {form.logo && (
            <img
              src={URL.createObjectURL(form.logo)}
              alt="Logo Preview"
              className="w-[200px] h-[200px] object-cover rounded"
            />
          )}

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
            value={form.name}
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
              value={form.description}
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
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default Page;
