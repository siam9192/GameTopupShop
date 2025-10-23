import { LivePaymentMethod } from '@/types/live-payment-method.type';
import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import InitLivePaymentDialog from '../sections/customer-dashboard/InitLivePaymentDialog';
interface Props {
  method: LivePaymentMethod;
}
function LivePaymentMethodCard({ method }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Box
      className="p-5 border-secondary border-2 rounded-lg flex flex-col items-center justify-between glass"
      sx={{
        width: { xs: '100%', sm: 280, md: 300 },
        textAlign: 'center',
        transition: 'all 0.3s ease',
        '&:hover': { boxShadow: 4 },
      }}
    >
      <img
        src={method.logo}
        alt={method.name}
        className="size-28 md:size-32 lg:size-40 object-contain mx-auto rounded-full "
      />
      <Typography marginTop={1} color="secondary" fontSize={16} fontWeight={600} gutterBottom>
        {method.name}
      </Typography>
      <Button onClick={() => setShowDetails(true)} variant="outlined" color="primary" size="small">
        Go to payment
      </Button>
      {showDetails ? (
        <InitLivePaymentDialog method={method} onClose={() => setShowDetails(false)} />
      ) : null}
    </Box>
  );
}

export default LivePaymentMethodCard;
