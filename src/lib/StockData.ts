//cagr for 20 years
export const stockData: { [key: string]: any } = {
  "S&P 500": { cagr: 8.68 },
  "NASDAQ": { cagr: 12.28 },
  "NIKKEI 225": { cagr: 6.20 },
  "GOOGLE": { cagr: 22.95 },
  "AMAZON": { cagr: 25.13 },
  "TOYOTA": { cagr: 4.21 },
};

export const stockNames = Object.keys(stockData);
