import { Http } from '@geislabs/http'
import { ProxyConfig } from './proxyConfig'

export class ProxyPlugin<TRuntime extends { http: Http }> {
    constructor(public config: ProxyConfig) {}
    register(runtime: TRuntime) {
        runtime.http.events.on('beforeRequest', (request) => {
            const target = this.config.proxy[request.url.hostname]
            if (target) {
                const [hostname, port] = target.split(':')
                request.url.hostname = hostname
                request.url.port = port
            }
        })
    }
}
