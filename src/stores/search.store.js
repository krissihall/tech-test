import { defineStore } from 'pinia';
import { searchService } from '../services/search.service';

export const useSearchStore = defineStore('searchStore', {
    state: () => ({
        currentSearch: null,
        searchResults: {},
        currentCategory: '',
        isSearching: false
    }),
    getters: {},
    actions: {
        getSearchResults(search) {
            this.isSearching = true;
            searchService.getSearchResults(search, this.currentCategory)
                .then((results) => {
                    this.searchResults = results;
                })
                .finally(() => {
                    this.isSearching = false;
                });
        },
        clearSearch() {
            this.currentCategory = '';
            this.currentSearch = '';
            this.searchResults = {};
        }
    }
});
