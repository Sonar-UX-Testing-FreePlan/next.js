import { nextTestSetup } from 'e2e-utils'

describe('ecmascript-features', () => {
  const { next } = nextTestSetup({
    files: __dirname,
  })

  // Recommended for tests that check HTML. Cheerio is a HTML parser that has a jQuery like API.
  it('should work using cheerio', async () => {
    const $ = await next.render$('/')
    expect(JSON.parse($('#values-to-check').text())).toEqual({
      privateField: 10,
      privateFieldWithInitializer: 11,
      privateStaticFieldWithInitializer: 12,
      privateStaticMethod: 12,
      exportAs: 1,
      // regex: true,
      importWith: 'Hello World',
    })
  })

  // Recommended for tests that need a full browser
  it('should work using browser', async () => {
    const browser = await next.browser('/')
    expect(
      JSON.parse(await browser.elementByCss('#values-to-check').text())
    ).toEqual({
      privateField: 10,
      privateFieldWithInitializer: 11,
      privateStaticFieldWithInitializer: 12,
      privateStaticMethod: 12,
      exportAs: 1,
      // regex: true,
      importWith: 'Hello World',
    })
  })
})
