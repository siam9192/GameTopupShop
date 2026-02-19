import ManualPaymentForm from '@/components/forms/ManualPaymentAddMoneySubmissionForm';
import PreviewEditorValue from '@/components/ui/PreviewEditorValue';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { getPublicManualPaymentMethodByIdQuery } from '@/query/services/manual-payment-method';

interface Props {
  id: string;
  onClose: () => void;
}

function ManualPaymentMethodAddMoneySubmissionFormDialog({ id, onClose }: Props) {
  const { data, isLoading } = getPublicManualPaymentMethodByIdQuery(id);
  const method = data?.data;

  return (
    <Dialog open fullWidth maxWidth="md" onClose={onClose}>
      <DialogTitle sx={{ fontWeight: 600, textAlign: 'center', fontSize: 22 }}>
        {method?.name || 'Manual Payment Method'}
      </DialogTitle>

      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" py={6}>
          <CircularProgress />
        </Box>
      ) : method ? (
        <DialogContent>
          {/* --- Method Header --- */}

          <Avatar
            src={method.logo}
            alt={method.name}
            sx={{
              width: 120,
              height: 120,
              border: '2px solid #e0e0e0',
            }}
            className="mx-auto"
          />

          {/* --- Description --- */}
          <Box my={2}>
            <Typography variant="subtitle1" fontWeight={600} color="text.primary" gutterBottom>
              Instructions:
            </Typography>
            <PreviewEditorValue value={method.description || '<p>No description available.</p>'} />
          </Box>

          {/* --- Divider --- */}
          <Divider sx={{ my: 3 }} />

          {/* --- Payment Form --- */}
          <Box mt={3}>
            <Typography variant="subtitle1" fontWeight={600} color="text.primary" gutterBottom>
              Submit Your Payment Details:
            </Typography>
            <ManualPaymentForm methodId={id} />
          </Box>
        </DialogContent>
      ) : (
        <Typography textAlign="center" color="text.secondary" p={4}>
          Payment method not found.
        </Typography>
      )}

      <DialogActions sx={{ justifyContent: 'center', py: 2 }}>
        <Button onClick={onClose} variant="outlined" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ManualPaymentMethodAddMoneySubmissionFormDialog;
