import { Http } from '@geislabs/http-runtime'
import { Plugin } from '@geislabs/runtime'
import { ProxyEvent } from './proxyEvents'

export interface ProxyPlugin extends Plugin<'proxy', any, Http, ProxyEvent> {}
