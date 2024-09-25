<template>
    <div class="search-container container-fluid">
        <div class="row justify-between mt-4 mb-4">
            <div class="col col-12 mb-2">
                <div class="row align-items-end">
                    <div class="col col-3">
                        <label class="me-2 required" for="searchInput">Search:</label>
                        <input
                            v-model.lazy="searchValue"
                            id="searchInput"
                            type="text"
                            ref="searchField"
                            class="form-control"
                            placeholder="Search"
                            :class="{ 'is-invalid': v$.search.$errors.length }"
                        />
                        <div v-for="error of v$.search.$errors" class="errors-container" :key="error.$uid">
                            <div class="text-danger">{{ error.$message }}</div>
                        </div>
                    </div>
                    <div class="col">
                        <label for="filterSelect">Filter By:</label>
                        <select v-model="selectedFilter" ref="filterField" id="filterSelect" class="form-select">
                            <option disabled hidden selected>Filter</option>
                            <option value="title">Title</option>
                            <option value="id">IMDb ID</option>
                        </select>
                    </div>
                    <div class="col">
                        <label for="typeSelect">Type:</label>
                        <select v-model="typeValue" ref="typeField" id="typeSelect" class="form-select">
                            <option disabled hidden selected>Type</option>
                            <option value="movie">Movie</option>
                            <option value="series">Series</option>
                            <option value="episode">Episode</option>
                        </select>
                    </div><div class="col">
                        <label for="plotSelect">Plot:</label>
                        <select v-model="plotValue" ref="plotField" id="plotSelect" class="form-select">
                            <option disabled hidden selected>Plot</option>
                            <option value="short">Short</option>
                            <option value="full">Full</option>
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
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

const searchStore = useSearchStore();
const searchResults = ref(searchStore.searchResults || '');

const searchField = ref(null);
const searchValue = ref(searchStore.currentSearch || '');

const filterField = ref(null);
const selectedFilter = ref(searchStore.currentCategory || 'search');

const yearField = ref(null);
const yearValue = ref(null);

const typeValue = ref(null);
const plotValue = ref(null);

const rules = {
    search: { required: helpers.withMessage('Search field is required', required) }
};

const v$ = useVuelidate(rules, searchValue);

const searchEvent = async () => {
    const valid = await v$.value.$validate();

    if (valid) {
        searchStore.clearSearch();

        searchStore.searchYear = yearValue.value;
        searchStore.currentCategory = selectedFilter.value;
        searchStore.searchType = typeValue.value;
        searchStore.searchPlot = plotValue.value;
        await searchStore.getSearchResults(searchValue.value);
        searchStore.currentSearch = searchValue.value;
        searchResults.value = searchStore.searchResults;
    } else {
        searchStore.keywordError = true;
    }
};

const clearSearch = () => {
    searchStore.currentCategory = '';
    searchStore.currentSearch = '';
    searchStore.searchResults = {};
    searchResults.value = {};
    searchValue.value = '';
    selectedFilter.value = '';
    yearField.value = '';
    typeValue.value = '';
    plotValue.value = '';
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/includes/includes";

.input-year-container {
    max-width: rem-calc(100);
}
</style>
