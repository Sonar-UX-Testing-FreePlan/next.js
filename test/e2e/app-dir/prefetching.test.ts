import { createNext, FileRef } from 'e2e-utils'
import crypto from 'crypto'
import { NextInstance } from 'test/lib/next-modes/base'
import { check, fetchViaHTTP, renderViaHTTP, waitFor } from 'next-test-utils'
import path from 'path'
import cheerio from 'cheerio'
import webdriver from 'next-webdriver'

describe('app dir prefetching', () => {
  const isDev = (global as any).isNextDev

  if ((global as any).isNextDeploy) {
    it('should skip next deploy for now', () => {})
    return
  }

  if (process.env.NEXT_TEST_REACT_VERSION === '^17') {
    it('should skip for react v17', () => {})
    return
  }
  let next: NextInstance

  beforeAll(async () => {
    next = await createNext({
      files: new FileRef(path.join(__dirname, 'app-prefetch')),
      dependencies: {
        react: 'experimental',
        'react-dom': 'experimental',
      },
      skipStart: true,
    })
    await next.start()
  })
  afterAll(() => next.destroy())

  it('should show layout eagerly when prefetched with loading one level down', async () => {
    const browser = await webdriver(next.url, '/')
    // Ensure the page is prefetched
    await waitFor(1000)

    const before = Date.now()
    await browser
      .elementByCss('#to-dashboard')
      .click()
      .waitForElementByCss('#dashboard-layout')
    const after = Date.now()
    const timeToComplete = after - before

    expect(timeToComplete < 1000).toBe(true)

    expect(await browser.elementByCss('#dashboard-layout').text()).toBe(
      'Dashboard Hello World'
    )

    await browser.waitForElementByCss('#dashboard-page')

    expect(await browser.waitForElementByCss('#dashboard-page').text()).toBe(
      'Welcome to the dashboard'
    )
  })
})
