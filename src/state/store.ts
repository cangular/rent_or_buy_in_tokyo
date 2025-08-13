import { create } from 'zustand';

export interface AppState {
  // Buy inputs
  propertyPrice: number;
  downPaymentPercentage: number;
  mortgageInterestRate: number;
  mortgageTerm: number;
  managementFeeMonthly: number;
  repairFundMonthly: number;
  homeAppreciationRate: number;
  oneTimeCostsRate: number;
  propertyTaxRate: number;
  sellingCostsRate: number;
  capitalGainsTaxRateProperty: number;

  // Rent inputs
  monthlyRent: number;
  keyMoneyMonths: number;
  agencyFeeMonths: number;
  rentGrowthRate: number;
  investmentReturnRate: number;
  securityDepositMonths: number;
  leaseRenewalFeeMonths: number;
  capitalGainsTaxRateInvestment: number;

  // App settings
  timeHorizon: number;
  selectedWard: string;
  showAdvanced: boolean;
  selectedStock: string;
  
  // Actions
  setValue: (key: keyof AppState, value: any) => void;
  toggleAdvanced: () => void;
}

export const useStore = create<AppState>((set) => ({
  // Default values from PRD and TokyoWards.md (Shinjuku)
  propertyPrice: 129900000,
  downPaymentPercentage: 20,
  mortgageInterestRate: 1.5,
  mortgageTerm: 35,
  managementFeeMonthly: 20000,
  repairFundMonthly: 15000,
  homeAppreciationRate: 6.2,
  oneTimeCostsRate: 7,
  propertyTaxRate: 1.7,
  sellingCostsRate: 3,
  capitalGainsTaxRateProperty: 20,

  monthlyRent: 190000,
  keyMoneyMonths: 1,
  agencyFeeMonths: 1,
  rentGrowthRate: 6.8,
  investmentReturnRate: 5,
  securityDepositMonths: 1,
  leaseRenewalFeeMonths: 1,
  capitalGainsTaxRateInvestment: 20,

  timeHorizon: 30,
  selectedWard: 'Shinjuku',
  showAdvanced: false,
  selectedStock: 'S&P 500',

  setValue: (key, value) => set({ [key]: value }),
  toggleAdvanced: () => set((state) => ({ showAdvanced: !state.showAdvanced })),
}));