import { StaticGenBailoutError } from '../../client/components/static-generation-bailout'

/**
 * React annotates Promises with extra properties to make unwrapping them synchronous
 * after they have resolved. We sometimes create promises that are compatible with this
 * internal implementation detail when we want to construct a promise that is already resolved.
 *
 * @internal
 */
export function makeResolvedReactPromise<T>(value: T): Promise<T> {
  const promise = Promise.resolve(value)
  ;(promise as any).status = 'fulfilled'
  ;(promise as any).value = value
  return promise
}

// This regex will have fast negatives meaning valid identifiers may not pass
// this test. However this is only used during static generation to provide hints
// about why a page bailed out of some or all prerendering and we can use bracket notation
// for example while `ಠ_ಠ` is a valid identifier it's ok to print `searchParams['ಠ_ಠ']`
// even if this would have been fine too `searchParams.ಠ_ಠ`
const isDefinitelyAValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/

export function describeStringPropertyAccess(target: string, prop: string) {
  if (isDefinitelyAValidIdentifier.test(prop)) {
    return `\`${target}.${prop}\``
  }
  return `\`${target}[${JSON.stringify(prop)}]\``
}

export function describeHasCheckingStringProperty(
  target: string,
  prop: string
) {
  const stringifiedProp = JSON.stringify(prop)
  return `\`Reflect.has(${target}, ${stringifiedProp}\`, \`${stringifiedProp} in ${target}\`, or similar`
}

export function throwWithStaticGenerationBailoutError(
  route: string,
  expression: string
): never {
  throw new StaticGenBailoutError(
    `Route ${route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`
  )
}
