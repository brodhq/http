import { config as createRuntime } from '@geislabs/runtime'
import { http } from '@geislabs/http-runtime'
import { proxy } from '../lib'

describe('plugin', () => {
    test('proxy', async () => {
        const fetchFn = jest.fn() as any
        const runtime = createRuntime({
            plugins: [
                http({
                    fetchFn,
                }),
                proxy({
                    mapping: { 'google.com': 'localhost:4000' },
                }),
            ],
        })
        const context = await runtime.load()
        await context.http.request({ url: 'https://google.com/about' })
        expect(fetchFn).toHaveBeenCalledWith('https://localhost:4000/about', {})
    })
    test('emit', async () => {
        expect.hasAssertions()
        const fetchFn = jest.fn() as any
        const runtime = createRuntime({
            plugins: [
                http({
                    fetchFn,
                }),
                proxy({
                    mapping: { 'google.com': 'localhost:4000' },
                }),
            ],
        })
        const context = await runtime.load()
        context.events.on('beforeProxy', (event) => {
            expect(event.request.url.toString()).toBe(
                'https://localhost:4000/about'
            )
        })
        await context.http.request({ url: 'https://google.com/about' })
    })
})
