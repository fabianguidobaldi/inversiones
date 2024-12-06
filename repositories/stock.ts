import {FinancialAsset} from '../model';
import {RestClient} from './rest_client';

export class StockRepo {
  LeadingEquityPrices(): FinancialAsset[] {
    const url =
      'https://open.bymadata.com.ar/vanoms-be-core/rest/api/bymadata/free/leading-equity';
    const body: BYMARequest = {
      T1: true,
      T0: false,
      'Content-Type': 'application/json',
      page_size: 1000,
    };

    let response = RestClient.POST(url, JSON.stringify(body)) as BYMAStockResponse;
    return aclEquityResponse(response);
  }

  GeneralEquityPrices(): FinancialAsset[] {
    const url =
      'https://open.bymadata.com.ar/vanoms-be-core/rest/api/bymadata/free/general-equity';
    const body: BYMARequest = {
      T1: true,
      T0: false,
      'Content-Type': 'application/json',
      page_size: 1000,
    };

    let response = RestClient.POST(url, JSON.stringify(body)) as BYMAStockResponse;
    return aclEquityResponse(response);
  }
}

function aclEquityResponse(response: BYMAStockResponse): FinancialAsset[] {
  let assets: FinancialAsset[] = [];

  for (let element of response.data) {
    assets.push(buildAsset(element));
  }

  return assets;
}

function buildAsset(data: BYMAStockDetail): FinancialAsset {
  return {
    ticker: data.symbol,
    type: 'stock',
    previousClosingPrice: data.previousClosingPrice,
    bidPrice: data.bidPrice,
    offerPrice: data.offerPrice,
    tradePrice: data.trade,
    closingPrice: data.closingPrice,
    currency: data.denominationCcy,
  };
}

interface BYMARequest {
  T1: boolean;
  T0: boolean;
  'Content-Type': string;
  page_size: number;
}

interface BYMAStockResponse {
  content: Content;
  data: BYMAStockDetail[];
}

interface Content {
  page_number: number;
  page_count: number;
  page_size: number;
  total_elements_count: number;
}

interface BYMAStockDetail {
  tradeVolume: number;
  symbol: string;
  imbalance: number;
  previousSettlementPrice: number;
  offerPrice: number;
  openInterest: number;
  vwap: number;
  numberOfOrders: number;
  openingPrice: number;
  tickDirection: number;
  securityDesc: string;
  securitySubType: string;
  previousClosingPrice: number;
  settlementType: string;
  quantityOffer: number;
  tradingHighPrice: number;
  denominationCcy: string;
  bidPrice: number;
  tradingLowPrice: number;
  market: string;
  volumeAmount: number;
  volume: number;
  trade: number;
  tradeHour: string;
  securityType: string;
  closingPrice: number;
  settlementPrice: number;
  quantityBid: number;
}
