import { createServer } from 'https'
import { readFileSync } from 'fs'
import { IncomingMessage, ServerResponse } from 'http'
import HealthEndpointMonitoring from "./HealthCheck/HealthEndpointMonitoring";

export default class Server {
    private readonly healthMonitoringServices: HealthEndpointMonitoring[]
    private readonly opt: { key: Buffer; cert: Buffer }
    private static get STATUS_OK(): number {
        return 200
    }
    private static get STATUS_NOT_FOUND(): number {
        return 404
    }

    public constructor(...healthMonitoringServices: HealthEndpointMonitoring[]) {
        this.healthMonitoringServices = healthMonitoringServices
        this.opt = {
            key: readFileSync(process.env.SSL_KEY_FILE ?? 'key.pem'),
            cert: readFileSync(process.env.SSL_CERT_FILE ?? 'cert.pem'),
        }
    }

    public bootUp(): void {
        createServer(this.opt, (req: IncomingMessage, res: ServerResponse) => {
            res.setHeader('Content-Type', 'application/json')
            res.setDefaultEncoding('UTF-8')

            if ('/health' === req.url && 'GET' === req.method?.toUpperCase()) {
                res.writeHead(Server.STATUS_OK, {
                    'Content-Type': 'application/json',
                })

                for (const service of this.healthMonitoringServices) {
                    service.summary()
                }

                res.end('Health Check!')
            }

            if ('/' === req.url && 'GET' === req.method?.toUpperCase()) {
                res.writeHead(Server.STATUS_OK, {
                    'Content-Type': 'application/json',
                })
                res.end('Secure Http(s) server is up and running!')
            }

            res.writeHead(Server.STATUS_NOT_FOUND, {
                'Content-Type': 'text/html',
            })
            res.end('Endpoint Not Found')
        }).listen(process.env.PORT ?? 8098)
    }
}
