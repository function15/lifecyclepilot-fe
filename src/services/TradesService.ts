import apiClient from '@/services/ApiClient';

export interface Trade {
  id: string;
  realId: number;
  symbol: string;
  strike: number | null;
  contractMultiplier: number | null;
  expiration: number | null;
  contractType: string | null;
  spreadType: string;
  complete: boolean;
  status: string;
  result: string | null;
  profits: number;
  netProfits: number;
  fee: number;
  commission: number;
  swap: number;
  netRoi: number;
  adjustedCost: number;
  adjustedProceeds: number;
  quantity: number;
  openPositions: number;
  side: string;
  avgBuyPrice: number;
  avgSellPrice: number;
  entryPrice: number;
  entryPriceInCurrency: number;
  exitPrice: string | number;
  exitPriceInCurrency: number;
  currency: string;
  openDate: number;
  realized: number;
  holdTime: number;
  timeZone: string;
  createdAt: number;
  updatedAt: number;
  accountId: string;
  accountName: string;
  reviewed: boolean;
  editable: boolean;
  tradeId: number;
}

export interface TradesResponse {
  data: Trade[];
}

export const getAllTrades = async () => {
  return apiClient.get<TradesResponse>('/api/v1/trades/all_trades');
};
