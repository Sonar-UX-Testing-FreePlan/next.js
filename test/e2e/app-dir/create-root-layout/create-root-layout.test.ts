import path from 'path'
import { createNext, FileRef } from 'e2e-utils'
import { NextInstance } from 'test/lib/next-modes/base'
import { check } from 'next-test-utils'
import stripAnsi from 'strip-ansi'

describe('app-dir create root layout', () => {
  const isDev = (global as any).isNextDev

  if ((global as any).isNextDeploy) {
    it('should skip next deploy for now', () => {})
    return
  }

  let next: NextInstance

  if (isDev) {
    describe('page.js', () => {
      describe('root layout in app', () => {
        beforeAll(async () => {
          next = await createNext({
            files: {
              app: new FileRef(path.join(__dirname, 'app')),
              'next.config.js': new FileRef(
                path.join(__dirname, 'next.config.js')
              ),
            },
          })
        })
        afterAll(() => next.destroy())

        it('create root layout', async () => {
          const outputIndex = next.cliOutput.length
          const browser = await next.browser('/route')

          expect(await browser.elementById('page-text').text()).toBe(
            'Hello world!'
          )

          await check(
            () => stripAnsi(next.cliOutput.slice(outputIndex)),
            /did not have a root layout/
          )
          expect(stripAnsi(next.cliOutput.slice(outputIndex))).toMatch(
            'Your page app/route/page.js did not have a root layout. We created app/layout.js for you.'
          )

          expect(await next.readFile('app/layout.js')).toMatchInlineSnapshot(`
            "export const metadata = {
              title: 'Next.js',
              description: 'Generated by Next.js',
            }

            export default function RootLayout({ children }) {
             return (
                <html lang="en">
                  <body>{children}</body>
                </html>
              )
            }
            "
          `)
        })
      })

      describe('root layout in route group', () => {
        beforeAll(async () => {
          next = await createNext({
            files: {
              app: new FileRef(path.join(__dirname, 'app-group-layout')),
              'next.config.js': new FileRef(
                path.join(__dirname, 'next.config.js')
              ),
            },
            dependencies: {
              react: 'latest',
              'react-dom': 'latest',
            },
          })
        })
        afterAll(() => next.destroy())

        it('create root layout', async () => {
          const outputIndex = next.cliOutput.length
          const browser = await next.browser('/')

          expect(await browser.elementById('page-text').text()).toBe(
            'Hello world'
          )

          await check(
            () => stripAnsi(next.cliOutput.slice(outputIndex)),
            /did not have a root layout/
          )
          expect(stripAnsi(next.cliOutput.slice(outputIndex))).toInclude(
            'Your page app/(group)/page.js did not have a root layout. We created app/(group)/layout.js for you.'
          )

          expect(await next.readFile('app/(group)/layout.js'))
            .toMatchInlineSnapshot(`
            "export const metadata = {
              title: 'Next.js',
              description: 'Generated by Next.js',
            }

            export default function RootLayout({ children }) {
             return (
                <html lang="en">
                  <body>{children}</body>
                </html>
              )
            }
            "
          `)
        })
      })

      describe('find available dir', () => {
        beforeAll(async () => {
          next = await createNext({
            files: {
              app: new FileRef(path.join(__dirname, 'app-find-available-dir')),
              'next.config.js': new FileRef(
                path.join(__dirname, 'next.config.js')
              ),
            },
            dependencies: {
              react: 'latest',
              'react-dom': 'latest',
            },
          })
        })
        afterAll(() => next.destroy())

        it('create root layout', async () => {
          const outputIndex = next.cliOutput.length
          const browser = await next.browser('/route/second/inner')

          expect(await browser.elementById('page-text').text()).toBe(
            'Hello world'
          )

          await check(
            () => stripAnsi(next.cliOutput.slice(outputIndex)),
            /did not have a root layout/
          )
          expect(stripAnsi(next.cliOutput.slice(outputIndex))).toInclude(
            'Your page app/(group)/route/second/inner/page.js did not have a root layout. We created app/(group)/route/second/layout.js for you.'
          )

          expect(await next.readFile('app/(group)/route/second/layout.js'))
            .toMatchInlineSnapshot(`
            "export const metadata = {
              title: 'Next.js',
              description: 'Generated by Next.js',
            }

            export default function RootLayout({ children }) {
             return (
                <html lang="en">
                  <body>{children}</body>
                </html>
              )
            }
            "
          `)
        })
      })
    })

    describe('page.tsx', () => {
      beforeAll(async () => {
        next = await createNext({
          files: {
            'app/page.tsx': new FileRef(
              path.join(__dirname, 'app/route/page.js')
            ),
            'next.config.js': new FileRef(
              path.join(__dirname, 'next.config.js')
            ),
          },
        })
      })
      afterAll(() => next.destroy())

      it('create root layout', async () => {
        const outputIndex = next.cliOutput.length
        const browser = await next.browser('/')

        expect(await browser.elementById('page-text').text()).toBe(
          'Hello world!'
        )

        await check(
          () => stripAnsi(next.cliOutput.slice(outputIndex)),
          /did not have a root layout/
        )
        expect(stripAnsi(next.cliOutput.slice(outputIndex))).toInclude(
          'Your page app/page.tsx did not have a root layout. We created app/layout.tsx for you.'
        )

        expect(await next.readFile('app/layout.tsx')).toMatchInlineSnapshot(`
          "export const metadata = {
            title: 'Next.js',
            description: 'Generated by Next.js',
          }

          export default function RootLayout({
            children,
          }: {
            children: React.ReactNode
          }) {
            return (
              <html lang="en">
                <body>{children}</body>
              </html>
            )
          }
          "
        `)
      })
    })
  } else {
    describe('build', () => {
      it('should break the build if a page is missing root layout', async () => {
        const next = await createNext({
          skipStart: true,
          files: {
            'app/page.js': new FileRef(
              path.join(__dirname, 'app/route/page.js')
            ),
            'next.config.js': new FileRef(
              path.join(__dirname, 'next.config.js')
            ),
          },
          dependencies: {
            react: 'latest',
            'react-dom': 'latest',
          },
        })

        await expect(next.start()).rejects.toThrow('next build failed')
        expect(stripAnsi(next.cliOutput)).toInclude(
          "page.js doesn't have a root layout. To fix this error, make sure every page has a root layout."
        )
        await next.destroy()
      })
    })
  }
})
