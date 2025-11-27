import PreviewEditorValue from '@/components/ui/PreviewEditorValue';
import { Typography } from '@mui/material';
import React from 'react';
interface Props {
  description: string;
}
function ProductDescription({ description }: Props) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <Typography variant="h5" fontWeight={600} gutterBottom color="text.primary">
        Description
      </Typography>
      <div>
        <PreviewEditorValue value={description} />
      </div>
    </div>
  );
}

export default ProductDescription;
