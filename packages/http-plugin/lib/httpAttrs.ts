import { URL } from 'url'
import { Request } from './httpTypes'

export interface CreateRequestAttrs extends Omit<Request, 'url'> {
    url: string | URL
}
