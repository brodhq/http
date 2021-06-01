import { runtime as createRuntime } from '@geislabs/runtime'
import { config as createEvents } from '@geislabs/runtime-event'
import { config as createHttp, Http, HttpEvent } from '@geislabs/http-runtime'
import { config as createPlugin } from '../lib'

describe('event', () => {
    test('before request', async () => {
        const mock = jest.fn() as any
        const events = createEvents<HttpEvent>()
        const http = createHttp({ events, fetchFn: mock })
        const runtime = createRuntime<Http>({ events, dependencies: [http] })
        const plugin = createPlugin({
            proxy: { 'google.com': 'localhost:4000' },
        })
        plugin.register(runtime)
        await http.request({ url: 'https://google.com/about' })
        expect(mock).toHaveBeenCalledWith('https://localhost:4000/about', {})
    })
})
