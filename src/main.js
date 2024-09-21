import 'bootstrap/dist/css/bootstrap.css';
import './assets/scss/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { definePreset } from '@primevue/themes';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import App from './App.vue';
import router from './router';

const app = createApp(App);

const updatedPresets = definePreset(Aura, {
    primitive: {
        primaryUpdate: { 50: '#fbe5f0', 100: '#f7cde1', 200: '#f09ac3', 300: '#e868a4', 400: '#e13586', 500: '#d90368', 600: '#ae0253', 700: '#82023e', 800: '#57012a', 900: '#2b0115', 950: '#16000b' },
        secondary: { 50: '#fffbe5', 100: '#fff6cc', 200: '#ffee99', 300: '#ffe566', 400: '#ffdd33', 500: '#ffd400', 600: '#ccaa00', 700: '#997f00', 800: '#fbe5f0', 900: '#332a00', 950: '#1a1600' },
        tertiary: { 50: '#eee7f3', 100: '#ddd0e7', 200: '#bba1cf', 300: '#9871b8', 400: '#7642a0', 500: '#541388', 600: '#430f6d', 700: '#320b52', 800: '#220836', 900: '#11041b', 950: '#09020e' },
        dark: { 50: '#eae9ed', 100: '#d5d4dc', 200: '#aba9b8', 300: '#000000', 400: '#585471', 500: '#2e294e', 600: '#25213e', 700: '#1c192f', 800: '#12101f', 900: '#090810', 950: '#050408' },
    },
    semantic: {
        primary: {
            50: '{primaryUpdate.50}', 100: '{primaryUpdate.100}', 200: '{primaryUpdate.200}', 300: '{primaryUpdate.300}', 400: '{primaryUpdate.400}', 500: '{primaryUpdate.500}', 600: '{primaryUpdate.600}',  700: '{primaryUpdate.700}', 800: '{primaryUpdate.800}', 900: '{primaryUpdate.900}', 950: '{primaryUpdate.950}'
        },
        disabledOpacity: '0.5',
        colorScheme: {
            light: {
                surface: { 0: '#ffffff', 50: '{dark.50}', 100: '{dark.100}', 200: '{dark.200}', 300: '{dark.300}', 400: '{dark.400}', 500: '{dark.500}', 600: '{dark.600}', 700: '{dark.700}', 800: '{dark.800}', 900: '{dark.900}', 950: '{dark.950}' }
            },
            dark: {
                surface: { 0: '#ffffff', 50: '{dark.50}', 100: '{dark.100}', 200: '{dark.200}', 300: '{dark.300}', 400: '{dark.400}', 500: '{dark.500}', 600: '{dark.600}', 700: '{dark.700}', 800: '{dark.800}', 900: '{dark.900}', 950: '{dark.950}' }
            }
        }
    }
});

app.use(router);
app.use(createPinia());
app.use(PrimeVue, {
    theme: {
        // ...Aura,
        preset: updatedPresets,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
});

app.mount('#app');
