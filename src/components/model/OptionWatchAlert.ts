export interface OptionWatchAlert {
    id: string;
    alertTime: string;
    putCall: string;
    symbol: string;
    lastPrice: number;
    openInterest: number;
    totalVolume: number;
}

export function optionWatchAlertFactory(override: Partial<OptionWatchAlert> = {}): OptionWatchAlert {
    return {
        id: '',
        alertTime: '',
        putCall: '',
        symbol: '',
        lastPrice: 0,
        openInterest: 0,
        totalVolume: 0,
        ...override
    }
}

