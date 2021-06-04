import { HttpPlugin } from '@geislabs/http-plugin'
import { Plugin } from '@geislabs/plugin'
import { ProxyConfig } from './proxyConfig'
import { ProxyEvent } from './proxyEvents'

export interface ProxyPlugin
    extends Plugin<'proxy', ProxyConfig, any, HttpPlugin, ProxyEvent> {}
