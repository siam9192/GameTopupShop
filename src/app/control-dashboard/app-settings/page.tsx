'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Divider,
  Switch,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import { getAppSettingsQuery, updateAppSettingsMutation } from '@/query/services/app-setting';
import {
  AppCurrency,
  AppSetting,
  AppStatus,
  UpdateAppSettingPayload,
} from '@/types/app-setting.type';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import { toast } from 'react-toastify';
import { IoIosCloudUpload } from 'react-icons/io';
import VisuallyHiddenInput from '@/components/ui/VisuallyHiddenInput';
import appSettingValidations from '@/validations/app-setting.validation';
import { simplifyRatio, uploadImageToImgBB } from '@/utils/helper';
import { CURRENCIES } from '@/utils/constant';
export default function AppSettingsPage() {
  const { data, isLoading } = getAppSettingsQuery();

  const { mutate: updateSetting, isPending: updating } = updateAppSettingsMutation();

  const [form, setForm] = useState<UpdateAppSettingPayload | null>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newLogo, setNewLogo] = useState<File | null>(null);
  const [newFavicon, setNewFavicon] = useState<File | null>(null);
  useEffect(() => {
    if (data?.data) {
      setForm(data.data);
    }
  }, [data]);

  if (isLoading || !form)
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  const handleChange = (key: keyof AppSetting, value: any) => {
    setForm(prev => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleNestedChange = (
    section: 'notification' | 'order' | 'wallet' | 'socialLinks',
    key: string,
    value: any,
  ) => {
    setForm(prev =>
      prev
        ? {
            ...prev,
            [section]: {
              ...prev[section],
              [key]: value,
            },
          }
        : prev,
    );
  };

  const handleSubmit = async () => {
    if (!form) return;
    const { favicon, logo, ...others } = form;

    const result = appSettingValidations.updateAppSettingValidation.safeParse({
      ...others,
      favicon: newFavicon,
      logo: newLogo,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(err => {
        const fieldName = err.path.join('.') as string;
        fieldErrors[fieldName] = err.message;
        console.log(fieldErrors);
      });

      setErrors(fieldErrors);
      return;
    }

    const payload: UpdateAppSettingPayload = {
      ...others,
    };

    if (newFavicon) {
      payload.favicon = await uploadImageToImgBB(newFavicon);
    }

    if (newLogo) {
      payload.logo = await uploadImageToImgBB(newLogo);
    }

    updateSetting(payload, {
      onSuccess: data => {
        toast.success(data.message);
      },
      onError: data => {
        toast.error(data.message);
      },
    });
  };
  const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>, name: string) => {
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
    if (simplifyRatio(dimensions.width, dimensions.height) !== '1:1') {
      setErrors(p => ({
        ...p,
        [name]: 'Invalid ration 1:1 ratio is required',
      }));
      return;
    }

    if (name === 'logo') {
      setNewLogo(file);
    } else if (name === 'favicon') {
      setNewFavicon(file);
    }
  };

  const settings = data?.data!;

  return (
    <div>
      <DashboardPageHeading title="App Settings" />
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
        <TextField
          label="App Name"
          fullWidth
          margin="normal"
          defaultValue={settings.name || ''}
          onChange={e => handleChange('name', e.target.value)}
          error={!!errors.name}
          helperText={errors.name || ''}
        />

        {/* Logo Upload */}
        <Box>
          <img
            src={newLogo ? URL.createObjectURL(newLogo) : form.logo}
            alt="Cover"
            className="size-52 outline-2 outline-offset-1 object-cover rounded"
          />

          <Button
            component="label"
            variant="contained"
            startIcon={<IoIosCloudUpload />}
            sx={{ mt: 1 }}
          >
            Upload Logo
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={e => handlePhotoChange(e, 'logo')}
            />
          </Button>
          <FormHelperText>Required ratio: 1:1 (e.g., 100 X 100 px)</FormHelperText>
          {errors?.logo && <FormHelperText error>{errors.logo}</FormHelperText>}
        </Box>

        {/* Favicon Upload */}
        <Box>
          <img
            src={newFavicon ? URL.createObjectURL(newFavicon) : form.favicon}
            alt="Cover"
            className="size-52 outline-2 outline-offset-1 object-cover rounded"
          />

          <Button
            component="label"
            variant="contained"
            startIcon={<IoIosCloudUpload />}
            sx={{ mt: 1 }}
          >
            Upload Favicon
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={e => handlePhotoChange(e, 'favIcon')}
            />
          </Button>
          <FormHelperText>Required ratio: 1:1 (e.g., 100 X 100 px)</FormHelperText>
          {errors?.favicon && <FormHelperText error>{errors.favIcon}</FormHelperText>}
        </Box>

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          defaultValue={settings.description || ''}
          onChange={e => handleChange('description', e.target.value)}
          error={!!errors.description}
          helperText={errors.description || ''}
        />

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Contact Info</Typography>
        <TextField
          label="Support Email"
          fullWidth
          margin="normal"
          defaultValue={settings.supportEmail || ''}
          onChange={e => handleChange('supportEmail', e.target.value)}
          error={!!errors.supportEmail}
          helperText={errors.supportEmail || ''}
        />
        <TextField
          label="Phone Number"
          fullWidth
          margin="normal"
          defaultValue={settings.phoneNumber || ''}
          onChange={e => handleChange('phoneNumber', e.target.value)}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber || ''}
        />
        <TextField
          label="Address"
          fullWidth
          margin="normal"
          defaultValue={settings.address || ''}
          onChange={e => handleChange('address', e.target.value)}
          error={!!errors.address}
          helperText={errors.address || ''}
        />

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Preferences</Typography>
        <TextField
          label="Currency"
          fullWidth
          select
          margin="normal"
          defaultValue={settings.currency || ''}
          onChange={e => handleChange('currency', e.target.value)}
          error={!!errors.currency}
          helperText={errors.currency || ''}
        >
          {CURRENCIES.map(currency => (
            <MenuItem key={currency.code} value={currency.code}>
              {currency.code}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Timezone"
          disabled
          fullWidth
          margin="normal"
          defaultValue={settings.timezone || ''}
          onChange={e => handleChange('timezone', e.target.value)}
        />
        <TextField
          label="Language"
          fullWidth
          disabled
          margin="normal"
          defaultValue={settings?.language || ''}
          onChange={e => handleChange('language', e.target.value)}
        />

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Social Links</Typography>
        {Object.keys(settings!.socialLinks!).map(key => (
          <TextField
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            fullWidth
            margin="normal"
            defaultValue={(settings.socialLinks as any)[key]}
            onChange={e => handleNestedChange('socialLinks', key, e.target.value)}
            error={!!errors[`socialLinks.${key}`]}
            helperText={errors[`socialLinks.${key}`]}
          />
        ))}

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Notifications</Typography>
        <FormControlLabel
          sx={{
            color: 'text.primary',
          }}
          control={
            <Switch
              defaultChecked={Boolean(settings.notification.enableCustomerNotification)}
              onChange={e =>
                handleNestedChange('notification', 'enableCustomerNotification', e.target.checked)
              }
            />
          }
          label="Enable Customer Notification"
        />
        <FormControlLabel
          sx={{
            color: 'text.primary',
          }}
          control={
            <Switch
              defaultChecked={Boolean(settings.notification.enableAdministratorNotification)}
              onChange={e =>
                handleNestedChange(
                  'notification',
                  'enableAdministratorNotification',
                  e.target.checked,
                )
              }
            />
          }
          label="Enable Administrator Notification"
        />

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Order Settings</Typography>
        <FormControlLabel
          sx={{
            color: 'text.primary',
          }}
          control={
            <Switch
              defaultChecked={settings.order.enableTopupOrder}
              onChange={e => handleNestedChange('order', 'enableTopupOrder', e.target.checked)}
            />
          }
          label="Enable Topup Orders"
        />
        <FormControlLabel
          sx={{
            color: 'text.primary',
          }}
          control={
            <Switch
              defaultChecked={settings.order.enableOfferOrder}
              onChange={e => handleNestedChange('order', 'enableOfferOrder', e.target.checked)}
            />
          }
          label="Enable Offer Orders"
        />

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Wallet Settings</Typography>
        <FormControlLabel
          sx={{
            color: 'text.primary',
          }}
          control={
            <Switch
              defaultChecked={settings.wallet.enableAddBalance}
              onChange={e => handleNestedChange('wallet', 'enableAddBalance', e.target.checked)}
            />
          }
          label="Enable Add Balance"
        />
        <FormControlLabel
          sx={{
            color: 'text.primary',
          }}
          control={
            <Switch
              defaultChecked={settings.wallet.enableWalletSubmission}
              onChange={e =>
                handleNestedChange('wallet', 'enableWalletSubmission', e.target.checked)
              }
            />
          }
          label="Enable Wallet Submission"
        />

        <Divider sx={{ my: 2 }} />

        <TextField
          label="App Status"
          select
          fullWidth
          margin="normal"
          defaultValue={settings.appStatus || ''}
          onChange={e => handleChange('appStatus', e.target.value)}
        >
          {Object.values(AppStatus).map(status => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>

        <Button
          disabled={updating}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleSubmit}
        >
          Save Settings
        </Button>
      </Box>
    </div>
  );
}

/* --- Helper Components --- */
function SettingCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          {title}
        </Typography>
        <Stack spacing={1.5}>{children}</Stack>
      </CardContent>
    </Card>
  );
}

function SwitchRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography fontSize={15} color="text.secondary">
        {label}
      </Typography>
      <Switch checked={checked} onChange={e => onChange(e.target.checked)} />
    </Stack>
  );
}
