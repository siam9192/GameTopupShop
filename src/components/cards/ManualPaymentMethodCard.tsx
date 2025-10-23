import { ManualPaymentMethod } from '@/types/manual-payment-method.type';
import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import ManualPaymentMethodAddMoneySubmissionFormDialog from '../sections/customer-dashboard/ManualPaymentMethodAddMoneySubmissionFormDialog';
interface Props {
  method: ManualPaymentMethod;
}
function ManualPaymentMethodCard({ method }: Props) {
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
        View
      </Button>
      {showDetails ? (
        <ManualPaymentMethodAddMoneySubmissionFormDialog
          onClose={() => setShowDetails(false)}
          id={method._id}
        />
      ) : null}
    </Box>
  );
}

export default ManualPaymentMethodCard;
