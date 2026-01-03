import apiClient from './ApiClient'

export interface UserProfile {
  id: string
  first_name: string | null
  last_name: string | null
  email: string
  time_zone: string
  username: string
  storage_usage: number
  journaling_experience: string | null
  account_size: string | null
  trading_experience: string | null
  struggle: string | null
  biggest_need: string | null
  trading_style: string | null
  bio: string | null
  goal: string | null
  display_currency: string
  trading_frequency: string | null
  onboarding_goal: string | null
  broker: string | null
  suggested_username: string | null
  provider: string
  consented_to_support_access_at: string | null
  settings: UserSettings
  profile_picture: string | null
  is_admin_access: boolean
}

export interface UserSettings {
  trade_details_settings: Record<string, unknown> | null
  dashboard_settings: {
    hidden_stats: string[]
  }
  trade_log_settings: string[]
  executed_trade_log_settings: string[]
  missed_trade_log_settings: string[]
  sample_trade_log_settings: string[]
  playbook_log_settings: string[]
  playbook_grid_log_settings: string[]
  playbook_overview_log_settings: string[]
  daily_journal_log_settings: string[]
  dashboard_widgets_selection_settings_top: string[]
  dashboard_widgets_selection_settings_bottom: string[]
  dashboard_templates: Record<string, unknown>
  backtesting_templates: Record<string, unknown>
  report_settings: Record<string, unknown>
  stop_showing_share_modal: boolean
  autoclose_expired_option_trades: boolean
  dark_mode: boolean
  can_invite_mentee: boolean
  backtesting_settings: string[]
  session_custom_settings: Record<string, unknown>
  backtesting_grid_settings: string[]
  backtesting_view_settings: Record<string, unknown>
}

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await apiClient.get<UserProfile>('/api/v1/user/profile')
  return response.data
}
