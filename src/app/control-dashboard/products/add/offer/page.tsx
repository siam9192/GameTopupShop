'use client';
import CustomJoditEditor from '@/components/editor/CustomJoditEditor';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import VisuallyHiddenInput from '@/components/ui/VisuallyHiddenInput';
import { simplifyRatio } from '@/utils/helper';
import {
  Box,
  Button,
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

type TFormValue = {
  imageFile: File | null;
  link: string;
};

function page() {
  const [open, setOpen] = useState(false);
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
    if (simplifyRatio(dimensions.width, dimensions.height) !== '16:9') {
      setErrors(p => ({
        ...p,
        imageFile: `Invalid image ratio require ratio is 16:9`,
      }));
      return;
    }

    setForm(p => ({ ...p, imageFile: file }));
  };
  return (
    <div>
      <DashboardPageHeading title="Add Offer" />
      <form
        action=""
        className=" p-3 md:p-5 lg:p-10 space-y-3 dark:bg-paper  rounded-lg lg:w-10/12 glass"
      >
        <Box>
          {form.imageFile ? (
            <img src={URL.createObjectURL(form.imageFile)} alt="" className="w-[400px] h-[225px]" />
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
            <VisuallyHiddenInput type="file" accept="image/*" onChange={handleImageFileChange} />
          </Button>
          <FormHelperText>Required image ratio is 16:9 example size (1200x720) px</FormHelperText>
          <p className="text-red-500">{errors.imageFile}</p>
        </Box>

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
                   <Box>
          <TextField
            label="Name"
            name="name"
            value={form.link}
            onChange={handleChange}
            error={!!errors.link}
            fullWidth
          />
          <p className="text-red-500">{errors.link}</p>
        </Box>
            </Grid>
            <Grid size={1}>
            <Box>
          <TextField
            label="Price"
            name="price"
            value={form.link}
            onChange={handleChange}
            error={!!errors.link}
            fullWidth
          />
          <p className="text-red-500">{errors.link}</p>
        </Box>
            </Grid>
          </Grid>


      
        <Box>
          <Typography color="text.primary" fontSize={22}>
            Set Date & Time:
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
                label="Start From"
                name="startForm"
                type="datetime-local"
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true, // prevents label overlap with date value
                }}
              />
            </Grid>
            <Grid size={1}>
              <TextField
                label="End At"
                name="endAt"
                type="datetime-local"
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true, // prevents label overlap with date value
                }}
              />
            </Grid>
          </Grid>
          <Stack marginTop={1} direction={'row'} justifyContent={'end'}>
            <Button variant="outlined" color="secondary">
              Add Package
            </Button>
          </Stack>
        </Box>

        <Box>
          <Typography mb={1} color="text.primary" fontSize={22}>
            Description :
          </Typography>
          <CustomJoditEditor />
        </Box>
        <Stack direction={'row'} justifyContent={'end'} marginTop={2}>
          <Button color="warning">Reset</Button>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default page;
