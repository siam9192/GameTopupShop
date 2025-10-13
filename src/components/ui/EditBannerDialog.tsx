import { queryClient } from '@/provider/Provider';
import { getBannerByIdQuery, updateBannerMutation } from '@/query/services/banner';
import { UpdateBannerPayload } from '@/types/banner.type';
import { simplifyRatio, uploadImageToImgBB } from '@/utils/helper';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  TextField,
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { IoIosCloudUpload } from 'react-icons/io';
import { toast } from 'react-toastify';
import VisuallyHiddenInput from './VisuallyHiddenInput';

interface Props {
  id: string;
  onClose: () => void | any;
}

type TFormValue = {
  imageFile: File | null;
  link: string;
};

function EditBannerDialog({ id, onClose }: Props) {
  const { data, isLoading } = getBannerByIdQuery(id);
  const banner = data?.data;

  const [form, setForm] = useState<TFormValue>({ imageFile: null, link: '' });
  const [errors, setErrors] = useState<Record<keyof TFormValue, string>>({
    imageFile: '',
    link: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = { imageFile: '', link: '' };
    let isValid = true;

    const imageFile = form.imageFile;
    if (!form.link.trim()) {
      tempErrors.link = ' is required';
      isValid = false;
    }

    if (imageFile && imageFile.size > 10 * 1024 * 1024) {
      tempErrors.imageFile = 'Image size must be in 10MB';
      isValid = false;
    }
    setErrors(tempErrors);
    return isValid;
  };

  const { mutate, isPending } = updateBannerMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const payload: UpdateBannerPayload = {};

    if (form.imageFile) {
      const imageUrl = await uploadImageToImgBB(form.imageFile as File);
      payload.image = imageUrl;
    }

    if (form.link) {
      payload.link = form.link;
    }

    mutate(
      {
        id,
        payload: payload,
      },
      {
        onSuccess: data => {
          toast.success(data.message);
          queryClient.invalidateQueries({ queryKey: ['getBanners'] });
          onClose();
        },
        onError: data => {
          toast.error(data.message);
        },
      },
    );
  };

  const handleImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setErrors(p => ({ ...p, imageFile: '' }));
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
    //  if (dimensions.width !== 1900 && dimensions.height !== 720) {
    //    setErrors(p => ({
    //      ...p,
    //      imageFile: `Invalid image size: ${dimensions.width}x${dimensions.height}`,
    //    }));
    //    return;
    //  }

    if (simplifyRatio(dimensions.width, dimensions.height) !== '16:8') {
      setErrors(p => ({
        ...p,
        imageFile: `Invalid image size: ${dimensions.width}x${dimensions.height}`,
      }));
      return;
    }

    setForm(p => ({ ...p, imageFile: file }));
  };

  return (
    <Dialog open fullWidth onClose={onClose}>
      <DialogTitle>Edit Banner</DialogTitle>
      {isLoading ? (
        <CircularProgress style={{ margin: '0 auto' }} />
      ) : (
        <DialogContent>
          <Box marginTop={2}>
            <Box>
              {
                <img
                  src={form.imageFile ? URL.createObjectURL(form.imageFile) : banner?.image}
                  alt=""
                />
              }
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
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                />
              </Button>
              <FormHelperText>Image size must be 1920px * 720px</FormHelperText>
              <p className="text-red-500">{errors.imageFile}</p>
            </Box>

            {/* Form */}

            <Box
              component="form"
              onSubmit={handleSubmit}
              marginTop={2}
              display={'flex'}
              flexDirection={'column'}
              gap={2}
            >
              <Box>
                <TextField
                  label="Link"
                  name="link"
                  defaultValue={banner?.link}
                  onChange={handleChange}
                  error={!!errors.link}
                  fullWidth
                />
                <p className="text-red-500">{errors.link}</p>
              </Box>
              <Button disabled={isPending} type="submit" size="large" variant="outlined">
                Save
              </Button>
            </Box>
          </Box>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default EditBannerDialog;
