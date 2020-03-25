import { CircuitBreakerState } from "./CircuitBreakerState";

export default interface CircuitBreakerStateStore {
  State: CircuitBreakerState
  LastError: Error
  IsClosed: boolean
  LastChangedDateUtc: Date
  Trip(err: Error): void
  Reset(): void
  HalfOpen(): void
}
