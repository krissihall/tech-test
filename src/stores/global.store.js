import { defineStore } from 'pinia';
import { API_KEY } from '../data/constants';

export const useGlobalStore = defineStore('globalStore', {
    state: () => ({
        apiKey: API_KEY
    }),
    getters: {},
    actions: {}
});
