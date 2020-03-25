export default class CircuitBreakerOpenError extends Error {
    public constructor(lastError: Error) {
        super(`Method not called ${lastError.message}`)
    }
}
