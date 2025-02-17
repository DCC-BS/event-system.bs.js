import { defineNuxtModule, addImportsDir } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "command-handler.bs.js",
    configKey: "command-handler.bs.js"
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    addImportsDir("./runtime/composables");
  }
});

export { module as default };
