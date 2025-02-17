import { defineNuxtModule, addImportsDir } from '@nuxt/kit'

export default defineNuxtModule({
    meta: {
        name: 'command-handler.bs.js',
        configKey: 'command-handler.bs.js',
    },
    // Default configuration options of the Nuxt module
    defaults: {},
    setup(_options, _nuxt) {
        // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
        addImportsDir('./runtime/composables')
    },
})
