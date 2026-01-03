export interface MarketNews {
    img: string;
    link: string;
    text: string;
    timestamp: string;
    seen: boolean;
}

export function marketNewsFactory(override: Partial<MarketNews> = {}): MarketNews {
    return {
        img: '',
        link: '',
        text: '',
        timestamp: '',
        seen: false,
        ...override
    }
}

