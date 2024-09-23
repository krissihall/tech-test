import { defineStore } from 'pinia';
import { searchService } from '../services/search.service';

export const useSearchStore = defineStore('searchStore', {
    state: () => ({
        currentSearch: null,
        searchResults: [],
        currentCategory: 'search',
        searchYear: null,
        searchType: null,
        searchPlot: null,
        isSearching: false,
        searchHistory: [],
        isHistorySaving: false
    }),
    getters: {},
    actions: {
        getSearchResults(search) {
            this.isSearching = true;
            searchService.getSearchResults(search, this.currentCategory, this.searchYear, this.searchType, this.searchPlot)
                .then((results) => {
                    if (results.hasOwnProperty('Search')) {
                        results.Search.forEach(item => {
                            this.getResultDetails(item.imdbID, results.Response);
                        });
                    } else {
                        this.searchResults = [results];

                        if (results.Response !== 'False' || !results.Response) {
                            this.saveSearchResults(results);
                        }
                    }
                })
                .finally(() => {
                    this.getSearchHistory();
                    this.isSearching = false;
                });
        },
        getResultDetails(id, res) {
            searchService.getSearchResults(id, 'id')
                .then((result) => {
                    this.searchResults.push(result);

                    if (res !== 'False' || !res) {
                        this.saveSearchResults(result);
                    }
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
            this.searchYear = '';
            this.searchType = '';
            this.searchPlot = '';
            this.searchResult = {};
            this.searchResults = [];
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
