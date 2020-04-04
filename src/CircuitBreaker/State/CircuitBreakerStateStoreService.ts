import CircuitBreakerStateStore from './CircuitBreakerStateStore'
import { CircuitBreakerState } from './CircuitBreakerState'

export default class CircuitBreakerStateStoreService
    implements CircuitBreakerStateStore {
    public state: CircuitBreakerState

    public lastError: Error

    public lastChangedDateUtc: Date

    public constructor() {
        this.state = CircuitBreakerState.Closed
    }

    public CircuitBreakerStateStore(): void {
        //set the default state of the circuit breaker state store
        this.state = CircuitBreakerState.Closed
    }

    get isClosed(): boolean {
        return this.state === CircuitBreakerState.Closed
    }

    public halfOpen(): void {
        this.state = CircuitBreakerState.HalfOpen
    }

    public reset(): void {
        this.state = CircuitBreakerState.Closed
    }

    public trip(err: Error): void {
        this.state = CircuitBreakerState.Open
        this.lastError = err
        this.lastChangedDateUtc = new Date()
    }
}
