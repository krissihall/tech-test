import { defineStore } from 'pinia';
import { searchService } from '../services/search.service';

export const useSearchStore = defineStore('searchStore', {
    state: () => ({
        currentSearch: null,
        searchResults: {},
        currentCategory: '',
        isSearching: false,
        searchHistory: [],
        isHistorySaving: false
    }),
    getters: {},
    actions: {
        getSearchResults(search) {
            this.isSearching = true;
            searchService.getSearchResults(search, this.currentCategory)
                .then((results) => {
                    this.searchResults = results;
                    if (results.Response !== 'False') {
                        this.saveSearchResults(results);
                    }
                })
                .finally(() => {
                    this.getSearchHistory();
                    this.isSearching = false;
                });
        },
        getSearchHistory() {
            this.isSearching = true;
            searchService.getSearchHistory()
                .then((results) => {
                    this.searchHistory = results.slice().reverse();
                })
                .finally(() => {
                    this.isSearching = false;
                });
        },
        clearSearch() {
            this.currentCategory = '';
            this.currentSearch = '';
            this.searchResults = {};
        },
        saveSearchResults(result) {
            this.isHistorySaving = true;

            return new Promise((resolve) => {
                searchService.addSearchHistoryEntry(result)
                    .then(
                        (data) => {
                            console.log(`Submitted data: ${data}`);
                            resolve();
                        },
                        (error) => {
                            resolve(error);
                        }
                    )
                    .finally(() => {
                        this.isHistorySaving = false;
                    });
            });
        }
    }
});
