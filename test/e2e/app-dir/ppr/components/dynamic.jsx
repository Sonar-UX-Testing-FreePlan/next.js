import React, { use } from 'react'
import { cookies } from 'next/headers'
import { Delay, Login } from './state'

export function Dynamic({ fallback, catchErrors }) {
  const dynamic = fallback !== true

  let signedIn
  let active
  if (dynamic) {
    if (catchErrors) {
      try {
        signedIn = cookies().has('session') ? true : false
        active = cookies().has('delay') ? true : false
      } catch (err) {
        console.log('Error in dynamic component')
        throw new Error('Something went wrong')
      }
    } else {
      signedIn = cookies().has('session') ? true : false
      active = cookies().has('delay') ? true : false
    }

    if (active) {
      use(new Promise((resolve) => setTimeout(resolve, 1000)))
    }
  }

  if (!dynamic) {
    return (
      <div id="dynamic-fallback">
        <pre>Loading...</pre>
        <Login fallback />
        <Delay fallback />
      </div>
    )
  }

  return (
    <div id="dynamic">
      <pre id="state" className={signedIn ? 'bg-green-600' : 'bg-red-600'}>
        {signedIn ? 'Signed In' : 'Not Signed In'}
      </pre>
      <Login signedIn={signedIn} />
      <Delay active={active} />
    </div>
  )
}
