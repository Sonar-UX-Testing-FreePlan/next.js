import React from 'react'

export const SuspenseContext = React.createContext<'STATIC' | null>(null)

if (process.env.NODE_ENV !== 'production') {
    SuspenseContext.displayName = 'SuspenseContext'
}

export const ClientFallbackError = new Error()