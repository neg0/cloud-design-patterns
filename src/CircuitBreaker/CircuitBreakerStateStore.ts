export enum CircuitBreakerState {
    Closed,
    HalfOpen,
    Open,
}

export default interface CircuitBreakerStateStore {
    State: CircuitBreakerState
    LastException: Error
    IsClosed: boolean
    LastChangedDateUtc: Date
    Trip(err: Error): void
    Reset(): void
    HalfOpen(): void
}
