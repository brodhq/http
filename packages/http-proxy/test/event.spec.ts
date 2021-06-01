import { config as createEvents } from '@geislabs/runtime-event'
import { config as createHttp, HttpEvent } from '@geislabs/http'
import { config as createPlugin } from '../lib'

describe('event', () => {
    test('before request', async () => {
        const mock = jest.fn() as any
        const events = createEvents<HttpEvent>()
        const http = createHttp({ events, fetchFn: mock })
        const plugin = createPlugin({
            proxy: { 'google.com': 'localhost:4000' },
        })
        plugin.register({ http })
        await http.request({ url: 'https://google.com/about' })
        expect(mock).toHaveBeenCalledWith('https://localhost:4000/about', {})
    })
})
