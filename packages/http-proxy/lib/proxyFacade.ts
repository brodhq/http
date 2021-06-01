import { Plugin, Runtime } from '@geislabs/runtime'
import { Http } from '@geislabs/http-runtime'
import { ProxyConfig } from './proxyConfig'

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
