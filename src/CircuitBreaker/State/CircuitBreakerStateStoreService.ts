import CircuitBreakerStateStore, {
    CircuitBreakerState,
} from './CircuitBreakerStateStore'

export default class CircuitBreakerStateStoreService
    implements CircuitBreakerStateStore {
    public State: CircuitBreakerState

    public LastError: Error

    public LastChangedDateUtc: Date

    public CircuitBreakerStateStore(): void {
        //set the default state of the circuit breaker state store
        this.State = CircuitBreakerState.Closed
    }

    get IsClosed(): boolean {
        return this.State === CircuitBreakerState.Closed
    }

    public HalfOpen(): void {
        this.State = CircuitBreakerState.HalfOpen
    }

    public Reset(): void {
        this.State = CircuitBreakerState.Closed
    }

    public Trip(err: Error): void {
        this.State = CircuitBreakerState.Open
        this.LastError = err
        this.LastChangedDateUtc = new Date()
    }
}
