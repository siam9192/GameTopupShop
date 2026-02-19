'use client';
import React, { useState } from 'react';
import { Button, Grid, Stack, TextField, Typography, Paper } from '@mui/material';
import { Topup, TopupInfoField, TopupInfoFieldType, TopupPackage } from '@/types/topup.type';
import OrderLivePaymentInitDialog from '../ui/OrderLivePaymentInitDialog';
import { ProductCategory } from '@/types/order.type';
import OrderWalletPaymentDialog from '../sections/customer-dashboard/OrderWalletPaymentDialog';
import { Offer } from '@/types/offer.type';
import { useCurrentUser } from '@/provider/CurrentUserProvider';
import { Administrator } from '@/types/administrator.type';
import { UserRole } from '@/types/user.type';
import Link from 'next/link';

const paymentOptions = [
  {
    name: 'Wallet',
    logo: 'https://brandlogos.net/wp-content/uploads/2025/05/samsung_wallet-logo_brandlogos.net_lurfi.png',
  },
  {
    name: 'Live Payment',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2BtcbXHMWK6vsX0nLIKF2Sj8zGAIeuEwLYg&s',
  },
];

interface Props {
  infoFields: TopupInfoField[];
  product: Topup | Offer;
  selectedPackage?: TopupPackage;
  quantity: number;
  productType: ProductCategory;
}

const PurchaseForm: React.FC<Props> = ({
  infoFields,
  product,
  selectedPackage,
  quantity,
  productType,
}) => {
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showLivePaymentDialog, setShowLivePaymentDialog] = useState(false);
  const [showWalletPaymentDialog, setShowWalletPaymentDialog] = useState(false);

  const handleChange = (name: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // clear field-specific error on change
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    infoFields.forEach(field => {
      const value = formData[field.name];

      if (!field.optional && (value === undefined || value === '' || value === null)) {
        errors[field.name] = `${field.name} is required`;
        return;
      }

      if (field.type === TopupInfoFieldType.NUMBER && typeof value === 'number') {
        if (field.min !== undefined && value < field.min) {
          errors[field.name] = `${field.name} must be at least ${field.min}`;
        }
        if (field.max !== undefined && field.max !== null && value > field.max) {
          errors[field.name] = `${field.name} must be no more than ${field.max}`;
        }
      }

      if (typeof value === 'string') {
        if (field.minLength && value.length < field.minLength) {
          errors[field.name] = `${field.name} must be at least ${field.minLength} characters`;
        }
        if (field.maxLength && value.length > field.maxLength) {
          errors[field.name] = `${field.name} must be less than ${field.maxLength} characters`;
        }
      }
    });

    if (!selectedPayment) {
      setSubmitError('Please select a payment option.');
    } else {
      setSubmitError(null);
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0 && selectedPayment;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    if (!validateForm()) return;

    if (selectedPayment?.toLowerCase() === 'live payment') {
      setShowLivePaymentDialog(true);
    } else {
      setShowWalletPaymentDialog(true);
    }
  };

  const { user } = useCurrentUser();
  const role = (user as Administrator)?.level || UserRole.CUSTOMER;
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full  lg:w-1/2  mx-auto  rounded-xl space-y-8"
      >
        {/* --- Form Fields --- */}
        <div>
          <Typography color="text.primary" fontWeight={600} sx={{
           fontSize:{
            xs:18,
            md:20
           }
          }}>
            Fill The Form:
          </Typography>

          <Grid container spacing={2} marginTop={3} columns={1}>
            {infoFields?.map((field: TopupInfoField, index: number) => (
              <Grid size={1} key={index}>
                {field.type === TopupInfoFieldType.TEXTAREA ? (
                  <TextField
                    fullWidth
                    label={`${field.name}${!field.optional ? ' *' : ''}`}
                    placeholder={field.placeholder || ''}
                    multiline
                    minRows={3}
                    required={!field.optional}
                    error={!!formErrors[field.name]}
                    helperText={formErrors[field.name] || ''}
                    inputProps={{
                      minLength: field.minLength,
                      maxLength: field.maxLength,
                    }}
                    onChange={e => handleChange(field.name, e.target.value)}
                  />
                ) : (
                  <TextField
                    fullWidth
                    type={field.type === TopupInfoFieldType.NUMBER ? 'number' : 'text'}
                    label={`${field.name}${!field.optional ? ' *' : ''}`}
                    placeholder={field.placeholder || ''}
                    required={!field.optional}
                    error={!!formErrors[field.name]}
                    helperText={formErrors[field.name] || ''}
                    inputProps={{
                      min: field.min,
                      max: field.max,
                      minLength: field.minLength,
                      maxLength: field.maxLength,
                    }}
                    onChange={e =>
                      handleChange(
                        field.name,
                        field.type === TopupInfoFieldType.NUMBER
                          ? Number(e.target.value)
                          : e.target.value,
                      )
                    }
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </div>

        {/* --- Payment Options --- */}
        <div>
          <Typography color="text.primary" fontWeight={600} sx={{
           fontSize:{
            xs:18,
            md:20
           }
          }}>
            
            Choose Payment Option:
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            gap={3}
            marginTop={3}
            justifyContent="center"
            alignItems="center"
          >
            {paymentOptions.map((option, index) => (
              <Paper
                key={index}
                onClick={() => setSelectedPayment(option.name)}
                elevation={selectedPayment === option.name ? 5 : 1}
                className={`cursor-pointer transition-all  p-3 rounded-xl flex items-center gap-3 w-full sm:w-auto shadow-none  ${
                  selectedPayment === option.name
                    ? 'border-blue-500 bg-blue-50 border-2'
                    : 'border-gray-200 hover:border-blue-300 '
                }`}
              >
                <img src={option.logo} alt={option.name} className="size-10 object-contain" />
                <Typography color="primary" fontWeight={600} fontFamily={'Jost'}>
                  {option.name}
                </Typography>
              </Paper>
            ))}
          </Stack>
          {submitError && (
            <Typography color="error" fontSize={14} textAlign="center" marginTop={1}>
              {submitError}
            </Typography>
          )}
        </div>

        {/* --- Submit Button --- */}
        <div className="text-center">
          <Button
            disabled={
              !user ||
              role !== (UserRole.CUSTOMER as any) ||
              (productType === ProductCategory.TOP_UP && !selectedPackage) ||
              !!!selectedPayment
            }
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            type="submit"
          >
            Purchase Now
          </Button>
        </div>
        {productType === ProductCategory.TOP_UP && !selectedPackage ? (
          <Typography color="info" mt={2}>
            Chose a package first
          </Typography>
        ) : null}
        {!user ? (
          <Typography color="warning" mt={2}>
            You have to login first{' '}
            <Link href="/signin" className="font-medium">
              login
            </Link>
          </Typography>
        ) : null}
      </form>
      {showLivePaymentDialog ? (
        <OrderLivePaymentInitDialog
          data={{
            product,
            selectedPackage,
            quantity,
            productType,
            fieldsInfo: Object.entries(formData).map(([name, value]) => ({
              name,
              value: String(value),
            })),
          }}
          onClose={() => setShowLivePaymentDialog(false)}
        />
      ) : null}

      {showWalletPaymentDialog ? (
        <OrderWalletPaymentDialog
          data={{
            product,
            selectedPackage,
            quantity,
            productType,
            fieldsInfo: Object.entries(formData).map(([name, value]) => ({
              name,
              value: String(value),
            })),
          }}
          onClose={() => setShowWalletPaymentDialog(false)}
        />
      ) : null}
    </>
  );
};

export default PurchaseForm;
