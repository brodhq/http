import { Dependency, Http, Runtime } from '@geislabs/http-runtime'
import { ProxyConfig } from './proxyConfig'

interface Plugin<TDep extends Dependency<any, any>> {
    register: (runtime: Runtime<TDep>) => void
}

export class ProxyPlugin implements Plugin<Http> {
    constructor(public config: ProxyConfig) {}
    register(runtime: Runtime<Http>) {
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
