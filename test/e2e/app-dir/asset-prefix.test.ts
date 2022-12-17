import { createNextDescribe } from 'e2e-utils'
import { fetchViaHTTP, renderViaHTTP } from 'next-test-utils'
import path from 'path'
import cheerio from 'cheerio'
import webdriver from 'next-webdriver'

createNextDescribe(
  'app-dir assetPrefix handling',
  {
    files: path.join(__dirname, 'asset-prefix'),
    skipDeployment: true,
  },
  ({ next }) => {
    it('should redirect route when requesting it directly', async () => {
      const res = await fetchViaHTTP(
        next.url,
        '/a/',
        {},
        {
          redirect: 'manual',
        }
      )
      expect(res.status).toBe(308)
      expect(res.headers.get('location')).toBe(next.url + '/a')
    })

    it('should render link', async () => {
      const html = await renderViaHTTP(next.url, '/')
      const $ = cheerio.load(html)
      expect($('#to-a-trailing-slash').attr('href')).toBe('/a')
    })

    it('should redirect route when requesting it directly by browser', async () => {
      const browser = await webdriver(next.url, '/a')
      expect(await browser.waitForElementByCss('#a-page').text()).toBe('A page')
    })

    it('should redirect route when clicking link', async () => {
      const browser = await webdriver(next.url, '/')
      await browser
        .elementByCss('#to-a-trailing-slash')
        .click()
        .waitForElementByCss('#a-page')
      expect(await browser.waitForElementByCss('#a-page').text()).toBe('A page')
    })
  }
)
