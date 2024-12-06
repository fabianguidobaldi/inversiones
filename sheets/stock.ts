import {FinancialAsset} from '../model';
import {StockRepo} from '../repositories/stock';

/**
 * Returns current stock prices (or closingPrice, if market is not open).
 * @return A bidimensional array containing a list of [ticker, price, currency], alphabetically sorted.
 * @customfunction
 */
function STOCK_PRICES(): Array<[string, number, string]> {
  const repo = new StockRepo();
  let stocks: FinancialAsset[] = [
    ...repo.GeneralEquityPrices(),
    ...repo.LeadingEquityPrices(),
  ].sort((a, b) => a.ticker.localeCompare(b.ticker));

  return stocks.map(stock => [stock.ticker, stock.tradePrice, stock.currency]);
}
