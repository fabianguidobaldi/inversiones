import {MEPDollarRepo} from '../repositories/mep_dollar';

/**
 * Returns current FX MEP rate.
 * @return Current FX MEP rate expressed in ARS.
 * @customfunction
 */
function CURRENT_MEP_FX(): number {
  return new MEPDollarRepo().CurrentFX().rate;
}

/**
 * Returns FX MEP rate for a period of time.
 * @param {Date} since First day of the period.
 * @param {Date} to Last day of the period.
 * @return A bidimensional array containing the list of [date, rate] FX MEP for the period.
 * @customfunction
 */
function HISTORIC_MEP_FX(since: Date, to: Date): Array<[Date, number]> {
  let fxs = new MEPDollarRepo().HistoricFX(since, to);
  return fxs.map(fx => [fx.date, fx.rate]);
}
