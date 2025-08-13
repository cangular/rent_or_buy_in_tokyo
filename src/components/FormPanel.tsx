import { useStore } from '../state/store';
import { useTranslation } from 'react-i18next';
import { tokyoWards, wardData } from '../lib/TokyoWardsData';
import { stockNames, stockData } from '../lib/StockData';

const FormPanel = () => {
  const { t } = useTranslation();
  const store = useStore();
  const { setValue, selectedWard, selectedStock, showAdvanced, toggleAdvanced } = store;

  const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ward = e.target.value;
    setValue('selectedWard', ward);
    if (wardData[ward]) {
      setValue('propertyPrice', wardData[ward].propertyPrice);
      setValue('monthlyRent', wardData[ward].monthlyRent);
      setValue('rentGrowthRate', wardData[ward].rentGrowthRate);
      setValue('homeAppreciationRate', wardData[ward].homeAppreciationRate);
    }
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stock = e.target.value;
    setValue('selectedStock', stock);
    if (stockData[stock]) {
      setValue('investmentReturnRate', stockData[stock].cagr);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t('yourScenario')}</h2>
      
      <div className="mb-6">
          <label className="block text-gray-600 mb-2">{t('tokyoWard')}</label>
          <select 
            value={selectedWard}
            onChange={handleWardChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
              {tokyoWards.map(ward => (
                <option key={ward} value={ward}>{t(`wards.${ward}`)}</option>
              ))}
          </select>
      </div>

      <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center"><i className="fas fa-wallet mr-2 text-indigo-500"></i>{t('buy')}</h3>
          <div className="space-y-4">
              <div>
                  <label className="block text-gray-600">{t('propertyPrice')}</label>
                  <input type="number" value={store.propertyPrice} onChange={(e) => setValue('propertyPrice', Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                  <label className="block text-gray-600">{t('downPayment')}</label>
                  <input type="number" value={store.downPaymentPercentage} onChange={(e) => setValue('downPaymentPercentage', Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                  <label className="block text-gray-600">{t('interestRate')}</label>
                  <input type="number" value={store.mortgageInterestRate} onChange={(e) => setValue('mortgageInterestRate', Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
          </div>
      </div>

      <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center"><i className="fas fa-key mr-2 text-green-500"></i>{t('rent')}</h3>
          <div className="space-y-4">
              <div>
                  <label className="block text-gray-600">{t('monthlyRent')}</label>
                  <input type="number" value={store.monthlyRent} onChange={(e) => setValue('monthlyRent', Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                  <label className="block text-gray-600">{t('investmentChoice')}</label>
                  <select 
                    value={selectedStock}
                    onChange={handleStockChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                      {stockNames.map(stock => <option key={stock} value={stock}>{stock}</option>)}
                  </select>
              </div>
          </div>
      </div>

      <div className="mt-6">
        <button
          onClick={toggleAdvanced}
          className="text-indigo-600 hover:text-indigo-900 font-medium"
        >
          {showAdvanced ? t('hideAdvanced') : t('showAdvanced')}
        </button>
      </div>

      {showAdvanced && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2 text-gray-700 border-b pb-1">{t('buyAdvanced')}</h3>
          <div className="space-y-4 mt-4">
            <div>
                <label className="block text-gray-600">{t('managementFeeMonthly')}</label>
                <input type="number" value={store.managementFeeMonthly} onChange={(e) => setValue('managementFeeMonthly', Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
                <label className="block text-gray-600">{t('repairFundMonthly')}</label>
                <input type="number" value={store.repairFundMonthly} onChange={(e) => setValue('repairFundMonthly', Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
                <label className="block text-gray-600">{t('homeAppreciationRate')}</label>
                <input type="number" value={store.homeAppreciationRate} onChange={(e) => setValue('homeAppreciationRate', Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
                <label className="block text-gray-600">{t('oneTimeCostsRate')}</label>
                <input type="number" value={store.oneTimeCostsRate} onChange={(e) => setValue('oneTimeCostsRate', Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
                <label className="block text-gray-600">{t('propertyTaxRate')}</label>
                <input type="number" value={store.propertyTaxRate} onChange={(e) => setValue('propertyTaxRate', Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
                <label className="block text-gray-600">{t('sellingCostsRate')}</label>
                <input type="number" value={store.sellingCostsRate} onChange={(e) => setValue('sellingCostsRate', Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
                <label className="block text-gray-600">{t('capitalGainsTaxRateProperty')}</label>
                <input type="number" value={store.capitalGainsTaxRateProperty} onChange={(e) => setValue('capitalGainsTaxRateProperty', Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
          </div>

          <h3 className="text-lg font-bold mb-2 mt-4 text-gray-700 border-b pb-1">{t('rentAdvanced')}</h3>
          <div className="space-y-4 mt-4">
            <div>
                <label className="block text-gray-600">{t('keyMoneyMonths')}</label>
                <input type="number" value={store.keyMoneyMonths} onChange={(e) => setValue('keyMoneyMonths', Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
                <label className="block text-gray-600">{t('agencyFeeMonths')}</label>
                <input type="number" value={store.agencyFeeMonths} onChange={(e) => setValue('agencyFeeMonths', Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
                <label className="block text-gray-600">{t('rentGrowthRate')}</label>
                <input type="number" value={store.rentGrowthRate} onChange={(e) => setValue('rentGrowthRate', Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
                <label className="block text-gray-600">{t('securityDepositMonths')}</label>
                <input type="number" value={store.securityDepositMonths} onChange={(e) => setValue('securityDepositMonths', Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
                <label className="block text-gray-600">{t('leaseRenewalFeeMonths')}</label>
                <input type="number" value={store.leaseRenewalFeeMonths} onChange={(e) => setValue('leaseRenewalFeeMonths', Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
                <label className="block text-gray-600">{t('capitalGainsTaxRateInvestment')}</label>
                <input type="number" value={store.capitalGainsTaxRateInvestment} onChange={(e) => setValue('capitalGainsTaxRateInvestment', Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPanel;
