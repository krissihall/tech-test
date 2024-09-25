import { defineStore } from 'pinia';
import { searchService } from '../services/search.service';
import { isEmpty } from '@/helpers';

export const useSearchStore = defineStore('searchStore', {
    state: () => ({
        currentSearch: null,
        numSearchResults: 0,
        showPerPage: 10,
        currentPage: 1,
        searchResults: [],
        currentCategory: 'search',
        searchYear: null,
        searchType: null,
        searchPlot: null,
        isSearching: false,
        searchHistory: [],
        isHistorySaving: false,
        keywordError: false,
        loadMore: false
    }),
    getters: {},
    actions: {
        getSearchResults(search) {
            if (this.loadMore) {
                this.isSearching = true;
            }
            searchService.getSearchResults(search, this.currentCategory, this.searchYear, this.searchType, this.searchPlot)
                .then((results) => {
                    if (results.hasOwnProperty('Search')) {
                        this.numSearchResults = results.totalResults;
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
            searchService.getSearchResults(id, 'id', this.searchYear, this.searchType, this.searchPlot)
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
        getNextSearchPage(page) {
            this.loadMore = true;
            searchService.getSearchResults(this.currentSearch, this.currentCategory, this.searchYear, this.searchType, this.searchPlot, page)
                .then((result) => {
                    if ((result.Search && result.Search.length) && result !== 'False' || !result) {
                        result.Search.forEach(item => {
                            this.getResultDetails(item.imdbID, result);
                        });
                    }
                })
                .finally(() => {
                    this.loadMore = false;
                });
        },
        clearSearch() {
            this.keywordError = false;
            this.currentCategory = '';
            this.currentSearch = '';
            this.searchYear = '';
            this.searchType = '';
            this.searchPlot = '';
            this.searchResult = {};
            this.searchResults = [];
            this.numSearchResults = 0;
            this.currentPage = 1;
        },
        saveSearchResults(result) {
            this.isHistorySaving = true;
            if (!this.currentSearch || isEmpty(this.currentSearch)) {
                this.keywordError = true;
            }

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
