/* global describe, it, expect */
import webdriver from 'next-webdriver'
import { readFileSync, writeFileSync, renameSync } from 'fs'
import { join } from 'path'
import { waitFor } from 'next-test-utils'

async function check (contentFn, regex) {
  while (true) {
    try {
      const newContent = await contentFn()
      if (regex.test(newContent)) break
      await waitFor(1000)
    } catch (ex) {}
  }
}

export default (context, render) => {
  describe('Hot Module Reloading', () => {
    describe('syntax error', () => {
      it('should detect the error and recover', async () => {
        const browser = await webdriver(context.appPort, '/hmr/about')
        const text = await browser
          .elementByCss('p').text()
        expect(text).toBe('This is the about page.')

        const aboutPagePath = join(__dirname, '../', 'pages', 'hmr', 'about.js')

        const originalContent = readFileSync(aboutPagePath, 'utf8')
        const erroredContent = originalContent.replace('</div>', 'div')

        // change the content
        writeFileSync(aboutPagePath, erroredContent, 'utf8')

        await check(
          () => browser.elementByCss('body').text(),
          /Unterminated JSX contents/
        )

        // add the original content
        writeFileSync(aboutPagePath, originalContent, 'utf8')

        await check(
          () => browser.elementByCss('body').text(),
          /This is the about page/
        )

        browser.close()
      })

      it('should show the error on all pages', async () => {
        const aboutPagePath = join(__dirname, '../', 'pages', 'hmr', 'about.js')

        const originalContent = readFileSync(aboutPagePath, 'utf8')
        const erroredContent = originalContent.replace('</div>', 'div')

        // change the content
        writeFileSync(aboutPagePath, erroredContent, 'utf8')

        const browser = await webdriver(context.appPort, '/hmr/contact')

        await check(
          () => browser.elementByCss('body').text(),
          /Unterminated JSX contents/
        )

        // add the original content
        writeFileSync(aboutPagePath, originalContent, 'utf8')

        await check(
          () => browser.elementByCss('body').text(),
          /This is the contact page/
        )

        browser.close()
      })
    })

    describe('delete a page and add it back', () => {
      it('should load the page properly', async () => {
        const browser = await webdriver(context.appPort, '/hmr/contact')
        const text = await browser
          .elementByCss('p').text()
        expect(text).toBe('This is the contact page.')

        const contactPagePath = join(__dirname, '../', 'pages', 'hmr', 'contact.js')
        const newContactPagePath = join(__dirname, '../', 'pages', 'hmr', '_contact.js')

        // Rename the file to mimic a deleted page
        renameSync(contactPagePath, newContactPagePath)

        // wait until the 404 page comes
        await check(
          () => browser.elementByCss('body').text(),
          /This page could not be found/
        )

        // Rename the file back to the original filename
        renameSync(newContactPagePath, contactPagePath)

        // wait until the page comes back
        await check(
          () => browser.elementByCss('body').text(),
          /This is the contact page/
        )

        browser.close()
      })
    })
  })
}
