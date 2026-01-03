export interface Earnings {
    companyName: string,
    ticker: string,
    time: string,
    estimate: string,
    actual: string,
    surprise: string
}

export function earningsFactory(override: Partial<Earnings> = {}): Earnings {
    return {
        companyName: '',
        ticker: '',
        time: '',
        estimate: '',
        actual: '',
        surprise: '',
        ...override
    }
}

