import HealthEndpointMonitoring from './HealthCheck/HealthEndpointMonitoring'

export default class MySQLHealthCheck extends HealthEndpointMonitoring {
    public static readonly SERVICE_NAME = 'MySQL'

    public hasError(): Error | undefined {
        return undefined
    }

    public isHealthy(): boolean {
        return true
    }

    public serviceName(): string {
        return MySQLHealthCheck.SERVICE_NAME
    }
}
