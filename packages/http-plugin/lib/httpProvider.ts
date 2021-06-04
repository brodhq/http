import nodefetch from 'node-fetch'
import { CreateRequestAttrs } from './httpAttrs'
import { buildRequest } from './httpFactory'
import { HttpPlugin } from './httpTypes'

export const plugin: HttpPlugin = {
    name: 'http',
    register({ events }, { fetchFn = nodefetch }) {
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
}
