/** @type {import('next').NextConfig} */
module.exports = {
  logging: {
    fetches: {},
  },
  experimental: {
    incrementalCacheHandlerPath: process.env.CUSTOM_CACHE_HANDLER,
    ppr: process.env.ENABLE_PPR === 'true',
  },

  rewrites: async () => {
    return {
      // beforeFiles: [ { source: '/assets/:path*', destination: '/:path*' } ],
      afterFiles: [
        {
          source: '/rewritten-use-search-params',
          destination: '/hooks/use-search-params',
        },
        {
          source: '/rewritten-use-pathname',
          destination: '/hooks/use-pathname/slug',
        },
      ],
    }
  },
}
