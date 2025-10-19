'use client';
import AlertDialog from '@/components/ui/AleartDialog';
import { queryClient } from '@/provider/Provider';
import {
  deleteManualPaymentMethodMutation,
  getManualPaymentMethodByIdQuery,
} from '@/query/services/manual-payment-method';
import { ManualPaymentMethodStatus } from '@/types/manual-payment-method.type';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';

function page() {
  const { id } = useParams();

  const { data, isLoading, isPending, error } = getManualPaymentMethodByIdQuery(id as string);

  const { mutate: deleteMutate, isPending: isDeleting } = deleteManualPaymentMethodMutation();
  const router = useRouter();

  if (isLoading || isPending)
    return (
      <div className="h-[600px] flex justify-center items-center">
        <CircularProgress />
      </div>
    );

  if (error) return <Typography>{'Something went wrong'}</Typography>;

  const method = data?.data!;

  const handleDelete = () => {
    deleteMutate(method._id, {
      onSuccess: data => {
        queryClient.refetchQueries({ queryKey: ['getManualPaymentMethods'] });
        toast.success(data.message);
        router.replace('/control-dashboard/payment-methods/manual');
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to delete offer');
      },
    });
  };

  return (
    <Box className="w-full space-y-6 p-4 md:p-6 lg:p-8 rounded-lg dark:bg-paper glass">
      {/* Heading */}
      <Typography color="text.primary" variant="h4" fontWeight={700}>
        Manual Payment Method
      </Typography>
      {/* Header Actions */}
      <Stack direction="row" justifyContent="end" alignItems="center" gap={2}>
        <Button variant="contained" color="primary" startIcon={<MdEdit />}>
          Edit
        </Button>

        <AlertDialog
          onAgree={handleDelete}
          title="Are you sure?"
          description="After deleting this manual payment method, it will be permanently removed from your account and cannot be undone."
        >
          <Button disabled={isDeleting} variant="contained" color="error" startIcon={<MdDelete />}>
            Delete
          </Button>
        </AlertDialog>
      </Stack>
      {/* Logo & Basic Info */}
      <Box textAlign="center">
        <img
          src={method.logo}
          alt="Logo"
          className="mx-auto mt-4 rounded-lg shadow-md size-52 object-cover"
        />
        <Typography mt={2} color="text.primary" variant="h5" fontWeight={700}>
          {method.name}
        </Typography>

        {/* Status */}
        <Chip
          label={method.status}
          color={method.status === ManualPaymentMethodStatus.ACTIVE ? 'success' : 'default'}
          sx={{ mt: 1, px: 2 }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Description */}
      <Box>
        <Typography variant="h4" color="text.primary" fontWeight={600} mb={1}>
          Description
        </Typography>

        <div
          className="
            prose max-w-none
            text-gray-800
            dark:prose-invert
            dark:text-gray-200
            prose-headings:text-gray-900
            dark:prose-headings:text-gray-100
            prose-a:text-blue-600
            dark:prose-a:text-blue-400
            prose-strong:text-gray-900
            dark:prose-strong:text-gray-100
          "
          dangerouslySetInnerHTML={{ __html: method.description }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Meta Info */}
      <Box>
        <Typography variant="h4" color="text.primary" fontWeight={600} mb={1}>
          Metadata
        </Typography>

        <Stack spacing={1}>
          <Typography color="text.secondary">
            <strong>ID:</strong> {method._id}
          </Typography>

          <Typography color="text.secondary">
            <strong>Status:</strong> {method.status}
          </Typography>

          <Typography color="text.secondary">
            <strong>Created At:</strong> {new Date(method.createdAt).toLocaleString()}
          </Typography>

          <Typography color="text.secondary">
            <strong>Updated At:</strong> {new Date(method.updatedAt).toLocaleString()}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

export default page;
