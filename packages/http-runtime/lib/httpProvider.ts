import fetch from 'node-fetch'
import { HttpConfig } from './httpConfig'
import { NodeHttp } from './httpFacade'
import { Http } from './httpTypes'

export function config({
    fetchFn = fetch,
    ...config
}: Partial<HttpConfig> & Pick<HttpConfig, 'events'>): Http {
    return new NodeHttp({ fetchFn, ...config })
}
