'use client';
import AlertDialog from '@/components/ui/AleartDialog';
import { queryClient } from '@/provider/Provider';
import { deleteTopupMutation, getTopupByIdQuery } from '@/query/services/topup';
import { Box, Button, Chip, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';

function page() {
  const { id } = useParams();

  const { data, isLoading, isPending, error } = getTopupByIdQuery(id as string);

  const { mutate: deleteTopupMutate, isPending: isDeleting } = deleteTopupMutation();
  const router = useRouter();

  if (isLoading || isPending)
    return (
      <div className="h-[600px] flex justify-center items-center">
        <CircularProgress />
      </div>
    );

  if (error) return <Typography>{'Something went wrong'}</Typography>;

  const topup = data?.data!;

  const handleDelete = () => {
    deleteTopupMutate(topup._id, {
      onSuccess: data => {
        queryClient.refetchQueries({ queryKey: ['getTopups'] });
        toast.success(data.message);
        router.replace('/control-dashboard/products/top-ups');
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to delete topup');
      },
    });
  };

  return (
    <div className="w-full space-y-8">
      {/* Header Actions */}
      <Stack direction="row" justifyContent="end" alignItems="center" gap={2}>
        <Button variant="contained" startIcon={<MdEdit />}>
          Edit
        </Button>

        <AlertDialog
          onAgree={handleDelete}
          title="Are you sure?"
          description="After deleting this top-up, it will be permanently removed from your account and cannot be undone."
        >
          <Button disabled={isDeleting} variant="contained" color="error" startIcon={<MdDelete />}>
            Delete
          </Button>
        </AlertDialog>
      </Stack>

      {/* Name + Platform */}
      <Typography variant="h4" color="text.primary" fontWeight={700}>
        {topup.name}
      </Typography>

      <Stack direction="row" alignItems="center" gap={2}>
        <Typography variant="h6" color="text.secondary">
          Platform: {topup.platformName}
        </Typography>
        <Chip label={topup.status} color={'primary'} variant="outlined" />
      </Stack>

      {/* Cover Image */}
      <img
        src={topup.coverPhoto}
        alt={topup.name}
        width={1000}
        height={600}
        className="mx-auto mt-4 rounded-lg shadow-md"
      />

      {/* Price Range & Orders */}
      <Stack direction="row" gap={4} alignItems="center" flexWrap="wrap">
        <Typography variant="h6" color="text.secondary" fontWeight={600}>
          💰 Start From: {topup.startFrom} USD
        </Typography>
        <Typography variant="h6" color="text.secondary">
          🛒 Orders: {topup.ordersCount}
        </Typography>
      </Stack>

      {/* Packages */}
      {topup.packages?.length > 0 && (
        <div className="mt-8 space-y-4">
          <Typography variant="h6" color="text.primary" fontWeight={600}>
            Packages
          </Typography>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topup.packages.map((pkg, i) => (
              <div
                key={i}
                className="
                  rounded-lg border p-4 shadow-sm
                  bg-gray-50 border-gray-200 text-gray-800
                  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200
                  transition-colors duration-300
                "
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  {pkg.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  💵 {pkg.price} USD
                </Typography>
                <Typography variant="body2" className="mt-1">
                  Status: {pkg.status}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Fields */}
      {topup.infoFields?.length > 0 && (
        <div className="mt-8 space-y-4">
          <Typography color="text.primary" variant="h6" fontWeight={600}>
            Additional Info
          </Typography>
          <div className="grid gap-4 sm:grid-cols-2">
            {topup.infoFields.map((f, i) => (
              <div
                key={i}
                className="
               rounded-lg border p-4 shadow-sm
               bg-gray-50 border-gray-200 text-gray-800
               dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200
               transition-colors duration-300
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
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <div className="mt-8 space-y-4">
        <Typography variant="h6" color="text.primary" fontWeight={600}>
          Description
        </Typography>
        <div
          // className="
          //   prose max-w-none text-gray-800
          //   dark:prose-invert dark:text-gray-200
          //   prose-headings:text-gray-900 dark:prose-headings:text-gray-100
          //   prose-a:text-blue-600 dark:prose-a:text-blue-400
          // "
          className="bg-white p-5 rounded-lg"
          dangerouslySetInnerHTML={{ __html: topup.description }}
        />
      </div>
    </div>
  );
}

export default page;
