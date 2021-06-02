import fetch from 'node-fetch'
import { CreateRequestAttrs } from './httpAttrs'
import { HttpConfig } from './httpConfig'
import { buildRequest } from './httpFactory'
import { Http } from './httpTypes'

export const http = ({ fetchFn = fetch }: Partial<HttpConfig> = {}): Http => ({
    name: 'http',
    register({ events }) {
        return {
            async request(attrs: CreateRequestAttrs) {
                const request = buildRequest(attrs)
                const { url, ...init } = request
                events.emit('beforeRequest', request)
                const promise = fetchFn(url.toString(), init)
                events.emit('afterRequest', request)
                const response = await promise
                events.emit('afterResponse', response)
                return response
            },
        }
    },
})
