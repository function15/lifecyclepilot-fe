export interface EconomicEvent {
    id: string,
    description: string | null
    title: string
    type: string
    time: string
}

export function economicEventFactory(override: Partial<EconomicEvent> = {}): EconomicEvent {
    return {
        id: '',
        description: '',
        title: '',
        type: '',
        time: '',
        ...override
    }
}

