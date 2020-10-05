/* eslint-env jest */

import { join } from 'path'
import {
  killApp,
  findPort,
  nextStart,
  nextBuild,
  waitFor,
} from 'next-test-utils'
import webdriver from 'next-webdriver'

jest.setTimeout(1000 * 30)

const appDir = join(__dirname, '../')
let appPort
let app
let browser

function runTests() {
  it('should render an image tag', async () => {
    await waitFor(1000)
    expect(await browser.hasElementByCssSelector('img')).toBeTruthy()
  })
  it('should support passing through arbitrary attributes', async () => {
    expect(
      await browser.hasElementByCssSelector('img#attribute-test')
    ).toBeTruthy()
    expect(
      await browser.elementByCss('img#attribute-test').getAttribute('data-demo')
    ).toBe('demo-value')
  })
  it('should modify src with the loader', async () => {
    expect(await browser.elementById('basic-image').getAttribute('src')).toBe(
      'https://example.com/myaccount/foo.jpg'
    )
  })
  it('should support manually selecting a different host', async () => {
    expect(
      await browser.elementById('secondary-image').getAttribute('src')
    ).toBe('https://examplesecondary.com/images/foo2.jpg')
  })
  it('should add a srcset based on the loader', async () => {
    expect(
      await browser.elementById('basic-image').getAttribute('srcset')
    ).toBe(
      'https://example.com/myaccount/foo.jpg?w=480 480w, https://example.com/myaccount/foo.jpg?w=1024 1024w, https://example.com/myaccount/foo.jpg?w=1600 1600w'
    )
  })
  it('should support the unoptimized attribute', async () => {
    expect(
      await browser.elementById('unoptimized-image').getAttribute('src')
    ).toBe('https://arbitraryurl.com/foo.jpg')
  })
  it('should not add a srcset if unoptimized attribute present', async () => {
    expect(
      await browser.elementById('unoptimized-image').getAttribute('srcset')
    ).toBeFalsy()
  })
}

async function hasPreloadLinkMatchingUrl(url) {
  const links = await browser.elementsByCss('link')
  let foundMatch = false
  for (const link of links) {
    const rel = await link.getAttribute('rel')
    const href = await link.getAttribute('href')
    if (rel === 'preload' && href === url) {
      foundMatch = true
      break
    }
  }
  return foundMatch
}

describe('Image Component Tests', () => {
  beforeAll(async () => {
    await nextBuild(appDir)
    appPort = await findPort()
    app = await nextStart(appDir, appPort)
  })
  afterAll(() => killApp(app))
  describe('SSR Image Component Tests', () => {
    beforeAll(async () => {
      browser = await webdriver(appPort, '/')
    })
    afterAll(async () => {
      browser = null
    })
    runTests()
    it('should add a preload tag for a priority image', async () => {
      expect(
        await hasPreloadLinkMatchingUrl(
          'https://example.com/myaccount/withpriority.png'
        )
      ).toBe(true)
    })
    it('should add a preload tag for a priority image, with secondary host', async () => {
      expect(
        await hasPreloadLinkMatchingUrl(
          'https://examplesecondary.com/images/withpriority2.png'
        )
      ).toBe(true)
    })
    it('should add a preload tag for a priority image, with arbitrary host', async () => {
      expect(
        await hasPreloadLinkMatchingUrl(
          'https://arbitraryurl.com/withpriority3.png'
        )
      ).toBe(true)
    })
  })
  describe('Client-side Image Component Tests', () => {
    beforeAll(async () => {
      browser = await webdriver(appPort, '/')
      await browser.waitForElementByCss('#clientlink').click()
    })
    afterAll(async () => {
      browser = null
    })
    runTests()
    it('should NOT add a preload tag for a priority image', async () => {
      expect(
        await hasPreloadLinkMatchingUrl(
          'https://example.com/myaccount/withpriorityclient.png'
        )
      ).toBe(false)
    })
  })
})
