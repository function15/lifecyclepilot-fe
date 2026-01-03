export interface MarketSentiment {
    id: string,
    startTime: string,
    endTime: string,
    spxProbability: number,
    tickProbability: number,
    vixProbability: number,
    dxyProbability: number,
    tenYrProbability: number,
    advMinusDeclProbability: number,
    callsOi: number,
    putsOi: number,
    spxClosePrice: number,
    levelsCalls: number[],
    levelsPuts: number[]
    lastUpdated: string,
    marketSentiment: number
}

export function marketSentimentFactory(override: Partial<MarketSentiment> = {}): MarketSentiment {
    return {
        id: '',
        startTime: '',
        endTime: '',
        spxProbability: 0,
        tickProbability: 0,
        vixProbability: 0,
        dxyProbability: 0,
        tenYrProbability: 0,
        advMinusDeclProbability: 0,
        callsOi: 0,
        putsOi: 0,
        spxClosePrice: 0,
        levelsCalls: [],
        levelsPuts: [],
        lastUpdated: '',
        marketSentiment: 0,
        ...override
    }
}

