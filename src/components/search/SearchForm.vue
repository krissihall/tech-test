<template>
    <div class="search-container container-fluid">
        <div class="row justify-between mt-4 mb-4">
            <div class="col col-12 mb-2">
                <div class="row align-items-end">
                    <div class="col">
                        <label class="me-2" for="searchInput">Search:</label>
                        <input v-model="searchValue" id="searchInput" type="text" ref="searchField" class="form-control" placeholder="Search" />
                    </div>
                    <div class="col">
                        <label for="filterSelect">Filter By:</label>
                        <select v-model="selectedFilter" ref="filterField" id="filterSelect" class="form-select" @change="changeSelectFilter">
                            <option disabled selected>Filter</option>
                            <option value="title">Title</option>
                            <option value="id">IMDb ID</option>
                        </select>
                    </div>
                    <div class="col input-year-container">
                        <label for="searchYear">Year:</label>
                        <input v-model="yearValue" id="searchYear" ref="yearField" type="number" class="form-control input-year" placeholder="Year" />
                    </div>
                    <div class="col col-auto">
                        <button class="btn btn-primary me-2" @click="searchEvent">Search</button>
                        <button class="btn btn-light" @click="clearSearch">Clear</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSearchStore } from '@/stores';

const searchStore = useSearchStore();
const searchResults = ref(searchStore.searchResults || '');

const searchField = ref(null);
const searchValue = ref(searchStore.currentSearch || '');

const filterField = ref(null);
const selectedFilter = ref(searchStore.currentCategory || 'search');

const yearField = ref(null);
const yearValue = ref(null);

const searchEvent = async () => {
    searchStore.clearSearch();

    searchStore.searchYear = yearValue.value;
    searchStore.currentCategory = selectedFilter.value;
    await searchStore.getSearchResults(searchValue.value);
    searchStore.currentSearch = searchValue.value;
    searchResults.value = searchStore.searchResults;
};

const clearSearch = () => {
    searchStore.currentCategory = '';
    searchStore.currentSearch = '';
    searchStore.searchResults = {};
    searchResults.value = {};
    searchValue.value = '';
    selectedFilter.value = '';
    yearValue.value = '';
}

const changeSelectFilter = () => {
    searchStore.currentCategory = selectedFilter.value;
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/includes/includes";

.input-year-container {
    max-width: rem-calc(100);
}
</style>
