import {DolarMEPRepo} from '../repositories/dolar_mep';

/**
 * Devuelve la cotización actual del dólar MEP.
 * @return Cotización MEP actual en $.
 * @customfunction
 */
function COTIZACIONACTUALMEP(): number {
  return new DolarMEPRepo().CotizacionActual().valor;
}

/**
 * Devuelve la cotización histórica del dólar MEP en un período.
 * @param {Date} desde Fecha inicial del período.
 * @param {Date} hasta Fecha final del período.
 * @return Un array bidimensional que contiene el listado de [fecha, cotizacion] del período
 * @customfunction
 */
function COTIZACIONHISTORICAMEP(desde: Date, hasta: Date): Array<[Date, number]> {
  let cotizaciones = new DolarMEPRepo().CotizacionHistorica(desde, hasta);
  return cotizaciones.map(cotizacion => [cotizacion.fecha, cotizacion.valor]);
}
