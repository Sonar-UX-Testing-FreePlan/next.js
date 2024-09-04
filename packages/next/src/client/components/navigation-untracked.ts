import { useContext } from 'react'
import {
  PathnameContext,
  SearchParamsContext,
} from '../../shared/lib/hooks-client-context.shared-runtime'

/**
 * This checks to see if the current render has any unknown route parameters.
 * It's used to trigger a different render path in the error boundary.
 *
 * @returns true if there are any unknown route parameters, false otherwise
 */
function hasFallbackRouteParams() {
  if (typeof window === 'undefined') {
    // AsyncLocalStorage should not be included in the client bundle.
    const { staticGenerationAsyncStorage } =
      require('./static-generation-async-storage.external') as typeof import('./static-generation-async-storage.external')

    const staticGenerationStore = staticGenerationAsyncStorage.getStore()
    if (!staticGenerationStore) return false

    const { fallbackRouteParams } = staticGenerationStore
    if (!fallbackRouteParams || fallbackRouteParams.size === 0) return false

    return true
  }

  return false
}

/**
 * This returns a `null` value if there are any unknown route parameters, and
 * otherwise returns the pathname from the context. This is an alternative to
 * `usePathname` that is used in the error boundary to avoid rendering the
 * error boundary when there are unknown route parameters. This doesn't throw
 * when accessed with unknown route parameters.
 *
 * @returns
 *
 * @internal
 */
export function useUntrackedPathname(): string | null {
  // If there are any unknown route parameters we would typically throw
  // an error, but this internal method allows us to return a null value instead
  // for components that do not propagate the pathname to the static shell (like
  // the error boundary).
  if (hasFallbackRouteParams()) {
    return null
  }

  // This shouldn't cause any issues related to conditional rendering because
  // the environment will be consistent for the render.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useContext(PathnameContext)
}

/**
 * This returns the search params from the context. This is used instead of
 * `useSearchParams` in the error boundary to avoid wrapping the error boundary
 * in a `Suspense` boundary, which would cause rendering issues for all the pages.
 *
 * @returns The search params from the context or `null` if not found.
 *
 * @internal
 */
export function useUntrackedSearchParams(): URLSearchParams | null {
  return useContext(SearchParamsContext)
}
