import { Event } from '@geislabs/runtime'
import { Request } from '@geislabs/http-plugin'

export interface RequestProxiedEvent
    extends Event<'beforeProxy', { request: Request }> {}

export type ProxyEvent = RequestProxiedEvent
