import { Event } from '@geislabs/runtime'
import { Request } from '@geislabs/http-runtime'

export interface RequestProxiedEvent
    extends Event<'beforeProxy', { request: Request }> {}

export type ProxyEvent = RequestProxiedEvent
