/* eslint-env jest */
import { findPageFile } from 'next/dist/server/lib/find-page-file'
import { normalizePagePath } from 'next-server/dist/server/normalize-page-path'

import { join } from 'path'

const resolveDataDir = join(__dirname, '..', 'isolated', '_resolvedata')
const dirWithPages = join(resolveDataDir, 'readdir', 'pages')

describe('findPageFile', () => {
  it('should work', async () => {
    const pagePath = normalizePagePath('/nav/about')
    const result = await findPageFile(dirWithPages, pagePath, ['jsx', 'js'])
    expect(result).toBe('/nav/about.js')
  })

  it('should work with nested index.js', async () => {
    const pagePath = normalizePagePath('/nested')
    const result = await findPageFile(dirWithPages, pagePath, ['jsx', 'js'])
    expect(result).toBe('/nested/index.js')
  })

  it('should prefer prefered.js before prefered/index.js', async () => {
    const pagePath = normalizePagePath('/prefered')
    const result = await findPageFile(dirWithPages, pagePath, ['jsx', 'js'])
    expect(result).toBe('/prefered.js')
  })
})
