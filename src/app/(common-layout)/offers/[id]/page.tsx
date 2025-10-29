'use client';

import PurchaseForm from '@/components/forms/PurchaseForm';
import PreviewEditorValue from '@/components/ui/PreviewEditorValue';
import { useAppSettings } from '@/provider/AppSettingsProvider';
import { getOfferByIdQuery } from '@/query/services/offer';
import { ProductCategory } from '@/types/order.type';
import { CircularProgress, Stack, Typography, Divider } from '@mui/material';
import { useParams } from 'next/navigation';

function Page() {
  const { id } = useParams();
  const { data, isLoading, isPending, error } = getOfferByIdQuery(id as string);
    const {currency} = useAppSettings()
  if (isLoading || isPending)
    return (
      <div className="h-[600px] flex justify-center items-center">
        <CircularProgress />
      </div>
    );

  if (error) return <Typography color="error">Something went wrong</Typography>;

  const offer = data?.data!;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* Header Section */}
      <div className="text-center space-y-3">
        <Typography variant="h4" fontWeight={700} color="text.primary">
          {offer.name}
        </Typography>

        <Typography variant="h6" color="text.secondary">
          Platform: <span className="font-medium text-primary">{offer.platformName}</span>
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Price: <span className="font-medium text-secondary">{currency.symbol}{offer.price}</span>
        </Typography>
      </div>

      {/* Cover Image */}
      <div className="flex justify-center">
        <img
          src={offer.coverPhoto}
          alt={offer.name}
          className="w-full max-w-3xl rounded-2xl shadow-lg object-cover"
        />
      </div>

      {/* Purchase Form */}
      <div className="bg-white dark:bg-gray-950 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-800">
        <Typography variant="h5" fontWeight={600} gutterBottom color="text.primary">
          Complete Your Purchase
        </Typography>

        <Divider sx={{ my: 2 }} />

        <PurchaseForm
          productType={ProductCategory.TOP_UP}
          product={offer}
          quantity={1}
          infoFields={offer.infoFields as any}
        />
      </div>

      {/* Description Section */}
      {offer.description && (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <Typography variant="h5" fontWeight={600} gutterBottom color="text.primary">
            Description
          </Typography>
          <div>
            <PreviewEditorValue value={offer.description} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
