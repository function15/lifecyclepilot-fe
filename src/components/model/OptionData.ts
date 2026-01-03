export interface OptionData {
    id: string,
    symbol: string,
    strikePrice: number,
    bidPrice: number,
    askPrice: number,
    openInterest: number,
    totalVolume: number,
    putCall: string,
    expirationDate: number,
    daysToExpiration: number,
}

export function optionDataFactory(override: Partial<OptionData> = {}): OptionData {
    return {
        id: '',
        symbol: '',
        strikePrice: 0,
        bidPrice: 0,
        askPrice: 0,
        openInterest: 0,
        totalVolume: 0,
        putCall: '',
        expirationDate: 0,
        daysToExpiration: 0,
        ...override
    }
}
