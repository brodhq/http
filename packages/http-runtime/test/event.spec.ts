import { config as createEvents } from '@geislabs/runtime-event'
import { config, HttpEvent } from '../lib'

describe('event', () => {
    test('before request', async () => {
        const mock = jest.fn() as any
        const events = createEvents<HttpEvent>()
        const http = config({ events, fetchFn: mock })
        http.events.on('beforeRequest', (request) => {
            request.url.hostname = 'localhost'
            request.url.port = '4000'
        })
        await http.request({ url: 'https://google.com/about' })
        expect(mock).toHaveBeenCalledWith('https://localhost:4000/about', {})
    })
})
