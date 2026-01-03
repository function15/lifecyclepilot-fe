export function formatCurrency (value: number): string {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value.valueOf() / 1000)
  return value === 0 ? formatted : `${formatted}k`
}

export function formatCurrencyFull (price: number): string {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })
}

export function formatOptionSymbol (symbol: string): string {
  if (symbol.indexOf('.') === 0) {
    return symbol.substring(1);
  }
  return symbol;
}

// Calculate the time until the next minute starts
export function getTimeUntilNextMinute(): number {
  const now = new Date();
  const nextMinute = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1);
  return nextMinute.getTime() - now.getTime();
}

export function getBaseUrl (): string {
  return import.meta.env.VITE_APP_BASE_URL
}

export function getAuthCallbackUrl (): string {
  return getApiBaseUrl() + '/auth/google'
}

export function getApiBaseUrl (): string {
  return import.meta.env.VITE_API_BASE_URL
}

export function slugToPath(slug: string): string {
  // replace first three "-" with "/"
  return slug.replace('-', '/').replace('-', '/').replace('-', '/') + '.json';
}
