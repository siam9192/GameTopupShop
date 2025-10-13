'use client';
import { TopupInfoField, TopupInfoFieldType } from '@/types/topup.type';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import React, { useState } from 'react';

type FormValue = {
  name: string;
  placeholder?: string;
  type: TopupInfoFieldType;
  minLength?: number;
  maxLength?: number;
  optional: boolean;
};

type FormError = Record<keyof FormValue | string, string>;

interface Props {
  onSubmit: (value: TopupInfoField) => void | any;
}

const defaultFormValue = {
  name: '',
  type: TopupInfoFieldType.TEXT,
  optional: false,
};

function AddInfoField({ onSubmit }: Props) {
  const [form, setForm] = useState<FormValue>(defaultFormValue);
  const [errors, setErrors] = useState<FormError>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const reset = () => {
    setForm(defaultFormValue);
    setErrors({});
  };

  const validate = () => {
    const newErrors: FormError = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.placeholder) newErrors.placeholder = 'Placeholder is required';

    if (
      form.minLength !== null &&
      form.maxLength !== null &&
      Number(form.minLength) > Number(form.maxLength)
    ) {
      newErrors.maxLength = 'Max length must be greater than min length';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const { name, placeholder, minLength, maxLength, type, optional } = form;
    const data: FormValue = {
      name,
      type,
      optional,
    };

    if (placeholder) data['placeholder'] = placeholder;
    if (minLength) data['minLength'] = Number(minLength);
    if (maxLength) data['maxLength'] = Number(maxLength);
    onSubmit(data as any);
    reset();
  };

  return (
    <Box marginTop={2}>
      <Typography mb={1} color="text.primary" fontSize={22}>
        Add Info Field :
      </Typography>
      <Grid marginTop={2} container columns={{ xs: 1, md: 2 }} spacing={2}>
        <Grid size={1}>
          <TextField
            label="Name"
            name="name"
            value={form.name || ''}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />
        </Grid>

        <Grid size={1}>
          <TextField
            label="Placeholder"
            name="placeholder"
            value={form.placeholder || ''}
            onChange={handleChange}
            error={!!errors.placeholder}
            helperText={errors.placeholder}
            fullWidth
          />
        </Grid>

        {form.type === TopupInfoFieldType.TEXT ? (
          <>
            <Grid size={1}>
              <TextField
                label="Min Length"
                name="minLength"
                type="number"
                value={form.minLength ?? ''}
                onChange={handleChange}
                error={!!errors.minLength}
                helperText={errors.minLength}
                fullWidth
              />
            </Grid>
            <Grid size={1}>
              <TextField
                label="Max Length"
                name="maxLength"
                type="number"
                value={form.maxLength ?? ''}
                onChange={handleChange}
                error={!!errors.maxLength}
                helperText={errors.maxLength}
                fullWidth
              />
            </Grid>
          </>
        ) : null}

        <Grid size={1}>
          <InputLabel id="type">Type</InputLabel>
          <Select
            labelId="type"
            name="type"
            value={form.type || ''}
            onChange={handleChange as any}
            fullWidth
            required
          >
            {Object.values(TopupInfoFieldType).map(t => (
              <MenuItem key={t} value={t}>
                {t.replace('_', ' ')}
              </MenuItem>
            ))}
          </Select>
          {errors.type && <p className="text-red-500">{errors.type}</p>}
        </Grid>
        <Grid size={1}>
          <InputLabel id="option-required">Required Or Optional</InputLabel>
          <Select
            labelId="optional-required"
            value={form.optional ? 'optional' : 'required'}
            onChange={e => setForm(p => ({ ...p, optional: e.target.value === 'optional' }))}
            fullWidth
            required
          >
            <MenuItem value={'required'}>Required</MenuItem>
            <MenuItem value={'optional'}>Optional</MenuItem>
          </Select>
          {errors.type && <p className="text-red-500">{errors.type}</p>}
        </Grid>
      </Grid>

      <Stack mt={3} direction={'row'} alignItems={'end'} justifyContent={'end'}>
        <Button type="button" variant="outlined" color="secondary" onClick={handleSubmit}>
          Add Field
        </Button>
      </Stack>
    </Box>
  );
}

export default AddInfoField;
