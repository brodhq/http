import { Events } from '@geislabs/runtime-event'
import { CreateRequestAttrs } from './httpAttrs'
import { HttpConfig } from './httpConfig'
import { HttpEvent } from './httpEvents'
import { buildRequest } from './httpFactory'
import { Http, Request } from './httpTypes'

export class NodeHttp implements Http {
    public events: Events<HttpEvent>
    constructor(public config: HttpConfig) {
        this.events = config.events
    }
    async request(attrs: CreateRequestAttrs) {
        const request = buildRequest(attrs)
        const { url, ...init } = request
        this.config.events.emit('beforeRequest', request)
        const promise = this.config.fetchFn(url.toString(), init)
        this.config.events.emit('afterRequest', request)
        const response = await promise
        this.config.events.emit('afterResponse', response)
        return response
    }
}
