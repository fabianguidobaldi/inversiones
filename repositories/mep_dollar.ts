import {RestClient} from './rest_client';
import {ForeignExchange} from '../model';

export class MEPDollarRepo {
  CurrentFX(): ForeignExchange {
    const url = 'https://mercados.ambito.com/dolarrava/mep/variacion';
    let response = RestClient.GET(url) as CurrentFXResponse;
    return aclCurrentFX(response);
  }

  HistoricFX(since: Date, to: Date): ForeignExchange[] {
    const url = `https://mercados.ambito.com/dolarrava/mep/historico-general/${toISOStringDateOnly(
      since
    )}/${toISOStringDateOnly(to)}`;
    let response = RestClient.GET(url).slice(1) as HistoricFXResponse;

    return aclHistoricFX(response);
  }
}

interface CurrentFXResponse {
  compra: string;
  venta: string;
  fecha: string;
  ultimo: string;
  valor: string;
  variacion: string;
  valor_cierre_ant: string;
  'class-variacion': string;
}

function aclCurrentFX(response: CurrentFXResponse): ForeignExchange {
  const today = new Date();
  return {
    date: today,
    rate: parseFloat(response.valor.replace(',', '.')),
  };
}

type HistoricFXDetail = [string, string];
type HistoricFXResponse = HistoricFXDetail[];
[];

function aclHistoricFX(response: HistoricFXResponse): ForeignExchange[] {
  let fxs: ForeignExchange[] = [];

  const arrayLength = response.length;
  for (let i = arrayLength - 1; i >= 0; i--) {
    fxs.push(buildFX(response[i]));
  }

  return fxs;
}

function buildFX(detail: HistoricFXDetail): ForeignExchange {
  return {
    date: parseDate(detail[0]),
    rate: parseFloat(detail[1].replace(',', '.')),
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
