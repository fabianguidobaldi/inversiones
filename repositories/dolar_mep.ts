import {RestClient} from './rest_client';
import {Cotizacion} from '../model';

export class DolarMEPRepo {
  CotizacionActual(): Cotizacion {
    const url = 'https://mercados.ambito.com/dolarrava/mep/variacion';
    let response = RestClient.GET(url) as CotizacionActualResponse;
    return aclCotizacionActual(response);
  }

  CotizacionHistorica(desde: Date, hasta: Date): Cotizacion[] {
    const url = `https://mercados.ambito.com/dolarrava/mep/historico-general/${toISOStringDateOnly(
      desde
    )}/${toISOStringDateOnly(hasta)}`;
    let response = RestClient.GET(url).slice(1) as CotizacionHistoricaResponse;

    return aclCotizacionHistorica(response);
  }
}

interface CotizacionActualResponse {
  compra: string;
  venta: string;
  fecha: string;
  ultimo: string;
  valor: string;
  variacion: string;
  valor_cierre_ant: string;
  'class-variacion': string;
}

function aclCotizacionActual(response: CotizacionActualResponse): Cotizacion {
  const today = new Date();
  return {
    fecha: today,
    valor: parseFloat(response.valor.replace(',', '.')),
  };
}

type CotizacionHistoricaDetail = [string, string]; //fecha y valor
type CotizacionHistoricaResponse = CotizacionHistoricaDetail[];

function aclCotizacionHistorica(response: CotizacionHistoricaResponse): Cotizacion[] {
  let cotizaciones: Cotizacion[] = [];

  const arrayLength = response.length;
  for (let i = arrayLength - 1; i >= 0; i--) {
    cotizaciones.push(buildCotizacion(response[i]));
  }

  return cotizaciones;
}

function buildCotizacion(detail: CotizacionHistoricaDetail): Cotizacion {
  return {
    fecha: parseDate(detail[0]),
    valor: parseFloat(detail[1].replace(',', '.')),
  };
}

function parseDate(date: string): Date {
  let dateParts = date.split('/');
  return new Date(
    parseInt(dateParts[2]),
    parseInt(dateParts[1]) - 1,
    parseInt(dateParts[0])
  );
}

function toISOStringDateOnly(date: Date) {
  return date.toISOString().substring(0, 10);
}
