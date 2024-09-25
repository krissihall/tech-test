import 'bootstrap/dist/css/bootstrap.css';
import './assets/scss/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { definePreset } from '@primevue/themes';
import { primevueTheme } from '@/data/primevue-theme';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import App from './App.vue';
import router from './router';

const app = createApp(App);

const updatedPresets = definePreset(Aura, primevueTheme);

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
