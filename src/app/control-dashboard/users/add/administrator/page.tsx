'use client';
import CustomJoditEditor from '@/components/editor/CustomJoditEditor';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import VisuallyHiddenInput from '@/components/ui/VisuallyHiddenInput';
import { simplifyRatio } from '@/utils/helper';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
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
      <DashboardPageHeading title="Add Administrator" />
      <form
        action=""
        className=" p-3 md:p-5 lg:p-10 space-y-3 dark:bg-paper  glass  rounded-lg lg:w-10/12 "
      >
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Level</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={''}
                  label="Level"
                  fullWidth
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Admin</MenuItem>
                  <MenuItem value={20}>Moderator</MenuItem>
                  <MenuItem value={30}>Supporter</MenuItem>
                </Select>
              </FormControl>
              <p className="text-red-500">{errors.link}</p>
            </Box>
          </Grid>
        </Grid>
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
                label="Email Address"
                name="email"
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Expire In</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={''}
                  label="Level"
                  fullWidth
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>24 Hours</MenuItem>
                  <MenuItem value={20}>3 Days</MenuItem>
                  <MenuItem value={30}>7 Days</MenuItem>
                  <MenuItem value={30}>15 Days</MenuItem>
                  <MenuItem value={30}>1 Month</MenuItem>
                </Select>
              </FormControl>
              <p className="text-red-500">{errors.link}</p>
            </Box>
          </Grid>
        </Grid>
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
