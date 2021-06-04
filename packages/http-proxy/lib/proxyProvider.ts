import { plugin as http } from '@geislabs/http-plugin'
import { ProxyPlugin } from './proxyTypes'

/**
 * Proxy HTTP requests
 * @param config
 * @returns
 */
export const proxy: ProxyPlugin = {
    name: 'proxy',
    depends: [http],
    register({ http, events }, { mapping = {} }) {
        http.events.on('beforeRequest', (request) => {
            const target = mapping[request.url.hostname]
            if (target) {
                const [hostname, port] = target.split(':')
                request.url.hostname = hostname
                request.url.port = port
                events.emit('beforeProxy', { request })
            }
        })
    },
}
