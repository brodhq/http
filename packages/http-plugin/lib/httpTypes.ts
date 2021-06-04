import type { Plugin } from '@geislabs/plugin'
import type { URL } from 'url'
import type { HttpEvent } from './httpEvents'
import fetch, { RequestInit, Response } from 'node-fetch'
import { CreateRequestAttrs } from './httpAttrs'
import { HttpConfig } from './httpConfig'

export type FetchFn = typeof fetch

export interface Http {
    request: (request: CreateRequestAttrs) => Promise<Response>
}

export interface HttpPlugin
    extends Plugin<'http', Partial<HttpConfig>, Http, any, HttpEvent> {}

export interface Request extends RequestInit {
    url: URL
}

export type { Response } from 'node-fetch'
