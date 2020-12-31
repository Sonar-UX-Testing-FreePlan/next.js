/* eslint-env jest */

import { join } from 'path'
import webdriver from 'next-webdriver'
import {
  findPort,
  launchApp,
  killApp,
  nextStart,
  nextBuild,
  File,
  hasRedbox,
  getRedboxHeader,
} from 'next-test-utils'

jest.setTimeout(1000 * 60 * 1)

let app
let appPort
const appDir = join(__dirname, '../')
const invalidPage = new File(join(appDir, 'pages/invalid.js'))

function runTests(isDev) {
  if (isDev) {
    it('should show error when accessing isReady in render on server', async () => {
      invalidPage.replace('// console', 'console')
      const browser = await webdriver(appPort, '/invalid')

      expect(await hasRedbox(browser)).toBe(true)
      expect(await getRedboxHeader(browser)).toContain(
        `No router instance found. you should only use "next/router" inside the client side of your app`
      )
      invalidPage.restore()
    })
  }

  it('isReady should be true immediately for getInitialProps page', async () => {
    const browser = await webdriver(appPort, '/gip')
    expect(await browser.eval('window.isReadyValues')).toEqual([true])
  })

  it('isReady should be true immediately for getInitialProps page with query', async () => {
    const browser = await webdriver(appPort, '/gip?hello=world')
    expect(await browser.eval('window.isReadyValues')).toEqual([true])
  })

  it('isReady should be true immediately for getServerSideProps page', async () => {
    const browser = await webdriver(appPort, '/gssp')
    expect(await browser.eval('window.isReadyValues')).toEqual([true])
  })

  it('isReady should be true immediately for getServerSideProps page with query', async () => {
    const browser = await webdriver(appPort, '/gssp?hello=world')
    expect(await browser.eval('window.isReadyValues')).toEqual([true])
  })

  it('isReady should be true immediately for auto-export page without query', async () => {
    const browser = await webdriver(appPort, '/auto-export')
    expect(await browser.eval('window.isReadyValues')).toEqual([true])
  })

  it('isReady should be true after query update for auto-export page with query', async () => {
    const browser = await webdriver(appPort, '/auto-export?hello=world')
    expect(await browser.eval('window.isReadyValues')).toEqual([false, true])
  })

  it('isReady should be true after query update for getStaticProps page with query', async () => {
    const browser = await webdriver(appPort, '/gsp?hello=world')
    expect(await browser.eval('window.isReadyValues')).toEqual([false, true])
  })

  it('isReady should be true immediately for getStaticProps page without query', async () => {
    const browser = await webdriver(appPort, '/gsp')
    expect(await browser.eval('window.isReadyValues')).toEqual([true])
  })
}

describe('router.isReady', () => {
  describe('dev mode', () => {
    beforeAll(async () => {
      appPort = await findPort()
      app = await launchApp(appDir, appPort)
    })
    afterAll(async () => {
      await killApp(app)
      invalidPage.restore()
    })

    runTests(true)
  })

  describe('production mode', () => {
    beforeAll(async () => {
      await nextBuild(appDir)

      appPort = await findPort()
      app = await nextStart(appDir, appPort)
    })
    afterAll(() => killApp(app))

    runTests()
  })
})
