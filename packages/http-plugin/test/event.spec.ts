import { PluginObject, config as createRuntime } from '@geislabs/plugin'
import { plugin } from '../lib'

describe('event', () => {
    test('before request', async () => {
        const mock = jest.fn() as any
        const runtime = createRuntime({
            plugins: [
                <PluginObject<typeof plugin>>{
                    plugin,
                    options: { fetchFn: mock },
                },
            ],
        })
        const context = await runtime.load()
        context.http.events.on('beforeRequest', (request) => {
            request.url.hostname = 'localhost'
            request.url.port = '4000'
        })
        await context.http.request({ url: 'https://google.com/about' })
        expect(mock).toHaveBeenCalledWith('https://localhost:4000/about', {})
    })
})
