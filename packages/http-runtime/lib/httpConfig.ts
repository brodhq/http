import { Events } from '@geislabs/runtime'
import { HttpEvent } from './httpEvents'
import { FetchFn } from './httpTypes'

export interface HttpConfig {
    events: Events<HttpEvent>
    fetchFn: FetchFn
}
