import { useAppSettings } from '@/provider/AppSettingsProvider';
import { Offer } from '@/types/offer.type';
import { ArrowRight } from '@mui/icons-material';
import { Card, CardContent, Chip, Stack, Typography, Divider, Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';

interface Props {
  offer: Offer;
}

function OfferCard({ offer }: Props) {
   const {currency} = useAppSettings()
  return (
    <div
      className="
        overflow-hidden 
        shadow-xl
        rounded-xl 
        transition-all 
        duration-300 
        glass
      "
    >
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} className="p-4">
        {/* Cover Image */}
        <div className="flex-shrink-0">
          <img
            src={offer.coverPhoto}
            alt={offer.name}
            className="
              rounded-lg 
              w-full 
              md:w-[280px] 
              h-[180px] 
              object-cover 
              shadow-sm
            "
          />
        </div>

        {/* Offer Details */}
        <div className="flex flex-col justify-between flex-grow py-1">
          <div className="space-y-2">
            <Typography variant="h6" fontWeight={700} color="text.primary" className="line-clamp-1">
              {offer.name}
            </Typography>

            {offer.description && (
              <Typography variant="body2" color="text.secondary" className="line-clamp-2">
                {offer.description}
              </Typography>
            )}
          </div>

          <div className="flex items-center justify-between mt-4">
            <Chip
              label={` ${currency.symbol}${offer.price}`}
              color="primary"
              variant="filled"
              className="font-semibold"
            />

            <Link href={`/offers/${offer._id}`}>
              <Button size="small" variant="outlined" color="primary" endIcon={<ArrowRight />}>
                View Offer
              </Button>
            </Link>
          </div>
        </div>
      </Stack>
    </div>
  );
}

export default OfferCard;
