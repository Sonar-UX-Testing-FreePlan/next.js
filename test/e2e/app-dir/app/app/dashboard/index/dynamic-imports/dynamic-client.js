'client'

import dynamic from 'next/dynamic'

const Dynamic = dynamic(() => import('../text-dynamic-client'))

export function NextDynamicClientComponent() {
  console.log('Render')
  return <Dynamic />
}
