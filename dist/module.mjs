import { defineNuxtModule, createResolver, addImportsDir, addTypeTemplate } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "command-handler.bs.js",
    configKey: "command-handler.bs.js"
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);
    addImportsDir(resolver.resolve("./runtime/composables"));
    addTypeTemplate({ filename: "types/commands.d.ts", src: resolver.resolve("./runtime/models/commands.d.ts") });
  }
});

export { module as default };
