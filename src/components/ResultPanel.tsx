import { useStore } from '../state/store';
import { calculate } from '../lib/finance/calculations';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useTranslation } from 'react-i18next';

const ResultPanel = () => {
  const { t, i18n } = useTranslation();
  const state = useStore();
  const { buyNetWorth, rentNetWorth } = calculate(state);

  const isEnglish = (i18n.language || '').toLowerCase().startsWith('en');
  const unitDivisor = isEnglish ? 1_000_000 : 10_000; // EN uses millions (M), JA uses man (万)
  const unitLabel = isEnglish ? 'M' : '万';

  const chartData = Array.from({ length: state.timeHorizon }, (_, idx) => {
    const i = idx + 1; // start from year 1
    return {
      year: i,
      buy: Math.round(buyNetWorth[i] / unitDivisor),
      rent: Math.round(rentNetWorth[i] / unitDivisor),
    };
  });

  const finalBuyNetWorth = buyNetWorth[state.timeHorizon];
  const finalRentNetWorth = rentNetWorth[state.timeHorizon];
  const difference = finalBuyNetWorth - finalRentNetWorth;

  const breakEvenYear = (() => {
    for(let i = 0; i < buyNetWorth.length; i++) {
      if (buyNetWorth[i] > rentNetWorth[i]) {
        return i;
      }
    }
    return 'N/A';
  })();

  return (
    <div className="lg:col-span-2 bg-gray-50 p-6 rounded-lg shadow-inner">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('afterYears', { years: state.timeHorizon })}</h2>
      <p className={`text-xl ${difference > 0 ? 'text-green-600' : 'text-red-600'} font-semibold mb-6`}>
        {t('isBetterBy', { scenario: difference > 0 ? t('buy') : t('rent'), amount: Math.abs(Math.round(difference/unitDivisor)).toLocaleString() })}
      </p>
      
      <div className="w-full h-96 bg-white rounded-lg shadow-md p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(value: number) => `${value.toLocaleString()}${isEnglish ? 'M' : '万円'}`} />
            <Legend />
            <Area type="monotone" dataKey="buy" stroke="#8884d8" fill="#8884d8" fillOpacity={0.35} name={t('buy')} />
            <Area type="monotone" dataKey="rent" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.35} name={t('rent')} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <h4 className="text-gray-600 font-semibold">{t('buyNetWorth')}</h4>
              <p className="text-2xl font-bold text-indigo-600">¥{Math.round(finalBuyNetWorth/unitDivisor).toLocaleString()}{unitLabel}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <h4 className="text-gray-600 font-semibold">{t('rentNetWorth')}</h4>
              <p className="text-2xl font-bold text-green-600">¥{Math.round(finalRentNetWorth/unitDivisor).toLocaleString()}{unitLabel}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <h4 className="text-gray-600 font-semibold">{t('breakEvenPoint')}</h4>
              <p className="text-2xl font-bold text-gray-800">{t('year', { year: breakEvenYear })}</p>
          </div>
      </div>
    </div>
  );
};

export default ResultPanel;
