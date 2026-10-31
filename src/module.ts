import { existsSync } from "node:fs";
import {
    addImportsDir,
    addTypeTemplate,
    createResolver,
    defineNuxtModule,
} from "@nuxt/kit";

export default defineNuxtModule({
    meta: {
        name: "command-handler.bs.js",
        configKey: "command-handler.bs.js",
    },
    // Default configuration options of the Nuxt module
    defaults: {},
    setup(_options, _nuxt) {
        const resolver = createResolver(import.meta.url);

        // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
        addImportsDir(resolver.resolve("./runtime/composables"));
        // The published package only ships the transpiled commands.d.ts; commands.ts
        // exists only in the source tree (playground / stub builds).
        const commandTypes = resolver.resolve("./runtime/models/commands.d.ts");
        addTypeTemplate({
            filename: "types/commands.d.ts",
            src: existsSync(commandTypes)
                ? commandTypes
                : resolver.resolve("./runtime/models/commands.ts"),
        });
    },
});
