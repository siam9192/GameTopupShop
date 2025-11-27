'use client';

import PurchaseForm from '@/components/forms/PurchaseForm';
import ProductDescription from '@/components/sections/common/ProductDescription';
import TopupPageHeader from '@/components/sections/common/TopupPageHeader';
import { useAppSettings } from '@/provider/AppSettingsProvider';
import { getPublicTopupByIdQuery, getTopupByIdQuery } from '@/query/services/topup';
import { ProductCategory } from '@/types/order.type';
import { CircularProgress, Stack, Typography, Divider } from '@mui/material';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

function Page() {
  const { id } = useParams();
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const { data, isLoading, isPending, error } = getPublicTopupByIdQuery(id as string);
  const { currency } = useAppSettings();

  if (isLoading || isPending)
    return (
      <div className="h-[600px] flex justify-center items-center">
        <CircularProgress />
      </div>
    );

  if (error) return <Typography color="error">Something went wrong</Typography>;

  const topup = data?.data!;
  const selectedPackage = topup.packages.find(_ => _._id === selectedPackageId)!;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* Header Section */}
      <TopupPageHeader topup={topup} />

      {/* Cover Image */}
      <div className="flex justify-center">
        <Image
          width={600}
          height={400}
          src={topup.coverPhoto}
          alt={topup.name}
          className="w-full max-w-3xl rounded-2xl shadow-lg object-cover"
        />
      </div>

      {/* Packages Section */}
      {topup.packages?.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-800">
          <Typography variant="h5" fontWeight={600} color="text.primary" gutterBottom>
            Select a Package
          </Typography>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topup.packages.map(pkg => (
              <div
                key={pkg._id}
                onClick={() => setSelectedPackageId(pkg._id)}
                className={`rounded-xl p-4 border-2 shadow-sm transition-all cursor-pointer 
                ${
                  pkg._id === selectedPackageId
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/40'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                }`}
              >
                <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                  {pkg.name}
                </Typography>
                <Typography variant="body1" color="primary" fontWeight={600}>
                  {currency.symbol}
                  {pkg.price}
                </Typography>
              </div>
            ))}
          </div>

          {selectedPackageId && (
            <div className="mt-4">
              <Divider className="my-2" />
              <Typography variant="body1" mt={2} color="text.secondary">
                Selected: <span className="font-medium text-primary">{selectedPackage.name}</span>{' '}
                for{' '}
                <span className="font-semibold text-secondary">
                  {currency.symbol}
                  {selectedPackage.price}
                </span>
              </Typography>
            </div>
          )}
        </div>
      )}

      {/* Purchase Form */}
      <div className="bg-white dark:bg-gray-950 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-800">
        <Typography variant="h5" fontWeight={600} gutterBottom color="text.primary">
          Complete Your Purchase
        </Typography>

        <Divider sx={{ my: 2 }} />

        <PurchaseForm
          productType={ProductCategory.TOP_UP}
          product={topup}
          selectedPackage={selectedPackage}
          quantity={1}
          infoFields={topup.infoFields}
        />
      </div>

      {/* Description Section */}
      {topup.description && <ProductDescription description={topup.description} />}
    </div>
  );
}

export default Page;
