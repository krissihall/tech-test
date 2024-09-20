<template>
    <div class="search-container container-fluid">
        <div class="row justify-between mt-4 mb-4">
            <div class="col col-12 col-md-6 mb-2">
                <div class="row align-items-end">
                    <div class="col">
                        <label class="me-2" for="titleInput">Search by Title:</label>
                        <input v-model="titleValue" id="titleInput" type="text" ref="titleField" class="form-control" placeholder="Movie Title" />
                    </div>
                    <div class="col col-auto">
                        <button class="btn btn-primary me-2" @click="searchTitleEvent">Search</button>
                        <button class="btn btn-secondary" @click="clearTitleSearch">Clear</button>
                    </div>
                </div>
            </div>
            
            <div class="col col-12 col-md-6 mb-2">
                <div class="row align-items-end">
                    <div class="col col">
                        <label class="me-2" for="idInput">Search by IMDb ID:</label>
                        <input v-model="idValue" id="idInput" type="text" ref="idField" class="form-control" placeholder="IMDb ID" /><!-- valid ID to test with: tt4154796 -->
                    </div>
                    <div class="col col-auto">
                        <button class="btn btn-primary me-2" @click="searchIdEvent">Search</button>
                        <button class="btn btn-secondary" @click="clearIdSearch">Clear</button>
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

const titleField = ref(null);
const titleValue = ref(searchStore.currentSearch || '');

const idField = ref(null);
const idValue = ref(searchStore.currentSearch || '');

const searchTitleEvent = async () => {
    searchStore.clearSearch();

    searchStore.currentCategory = 'title';
    await searchStore.getSearchResults(titleValue.value);
    searchStore.currentSearch = titleValue.value;
    searchResults.value = searchStore.searchResults;
};

const clearTitleSearch = () => {
    searchStore.currentCategory = '';
    searchStore.currentSearch = '';
    searchStore.searchResults = {};
    searchResults.value = {};
    titleValue.value = '';
}

const searchIdEvent = async () => {
    searchStore.clearSearch();

    searchStore.currentCategory = 'id';
    await searchStore.getSearchResults(idValue.value);
    searchStore.currentSearch = idValue.value;
    searchResults.value = searchStore.searchResults;
};

const clearIdSearch = () => {
    searchStore.currentCategory = '';
    searchStore.currentSearch = '';
    searchResults.value = '';
    searchStore.searchResults = {};
    idValue.value = '';
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/includes/includes";
</style>
