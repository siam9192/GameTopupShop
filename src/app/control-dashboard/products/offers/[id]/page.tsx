'use client';
import AlertDialog from '@/components/ui/AleartDialog';
import { queryClient } from '@/provider/Provider';
import { deleteOfferMutation, getOfferByIdQuery } from '@/query/services/offer';
import { deleteTopupMutation, getTopupByIdQuery } from '@/query/services/topup';
import { Box, Button, Chip, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';

const infoFields = [
  {
    name: 'Phone Number',
    placeholder: 'Enter your phone number',
    type: 'number',
    minLength: 10,
    maxLength: 15,
    min: 1000000000,
    max: 999999999999999,
    optional: false,
  },
  {
    name: 'Customer Name',
    placeholder: 'Enter full name',
    type: 'text',
    minLength: 2,
    maxLength: 100,
    optional: false,
  },
  {
    name: 'Remarks',
    placeholder: 'Additional info (optional)',
    type: 'textarea',
    maxLength: 300,
    optional: true,
  },
  {
    name: 'Amount',
    placeholder: 'Enter top-up amount',
    type: 'number',
    min: 10,
    max: 5000,
    maxLength: 10,
    optional: false,
  },
  {
    name: 'Email',
    placeholder: 'Enter email address',
    type: 'text',
    minLength: 5,
    maxLength: 150,
    optional: true,
  },
];

function page() {
  const { id } = useParams();

  const { data, isLoading, isPending, error } = getOfferByIdQuery(id as string);

  const { mutate: deleteMutate, isPending: isDeleting } = deleteOfferMutation();
  const router = useRouter();

  if (isLoading || isPending)
    return (
      <div className="h-[600px] flex justify-center items-center">
        <CircularProgress />
      </div>
    );

  if (error) return <Typography>{'Something went wrong'}</Typography>;

  const offer = data?.data!;

  const handleDelete = () => {
    deleteMutate(offer._id, {
      onSuccess: data => {
        queryClient.refetchQueries({ queryKey: ['getOffers'] });
        toast.success(data.message);
        router.replace('/control-dashboard/products/offers');
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to delete offer');
      },
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Actions */}
      <Stack direction="row" justifyContent="end" alignItems="center" gap={2}>
        <Button variant="contained" startIcon={<MdEdit />}>
          Edit
        </Button>

        <AlertDialog
          onAgree={handleDelete}
          title="Are you sure?"
          description="After deleting this offer, it will be permanently removed from your account and cannot be undone."
        >
          <Button disabled={isDeleting} variant="contained" color="error" startIcon={<MdDelete />}>
            Delete
          </Button>
        </AlertDialog>
      </Stack>

      {/* Offer Title */}
      <Typography color="text.primary" variant="h4" fontWeight={700}>
        {offer.name}
      </Typography>

      {/* Platform and Status */}
      <Stack direction="row" alignItems="center" gap={2}>
        <Typography variant="h6" color="text.primary">
          Platform: {offer.platformName}
        </Typography>
        <Chip label={offer.status} variant="outlined" />
      </Stack>

      {/* Offer Image */}
      <img
        src={offer.coverPhoto}
        alt={offer.name}
        width={1000}
        height={600}
        className="mx-auto mt-4 rounded-lg shadow-md"
      />

      {/* Price and Orders */}
      <Stack direction="row" gap={4} alignItems="center" flexWrap="wrap">
        <Typography variant="h6" color="text.primary">
          💰 Price: {offer.price} USD
        </Typography>
        <Typography variant="h6" color="text.primary">
          🛒 Orders: {offer.ordersCount}
        </Typography>
      </Stack>

      {/* Dates */}
      <Stack direction="row" gap={4} flexWrap="wrap">
        <Typography variant="body1" color="text.secondary">
          🕓 Start: {new Date(offer.startDate).toLocaleString()}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          🕒 End: {new Date(offer.endDate).toLocaleString()}
        </Typography>
      </Stack>

      {/* Description */}
      <div className="mt-8 space-y-4">
        <Typography variant="h6" fontWeight={600}>
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
          dangerouslySetInnerHTML={{ __html: offer.description }}
        />
      </div>

      {/* Info Fields (if any) */}
      {offer.infoFields?.length > 0 && (
        <div className="mt-8 space-y-4">
          <Typography variant="h6" fontWeight={600}>
            Additional Info
          </Typography>

          <div className="grid gap-4 sm:grid-cols-2">
            {offer.infoFields.map((f, i) => (
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
    </div>
  );
}

export default page;
