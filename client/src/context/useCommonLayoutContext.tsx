import { CommonLayoutContext } from '@/app/(common-layout)/layout';
import { useContext } from 'react';

function useCommonLayoutContext() {
  const context = useContext(CommonLayoutContext);
  if (!context) throw new Error('Must be under at common layout');
  return context;
}

export default useCommonLayoutContext;
