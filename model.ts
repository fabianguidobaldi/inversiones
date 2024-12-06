export interface ForeignExchange {
  date: Date;
  rate: number;
}

export interface FinancialAsset {
  ticker: string;
  type: FinancialAssetType;
  previousClosingPrice: number;
  bidPrice: number;
  offerPrice: number;
  tradePrice: number;
  closingPrice: number;
  currency: string;
}

export type FinancialAssetType = 'stock' | 'public_bond' | 'corporate_bond';
