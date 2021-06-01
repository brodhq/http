import { ProxyConfig } from './proxyConfig'
import { ProxyPlugin } from './proxyFacade'

export function config({ proxy = {}, ...config }: Partial<ProxyConfig> = {}) {
    return new ProxyPlugin({ proxy, ...config })
}
