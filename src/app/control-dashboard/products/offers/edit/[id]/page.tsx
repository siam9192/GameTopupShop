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
import { toast } from 'react-toastify';

import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import VisuallyHiddenInput from '@/components/ui/VisuallyHiddenInput';
import CustomJoditEditor from '@/components/editor/CustomJoditEditor';

import { simplifyRatio, uploadImageToImgBB } from '@/utils/helper';
import offerValidation from '@/validations/offer.validation';
import { getOfferByIdQuery, updateOfferMutation } from '@/query/services/offer';
import { OfferInfoField, UpdateOfferPayload } from '@/types/offer.type';
import AddInfoField from '@/components/sections/control-dashboard/AddInfoField';
import { FaDeleteLeft } from 'react-icons/fa6';

type FormValue = {
  name: string;
  coverPhoto: File | null;
  platformName: string;
  description: string;
  price: string | number;
  startDate: string;
  endDate: string;
};


type FormError = Record<string, string>;

const formDefaultValue: FormValue = {
  name: '',
  coverPhoto: null,
  platformName: '',
   price:'',
  description: '',
  startDate:'',
  endDate:''
};

function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [infoFields, setInfoFields] = useState<OfferInfoField[]>([]);
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

  const removeInfoField = (index: number) => {
    setInfoFields(prev => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setForm(formDefaultValue);
    setErrors({});
    setInfoFields([]);
  };

  const { mutate, isPending } = updateOfferMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    const startDate = new Date(form.startDate).toISOString();
   
       const endDate = new Date(form.endDate).toISOString();
       // Prepare validation payload
       const payload:UpdateOfferPayload = {
         name:form.name,
         platformName:form.platformName,
         price: Number(form.price),
         description:form.description,
         infoFields,
         startDate: startDate,
         endDate: endDate,
       };
   
       const result = offerValidation.updateOfferValidation.safeParse(payload);
   
       if (!result.success) {
         const fieldErrors: FormError = {};
         result.error.issues.forEach(err => {
           const fieldName = err.path[0] as keyof FormValue;
           fieldErrors[fieldName] = err.message;
         });
   
         setErrors(fieldErrors);
         return;
       }
    if (form.coverPhoto) {
      payload.coverPhoto = await uploadImageToImgBB(form.coverPhoto);
    }




    const toastId = toast.loading('Submitting...');
    mutate(
      { id: offer!._id as string, payload },
      {
        onSuccess: () => {
          toast.dismiss(toastId);
          toast.success('Top-up updated successfully');
          handleReset();
          router.push('/control-dashboard/products/offers');
        },
        onError: error => {
          toast.dismiss(toastId);
          toast.error(error.message || 'Failed to create top-up');
        },
      },
    );
  };

  const { data, isLoading, error } = getOfferByIdQuery(id as string);
  const offer = data?.data;

  useEffect(() => {
    if (!data?.success || isLoading || error || !data?.data) return;

    const offer = data.data;

    setInfoFields(offer.infoFields);

    setForm({
      name: offer.name,
      coverPhoto: null,
      platformName: offer.platformName,
       price:offer.price,
      description: offer.description,
      startDate:offer.startDate,
      endDate:offer.endDate
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
              src={offer?.coverPhoto}
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
            defaultValue={offer?.name || ''}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />
          <TextField
            label="Platform Name"
            name="platformName"
            defaultValue={offer?.platformName || ''}
            onChange={handleChange}
            error={!!errors.platformName}
            helperText={errors.platformName}
            fullWidth
          />
            <TextField
            label="Price"
            name="price"
            type="number"
            defaultValue={offer?.price}
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
               defaultValue={ new Date(offer?.startDate||new Date()).toISOString().slice(0, 16)}
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
         defaultValue={ new Date(offer?.endDate||new Date()).toISOString().slice(0, 16)}
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


        {/* Info Fields */}
        <Box mt={3}>
          <AddInfoField onSubmit={val => setInfoFields(prev => [...prev, val] as any)} />

          {infoFields.length > 0 && (
            <Typography color="text.primary" fontSize={22} mt={2}>
              Added Info Fields:
            </Typography>
          )}

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

        {/* Description */}
        <Box mt={3}>
          <Typography mb={1} color="text.primary" fontSize={22}>
            Description
          </Typography>
          <CustomJoditEditor
            defaultValue={offer?.description || ''}
            onChange={value => setForm(prev => ({ ...prev, description: value }))}
          />
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
