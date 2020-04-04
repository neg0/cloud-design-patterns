import CircuitBreakerStateStore from './State/CircuitBreakerStateStore'
import CircuitBreakerOpenError from './Error/CircuitBreakerOpenError'

export class CircuitBreaker {
    private readonly openTimeOutTime: Date

    public constructor(private stateStore: CircuitBreakerStateStore) {
        this.openTimeOutTime = new Date()
    }

    public ExecuteAction(action): void {
        if (!this.stateStore.isClosed) {
            //The circuit breaker is open. Test if the timeout is elapsed
            //This is a very simple check. You could do more complex tests to put the
            //circuit breaker in the halfopen state
            if (
                this.stateStore.lastChangedDateUtc + this.openTimeOutTime <
                new Date()
            ) {
                //The timeout has expired, so allow the action to be executed
                //This tests if the external service is up and running again
                //You could do more complex tests
                try {
                    this.stateStore.halfOpen()

                    //Try the call
                    action()

                    //If the call succeeded, we assume that the external service
                    //is up and running so we rest the circuit breaker to the closed state
                    this.stateStore.reset()
                    return
                } catch (err) {
                    //The call didn't succeed, so the service is not working yet
                    //Therefore, trip the circuit breaker again, setting a new exception
                    //and putting it in the open state
                    this.stateStore.trip(err)

                    throw err
                }
            }

            //The timout hasn't elapsed yet, so the call is not made.
            //Let the caller know by returning a CircuitBreakerOpenException
            throw new CircuitBreakerOpenError(this.stateStore.lastError)
        }

        //The circuit breaker is closed, call the external service
        try {
            action()
        } catch (ex) {
            //The call didn't succeed, trip the circuit breaker
            this.TrackException(ex)
            //Throw the exception so that the caller can tell
            //the type of exception that was thrown.
            throw ex
        }
    }

    private TrackException(ex: Error): void {
        //This is a very simple example. The circuit breaker trips on the first exception,
        //without any additional checks. You can make this more robust by tripping the
        //circuit breaker after a set number of failures or after another test
        this.stateStore.trip(ex)
    }
}
