'use client';
import DashboardSectionHeading from '@/components/ui/DashboardSectionHeading';
import VisuallyHiddenInput from '@/components/ui/VisuallyHiddenInput';
import { queryClient } from '@/provider/Provider';
import { createBannerMutation } from '@/query/services/banner';
import { uploadImageToImgBB } from '@/utils/helper';
import { Box, Button, FormHelperText, Modal, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { IoIosCloudUpload } from 'react-icons/io';
import { RiImageAddFill } from 'react-icons/ri';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '80%',
    lg: '50%',
  },
  maxWidth: '800px',
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: '10px',
};

type TFormValue = {
  imageFile: File | null;
  link: string;
};
function AddNewBannerModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    if (form.imageFile === null) {
      tempErrors.imageFile = 'Image is required';
      isValid = false;
    }

    if (imageFile && imageFile.size > 10 * 1024 * 1024) {
      tempErrors.imageFile = 'Image size must be in 10MB';
      isValid = false;
    }
    setErrors(tempErrors);
    return isValid;
  };

  const { mutate, isPending } = createBannerMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const imageUrl = await uploadImageToImgBB(form.imageFile as File);

    mutate(
      {
        image: imageUrl,
        link: form.link,
      },
      {
        onSuccess: data => {
          toast.success(data.message);
          queryClient.invalidateQueries({ queryKey: ['getBanners'] });
          setOpen(false);
        },
        onError: data => {
          toast.error(data.message);
        },
      },
    );
  };

  const handleImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
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
    if (dimensions.width !== 1900 && dimensions.height !== 720) {
      setErrors(p => ({
        ...p,
        imageFile: `Invalid image size: ${dimensions.width}x${dimensions.height}`,
      }));
      return;
    }

    setForm(p => ({ ...p, imageFile: file }));
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>
        <span className="text-[100px] text-txt-secondary">
          <RiImageAddFill />
        </span>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DashboardSectionHeading title="Add New Banner" />
          <Box marginTop={2}>
            <Box>
              {form.imageFile ? <img src={URL.createObjectURL(form.imageFile)} alt="" /> : null}
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
                  value={form.link}
                  onChange={handleChange}
                  error={!!errors.link}
                  fullWidth
                />
                <p className="text-red-500">{errors.link}</p>
              </Box>
              <Button disabled={isPending} type="submit" size="large" variant="outlined">
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default AddNewBannerModal;
