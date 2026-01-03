import apiClient from '@/services/ApiClient';

export interface WinRateResponse {
  winners: number;
  losers: number;
  break_evens: number;
}

export interface WinRateParams {
  number_format?: string;
  profits_type?: string;
  accounts?: string[];
  match_all_playbooks?: boolean;
}

export interface DayStreaks {
  winning: number;
  losing: number;
  current_winning: number;
  current_losing: number;
}

export interface TradeStreaks {
  max_wins: number;
  max_losses: number;
  max_be: number;
  current_losing_streak: number;
  current_winning_streak: number;
}

export interface DrawdownData {
  date: string;
  drawdown: string;
  percent?: string;
}

export interface AverageDrawdown {
  drawdown: number;
  percent: string;
}

export interface CurrentDrawdown {
  date: string;
  drawdown: string;
}

export interface DashboardStatsResponse {
  average_per_trade_profits: string;
  maximum_profits: string;
  minimum_profits: string;
  total_gain_loss: string;
  total_sum: string;
  total_commissions: string;
  total_fees: string;
  total_swap: string;
  trade_count: number;
  average_hold_time: string;
  average_trade_profits: string;
  winning_days: number;
  losing_days: number;
  winning_trades_count: number;
  losing_trades_count: number;
  scratch_trades: number;
  profit_factor: string;
  average_winning_trade: string;
  average_losing_trade: string;
  trade_expectancy: string;
  winning_trades_sum: string;
  losing_trades_sum: string;
  breakeven_days: number;
  day_streaks: DayStreaks;
  trade_streaks: TradeStreaks;
  max_drawdown: DrawdownData;
  average_drawdown: AverageDrawdown;
  current_drawdown: CurrentDrawdown;
  initial_balance: string;
}

export interface DashboardStatsParams {
  profits_type?: string;
  accounts?: string[];
  match_all_playbooks?: boolean;
  number_format?: string;
}

export const getWinRate = async (params: WinRateParams = {}) => {
  const queryParams = new URLSearchParams();

  if (params.number_format) {
    queryParams.append('number_format', params.number_format);
  }

  if (params.profits_type) {
    queryParams.append('profits_type', params.profits_type);
  }

  if (params.accounts) {
    params.accounts.forEach(account => {
      queryParams.append('accounts[]', account);
    });
  }

  if (params.match_all_playbooks !== undefined) {
    queryParams.append('match_all_playbooks', String(params.match_all_playbooks));
  }

  const queryString = queryParams.toString();
  const url = `/api/v1/filters/winrate${queryString ? `?${queryString}` : ''}`;

  return apiClient.get<WinRateResponse>(url);
};

export const getDashboardStats = async (params: DashboardStatsParams = {}) => {
  const queryParams = new URLSearchParams();

  if (params.profits_type) {
    queryParams.append('profits_type', params.profits_type);
  }

  if (params.accounts) {
    params.accounts.forEach(account => {
      queryParams.append('accounts[]', account);
    });
  }

  if (params.match_all_playbooks !== undefined) {
    queryParams.append('match_all_playbooks', String(params.match_all_playbooks));
  }

  if (params.number_format) {
    queryParams.append('number_format', params.number_format);
  }

  const queryString = queryParams.toString();
  const url = `/api/v1/filters/dashboard_stats${queryString ? `?${queryString}` : ''}`;

  return apiClient.get<DashboardStatsResponse>(url);
};
