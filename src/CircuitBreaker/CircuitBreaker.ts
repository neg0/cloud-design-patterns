import CircuitBreakerStateStore from "./CircuitBreakerStateStore";

export class CircuitBreaker {
    private readonly OpenTimeOutTime: Date;

    public constructor(private stateStore: CircuitBreakerStateStore) {
        this.OpenTimeOutTime = new Date()
    }


    public ExecuteAction(action): void {
        if (!this.stateStore.IsClosed) {
            //The circuit breaker is open. Test if the timeout is elapsed
            //This is a very simple check. You could do more complex tests to put the
            //circuit breaker in the halfopen state
            if (this.stateStore.LastChangedDateUtc + this.OpenTimeOutTime < new Date) {
                //The timeout has expired, so allow the action to be executed
                //This tests if the external service is up and running again
                //You could do more complex tests
                try {
                    this.stateStore.HalfOpen();

                    //Try the call
                    action();

                    //If the call succeeded, we assume that the external service
                    //is up and running so we rest the circuit breaker to the closed state
                    stateStore.Reset();
                    return;
                } catch (ex: Error) {
                    //The call didn't succeed, so the service is not working yet
                    //Thereofre, trip the circuit breaker again, setting a new exception
                    //and putting it in the open state
                    this.stateStore.Trip(ex);

                    throw ex;
                }
            }

            //The timout hasn't elapsed yet, so the call is not made.
            //Let the caller know by returning a CircuitBreakerOpenException
            throw new CircuitBreakerOpenException(this.stateStore.LastException);
        }

        //The circuit breaker is closed, call the external service
        try {
            action();
        } catch (ex) {
            //The call didn't succeed, trip the circuit breaker
            this.TrackException(ex);
            //Throw the exception so that the caller can tell
            //the type of exception that was thrown.
            throw ex;
        }
    }

    private TrackException(ex: Error): void {
        //This is a very simple example. The circuit breaker trips on the first exception,
        //without any additional checks. You can make this more robust by tripping the
        //circuit breaker after a set number of failures or after another test
        this.stateStore.Trip(ex);
    }
}
