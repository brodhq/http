import { URL } from 'url'
import { CreateRequestAttrs } from './httpAttrs'
import { Request } from './httpTypes'

export function buildRequest(attrs: CreateRequestAttrs): Request {
    const { url, ...init } = attrs
    const resolvedUrl = typeof url === 'string' ? new URL(url) : url
    return { url: resolvedUrl, ...init }
}
