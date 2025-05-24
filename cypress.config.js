import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'ed4pnb',
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    chromeWebSecurity: false,
  },
})
