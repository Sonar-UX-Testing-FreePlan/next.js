import { createNext, FileRef } from 'e2e-utils'
import { NextInstance } from 'test/lib/next-modes/base'
import { findAllTelemetryEvents } from 'next-test-utils'
import { join } from 'path'

const mockedGoogleFontResponses = require.resolve(
  './google-font-mocked-responses.js'
)

describe('@next/font used telemetry', () => {
  const isNextStart = (global as any).isNextStart
  let next: NextInstance

  if (!isNextStart) {
    it('should only run when isNextStart', () => {})
    return
  }

  beforeAll(async () => {
    next = await createNext({
      files: {
        pages: new FileRef(join(__dirname, 'telemetry/pages')),
        'next.config.js': new FileRef(
          join(__dirname, 'basepath/next.config.js')
        ),
      },
      dependencies: {
        '@next/font': 'canary',
      },
      env: {
        NEXT_FONT_GOOGLE_MOCKED_RESPONSES: mockedGoogleFontResponses,
        NEXT_TELEMETRY_DEBUG: '1',
      },
    })
  })
  afterAll(() => next.destroy())

  it('should send @next/font/google and @next/font/local usage event', async () => {
    const events = findAllTelemetryEvents(
      next.cliOutput,
      'NEXT_BUILD_FEATURE_USAGE'
    )
    expect(events).toContainEqual({
      featureName: '@next/font/google',
      invocationCount: 1,
    })
    expect(events).toContainEqual({
      featureName: '@next/font/local',
      invocationCount: 1,
    })
  })
})

describe('@next/font unused telemetry', () => {
  const isNextStart = (global as any).isNextStart
  let next: NextInstance

  if (!isNextStart) {
    it('should only run when isNextStart', () => {})
    return
  }

  beforeAll(async () => {
    next = await createNext({
      files: {
        pages: new FileRef(join(__dirname, 'telemetry/pages-unused')),
        'next.config.js': new FileRef(
          join(__dirname, 'basepath/next.config.js')
        ),
      },
      dependencies: {
        '@next/font': 'canary',
      },
      env: {
        NEXT_FONT_GOOGLE_MOCKED_RESPONSES: mockedGoogleFontResponses,
        NEXT_TELEMETRY_DEBUG: '1',
      },
    })
  })
  afterAll(() => next.destroy())

  it('should send @next/font/google and @next/font/local usage event', async () => {
    const events = findAllTelemetryEvents(
      next.cliOutput,
      'NEXT_BUILD_FEATURE_USAGE'
    )
    expect(events).toContainEqual({
      featureName: '@next/font/google',
      invocationCount: 0,
    })
    expect(events).toContainEqual({
      featureName: '@next/font/local',
      invocationCount: 0,
    })
  })
})
