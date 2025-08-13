import { useEffect } from 'react';
import { useStore } from '../state/store';
import lz from 'lz-string';

export const useURLSync = () => {
  const store = useStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    if (data) {
      try {
        const decompressed = lz.decompressFromEncodedURIComponent(data);
        const parsed = JSON.parse(decompressed);
        store.setValue('propertyPrice', parsed.propertyPrice);
        store.setValue('downPaymentPercentage', parsed.downPaymentPercentage);
        store.setValue('mortgageInterestRate', parsed.mortgageInterestRate);
        store.setValue('mortgageTerm', parsed.mortgageTerm);
        store.setValue('monthlyRent', parsed.monthlyRent);
        store.setValue('investmentReturnRate', parsed.investmentReturnRate);
        store.setValue('selectedWard', parsed.selectedWard);
        store.setValue('selectedStock', parsed.selectedStock);
      } catch (error) {
        console.error("Failed to parse URL data", error);
      }
    }
  }, []);

  useEffect(() => {
    const data = {
      propertyPrice: store.propertyPrice,
      downPaymentPercentage: store.downPaymentPercentage,
      mortgageInterestRate: store.mortgageInterestRate,
      mortgageTerm: store.mortgageTerm,
      monthlyRent: store.monthlyRent,
      investmentReturnRate: store.investmentReturnRate,
      selectedWard: store.selectedWard,
      selectedStock: store.selectedStock,
    };
    const compressed = lz.compressToEncodedURIComponent(JSON.stringify(data));
    const url = new URL(window.location.href);
    url.searchParams.set('data', compressed);
    window.history.replaceState({}, '', url);
  }, [store]);
};
