import type { Events } from '@geislabs/runtime-event'
import type { URL } from 'url'
import type { HttpEvent } from './httpEvents'
import fetch, { RequestInit, Response } from 'node-fetch'
import { CreateRequestAttrs } from './httpAttrs'

export type FetchFn = typeof fetch

export interface Http {
    events: Events<HttpEvent>
    request: (request: CreateRequestAttrs) => Promise<Response>
}

export interface Request extends RequestInit {
    url: URL
}

export type { Response } from 'node-fetch'
