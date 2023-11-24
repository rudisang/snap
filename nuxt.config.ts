// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false},
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  css: ['bootstrap/dist/css/bootstrap.css'],
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
  },
  modules: ['@pinia/nuxt', '@vite-pwa/nuxt','nuxt-quasar-ui'],
  quasar: { /* */ },
  pwa: {
    manifest: {
      name: 'Snap',
      short_name: 'Snap',
      description: 'Race against the clock as you attempt to convey and guess a variety of words within a tight timeframe. With a simple and intuitive interface, Snap brings fast-paced fun to your fingertips, making it easy for friends and family to engage in rapid-fire word association rounds. ',
      icons: [
        {
          src: "icons/android-launchericon-512-512.png",
          sizes: "512x512"
        },
        {
          src: "icons/android-launchericon-192-192.png",
          sizes: "192x192"
        },
        {
          src: "icons/android-launchericon-144-144.png",
          sizes: "144x144"
        },
        {
          src: "icons/android-launchericon-96-96.png",
          sizes: "96x96"
        },
        {
          src: "icons/android-launchericon-72-72.png",
          sizes: "72x72"
        },
        {
          src: "icons/android-launchericon-48-48.png",
          sizes: "48x48"
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
   },
  // devServer: {
  //     host: '0'
  // }
})
