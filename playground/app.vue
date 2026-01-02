<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useCommandBus } from '../src/runtime/composables/useCommandBus';
import type { ICommand } from '../src/runtime/models/commands';

class MyComannd implements ICommand {
    $type = 'MyCommand';

    constructor(public payload: string) {
    }
}

const { registerHandler, unregisterHandler, executeCommand } = useCommandBus();

onMounted(() => {
    registerHandler('MyCommand', handler);
    console.log('mounted');
});

onUnmounted(() => {
    unregisterHandler('MyCommand', handler);
    console.log('unmounted');
});

async function handler(command: MyComannd) {
    console.log('handler', command);
}

function onClick() {
    executeCommand(new MyComannd('payload'));
}
</script>


<template>
    <div>basic</div>
    <button @click="onClick">Click me</button>
</template>
