import { CircuitBreakerState } from './CircuitBreakerState'

export default interface CircuitBreakerStateStore {
    state: CircuitBreakerState
    lastError: Error
    isClosed: boolean
    lastChangedDateUtc: Date
    trip(err: Error): void
    reset(): void
    halfOpen(): void
}
