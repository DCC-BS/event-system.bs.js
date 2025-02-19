import { defineConfig, coverageConfigDefaults } from 'vitest/config';


export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            exclude: [
                '**/playground/**',
                '**/models/**',
                'src/module.ts',
                ...coverageConfigDefaults.exclude]
        },
        reporters: ['junit'],
        outputFile: 'test-report.junit.xml',
    },
});