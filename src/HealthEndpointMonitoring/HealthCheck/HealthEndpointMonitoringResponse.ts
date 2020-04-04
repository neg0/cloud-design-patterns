export type HealthEndpointMonitoringResponse = {
    serviceName: string
    health: boolean
    error?: string | undefined
}
