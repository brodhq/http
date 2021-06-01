import type { Event, Events } from '@geislabs/runtime-event'
import type { URL } from 'url'
import type { HttpEvent } from './httpEvents'
import fetch, { RequestInit, Response } from 'node-fetch'
import { CreateRequestAttrs } from './httpAttrs'

export interface Dependency<TName extends string, TEvent extends Event<any>> {
    name: TName
    events: Events<TEvent>
}

export type Runtime<TDeps extends Dependency<any, any>> = {
    [P in TDeps['name']]: Extract<TDeps, { name: P }>
}

export type FetchFn = typeof fetch

export interface Http extends Dependency<'http', HttpEvent> {
    request: (request: CreateRequestAttrs) => Promise<Response>
}

export interface Request extends RequestInit {
    url: URL
}

export type { Response } from 'node-fetch'
