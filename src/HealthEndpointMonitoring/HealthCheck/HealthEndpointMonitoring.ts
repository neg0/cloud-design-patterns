import { HealthEndpointMonitoringResponse } from './HealthEndpointMonitoringResponse'

export default abstract class HealthEndpointMonitoring {
    abstract serviceName(): string

    abstract hasError(): Error | undefined

    abstract isHealthy(): boolean

    public summary(): HealthEndpointMonitoringResponse {
        return {
            serviceName: this.serviceName(),
            health: this.isHealthy(),
            error:
                this.hasError() instanceof Error
                    ? this.hasError()?.message
                    : 'Default error message',
        }
    }
}
