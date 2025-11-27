import { useCountdown } from '@/hooks/useCountdown';
import { useAppSettings } from '@/provider/AppSettingsProvider';
import { Offer } from '@/types/offer.type';
import { ArrowRight } from '@mui/icons-material';
import { Chip, Stack, Typography, Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';

interface Props {
  offer: Offer;
}

function OfferCard({ offer }: Props) {
  const { currency } = useAppSettings();
  const { days, hours, minutes, seconds } = useCountdown(new Date(offer.endDate).getTime());
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
      <Stack
        direction={{ xs: 'column', md: 'row', lg: 'column', xl: 'row' }}
        spacing={2}
        className="p-4"
      >
        {/* Cover Image */}
        <div className="flex-shrink-0">
          <img
            src={offer.coverPhoto}
            alt={offer.name}
            className="
              rounded-lg 
              w-full 
              md:w-[280px] 
              lg:w-full
              xl:w-[280px] 
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
          </div>

          {/* Countdown + Actions */}
          <div className="flex flex-col md:flex-row  md:items-center justify-between gap-2 md:gap-0 mt-4">
            <div className="space-y-1">
              <Chip
                label={`${currency.symbol}${offer.price}`}
                color="primary"
                variant="filled"
                className="font-semibold"
              />

              {/* Countdown Timer */}
              <Typography
                variant="body2"
                color="error"
                className="font-medium tracking-wide"
                mt={1}
              >
                ⏳ Ends in:{' '}
                <span className="text-black dark:text-white">
                  {days}d {hours}h {minutes}m {seconds}s
                </span>
              </Typography>
            </div>

            <Link href={`/offers/${offer._id}`}>
              <Button
                size="small"
                fullWidth
                variant="outlined"
                color="primary"
                endIcon={<ArrowRight />}
              >
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
