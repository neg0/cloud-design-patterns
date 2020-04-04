import HealthEndpointMonitoring from './HealthCheck/HealthEndpointMonitoring'

export default class SQSHealthCheck extends HealthEndpointMonitoring {
    public static readonly SERVICE_NAME = 'AWS SQS'

    public isHealthy(): boolean {
        return true
    }

    public hasError(): Error | undefined {
        return undefined
    }

    public serviceName(): string {
        return SQSHealthCheck.SERVICE_NAME
    }
}
