import { AppState } from '../../state/store';

export interface CalculationResult {
  buyNetWorth: number[];
  rentNetWorth: number[];
  buyEquity: number[];
  buyLoanBalance: number[];
  rentInvestmentValue: number[];
}

export const calculate = (state: AppState): CalculationResult => {
  const {
    propertyPrice,
    downPaymentPercentage,
    mortgageInterestRate,
    mortgageTerm,
    managementFeeMonthly,
    repairFundMonthly,
    homeAppreciationRate,
    oneTimeCostsRate,
    propertyTaxRate,
    sellingCostsRate,
    capitalGainsTaxRateProperty,
    monthlyRent,
    keyMoneyMonths,
    agencyFeeMonths,
    rentGrowthRate,
    investmentReturnRate,
    securityDepositMonths,
    leaseRenewalFeeMonths,
    capitalGainsTaxRateInvestment,
    timeHorizon,
  } = state;

  // Buy scenario calculations
  const downPaymentAmount = propertyPrice * (downPaymentPercentage / 100);
  const loanAmount = propertyPrice - downPaymentAmount;
  const mortgageInterestRateMonthly = mortgageInterestRate / 100 / 12;
  const mortgageTermMonths = mortgageTerm * 12;
  const monthlyMortgagePayment = loanAmount * (mortgageInterestRateMonthly * Math.pow(1 + mortgageInterestRateMonthly, mortgageTermMonths)) / (Math.pow(1 + mortgageInterestRateMonthly, mortgageTermMonths) - 1);

  const oneTimeCosts = propertyPrice * (oneTimeCostsRate / 100);
  const annualHoldingCosts = (managementFeeMonthly + repairFundMonthly) * 12 + propertyPrice * (propertyTaxRate / 100);

  const buyNetWorth: number[] = [-(downPaymentAmount + oneTimeCosts)];
  const buyEquity: number[] = [downPaymentAmount];
  const buyLoanBalance: number[] = [loanAmount];
  let currentLoanBalance = loanAmount;
  let currentPropertyValue = propertyPrice;

  // Rent scenario calculations
  const initialRentCosts = monthlyRent * (keyMoneyMonths + agencyFeeMonths + securityDepositMonths);
  const refundableSecurityDeposit = monthlyRent * securityDepositMonths;
  const rentInvestmentValue: number[] = [-initialRentCosts];
  const rentNetWorth: number[] = [refundableSecurityDeposit];
  let currentMonthlyRent = monthlyRent;
  let investmentPortfolio = 0;
  
  for (let year = 1; year <= timeHorizon; year++) {
    // Buy scenario year-by-year
    let interestPaid = 0;
    let principalPaid = 0;
    for (let month = 0; month < 12; month++) {
      const monthlyInterest = currentLoanBalance * mortgageInterestRateMonthly;
      const monthlyPrincipal = monthlyMortgagePayment - monthlyInterest;
      interestPaid += monthlyInterest;
      principalPaid += monthlyPrincipal;
      currentLoanBalance -= monthlyPrincipal;
    }
    currentPropertyValue *= (1 + homeAppreciationRate / 100);
    const currentEquity = currentPropertyValue - currentLoanBalance;
    buyEquity.push(currentEquity);
    buyLoanBalance.push(currentLoanBalance);

    const buyCashOutflow = monthlyMortgagePayment * 12 + annualHoldingCosts;

    // Rent scenario year-by-year
    const rentCashOutflow = currentMonthlyRent * 12 + (year % 2 === 0 ? leaseRenewalFeeMonths * currentMonthlyRent : 0);
    currentMonthlyRent *= (1 + rentGrowthRate / 100);

    // Compare cash flows and invest the difference
    const cashFlowDifference = buyCashOutflow - rentCashOutflow;
    investmentPortfolio += cashFlowDifference;
    if (year == 1){
      investmentPortfolio += currentEquity;
    }
    investmentPortfolio *= (1 + investmentReturnRate / 100);
    
    rentInvestmentValue.push(investmentPortfolio);

    buyNetWorth.push(currentEquity);
    rentNetWorth.push(investmentPortfolio + refundableSecurityDeposit);
  }

  return { buyNetWorth, rentNetWorth, buyEquity, buyLoanBalance, rentInvestmentValue };
};