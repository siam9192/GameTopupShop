'use client';

import { useState, ChangeEvent } from 'react';
import CustomJoditEditor from '@/components/editor/CustomJoditEditor';
import AddInfoField from '@/components/sections/control-dashboard/AddInfoField';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import VisuallyHiddenInput from '@/components/ui/VisuallyHiddenInput';
import { simplifyRatio, uploadImageToImgBB } from '@/utils/helper';
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
import { FaDeleteLeft } from 'react-icons/fa6';
import { IoIosCloudUpload } from 'react-icons/io';
import offerValidation from '@/validations/offer.validation';
import { createOfferMutation } from '@/query/services/offer';
import { toast } from 'react-toastify';
import { CreateOfferPayload, OfferInfoField } from '@/types/offer.type';

type FormValue = {
  name: string;
  coverPhoto: File | null;
  platformName: string;
  description: string;
  price: string | number;
  startDate: string;
  endDate: string;
};

type FormError = Partial<Record<keyof FormValue | 'coverPhoto', string>>;

const formDefaultValue = {
  name: '',
  coverPhoto: null,
  platformName: '',
  description: '',
  price: '',
  startDate: '',
  endDate: '',
};
function Page() {
  const [infoFields, setInfoFields] = useState<OfferInfoField[]>([]);
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

  const removeInfoField = (index: number) => {
    setInfoFields(prev => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setForm({
      name: '',
      coverPhoto: null,
      platformName: '',
      description: '',
      price: '',
      startDate: '',
      endDate: '',
    });
    setInfoFields([]);
    setErrors({});
  };

  const handelReset = () => {
    setErrors({});
    setForm(formDefaultValue);
    setInfoFields([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const startDate = new Date(form.startDate).toISOString();

    const endDate = new Date(form.endDate).toISOString();
    // Prepare validation payload
    const payload = {
      ...form,
      coverPhoto: form.coverPhoto,
      price: Number(form.price),
      infoFields,
      startDate: startDate,
      endDate: endDate,
    };

    const result = offerValidation.createOfferValidation.safeParse(payload);

    if (!result.success) {
      const fieldErrors: FormError = {};
      result.error.issues.forEach(err => {
        const fieldName = err.path[0] as keyof FormValue;
        fieldErrors[fieldName] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    // upload image
    const coverPhotoUrl = await uploadImageToImgBB(form.coverPhoto as File);
    let toastId = toast.loading('Pending...');
    const finalPayload: CreateOfferPayload = {
      name: form.name!,
      platformName: form.platformName!,
      price: Number(form.price),
      description: form.description!,
      coverPhoto: coverPhotoUrl,
      startDate: startDate,
      endDate: endDate,
      infoFields,
    };

    mutate(finalPayload, {
      onSuccess: () => {
        toast.dismiss(toastId);
        toast.success('Offer created successfully');
        handelReset();
      },
      onError: error => {
        toast.dismiss(toastId);
        toast.error(error.message);
      },
    });
  };

  const { mutate, isPending } = createOfferMutation();

  return (
    <Box>
      <DashboardPageHeading title="Add Top Up" />

      <form
        onSubmit={handleSubmit}
        className="p-3 md:p-5 lg:p-10 dark:bg-paper rounded-lg lg:w-10/12 glass"
      >
        {/* Cover Photo Upload */}
        <Box>
          {form.coverPhoto && (
            <img
              src={URL.createObjectURL(form.coverPhoto)}
              alt="Cover"
              className="w-[400px] h-[225px] object-cover rounded"
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
          <FormHelperText>Required ratio: 16:9 (e.g., 1200x720)</FormHelperText>
          {errors.coverPhoto && <FormHelperText error>{errors.coverPhoto}</FormHelperText>}
        </Box>

        {/* Basic Fields */}
        <Stack mt={2} spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />

          <TextField
            label="Platform Name"
            name="platformName"
            value={form.platformName}
            onChange={handleChange}
            error={!!errors.platformName}
            helperText={errors.platformName}
            fullWidth
          />

          <TextField
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
            fullWidth
          />
        </Stack>

        {/* Date & Time */}
        <Box mt={3}>
          <Typography color="text.primary" fontSize={22} mb={1}>
            Set Date & Time:
          </Typography>
          <Grid container spacing={2} columns={2}>
            <Grid size={1}>
              <TextField
                label="Start From"
                name="startDate"
                type="datetime-local"
                value={form.startDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                error={!!errors.startDate}
                helperText={errors.startDate}
                fullWidth
                sx={{
                  '& input::-webkit-calendar-picker-indicator': {
                    filter: 'invert(60%) sepia(80%) saturate(500%) hue-rotate(160deg)', // 🎨 Adjust to your color
                    cursor: 'pointer',
                  },
                }}
              />
            </Grid>
            <Grid size={1}>
              <TextField
                label="End At"
                name="endDate"
                type="datetime-local"
                value={form.endDate}
                onChange={handleChange}
                error={!!errors.endDate}
                helperText={errors.endDate}
                InputLabelProps={{ shrink: true }}
                fullWidth
                sx={{
                  '& input::-webkit-calendar-picker-indicator': {
                    filter: 'invert(60%) sepia(80%) saturate(500%) hue-rotate(160deg)', // 🎨 Adjust to your color
                    cursor: 'pointer',
                  },
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Description */}
        <Box mt={3}>
          <Typography mb={1} color="text.primary" fontSize={22}>
            Description:
          </Typography>
          <CustomJoditEditor
            onChange={value => setForm(prev => ({ ...prev, description: value }))}
          />
        </Box>

        {/* Info Fields */}
        <Box mt={3}>
          <AddInfoField onSubmit={val => setInfoFields(prev => [...prev, val] as any)} />

          {infoFields.length > 0 && (
            <Typography color="text.primary" fontSize={22} mt={2}>
              Added Info Fields:
            </Typography>
          )}

          <Grid container spacing={2} mt={1} columns={2}>
            {infoFields.map((field, index) => (
              <Grid key={index} size={1}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    position: 'relative',
                  }}
                >
                  <Stack direction="row" flexWrap="wrap" gap={1} alignItems="center">
                    <Typography variant="h6" color="primary">
                      {index + 1}.
                    </Typography>
                    <Chip label={`Name: ${field.name}`} size="small" />
                    <Chip label={`Placeholder: ${field.placeholder}`} size="small" />
                    <Chip label={`Min: ${field.minLength}`} size="small" />
                    <Chip label={`Max: ${field.maxLength}`} size="small" />
                    <Chip label={`Type: ${field.type}`} size="small" />
                    <Chip
                      label={field.optional ? 'Optional' : 'Required'}
                      size="small"
                      color={field.optional ? 'default' : 'error'}
                      variant="outlined"
                    />
                  </Stack>
                  <IconButton
                    color="error"
                    sx={{ position: 'absolute', top: 4, right: 4 }}
                    onClick={() => removeInfoField(index)}
                  >
                    <FaDeleteLeft />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Actions */}
        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
          <Button color="warning" disabled={isPending} onClick={resetForm}>
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
