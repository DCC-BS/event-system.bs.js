import { defineNuxtModule, addImportsDir, addTypeTemplate, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
    meta: {
        name: 'command-handler.bs.js',
        configKey: 'command-handler.bs.js',
    },
    // Default configuration options of the Nuxt module
    defaults: {},
    setup(_options, _nuxt) {
        const resolver = createResolver(import.meta.url);

        // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
        addImportsDir(resolver.resolve('./runtime/composables'));
        addTypeTemplate({ filename: 'types/commands.d.ts', src: resolver.resolve('./runtime/models/commands.d.ts') });
    },
})