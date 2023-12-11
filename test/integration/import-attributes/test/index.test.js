import { join } from 'path'
import { renderViaHTTP, runDevSuite, runProdSuite } from 'next-test-utils'

const appDir = join(__dirname, '../')

function basic(context) {
  it('should handle json attributes', async () => {
    const esHtml = await renderViaHTTP(context.appPort, '/es')
    const tsHtml = await renderViaHTTP(context.appPort, '/ts')
    expect(esHtml).toContain('foo')
    expect(tsHtml).toContain('foo')
  })
}

runDevSuite('import-attributes', appDir, { runTests: basic })
runProdSuite('import-attributes', appDir, { runTests: basic })
