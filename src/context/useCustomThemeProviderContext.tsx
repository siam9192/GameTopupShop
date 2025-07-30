import { CustomThemeProviderContext } from '@/components/ui-provider/CustomThemeProvider';
import { useContext } from 'react';

function useCustomThemeProviderContext() {
  const context = useContext(CustomThemeProviderContext);
  if (!context) throw new Error('Must be under at them provider');
  return context;
}

export default useCustomThemeProviderContext;
