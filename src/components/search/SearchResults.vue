<template>
    <div class="search-results-container container-fluid mb-4">
        <div v-if="hasKeywordError">
            <div class="alert alert-danger" role="alert">
                You need to provide a search term.
            </div>
        </div>
        <div v-else-if="hasError">
            <div class="alert alert-danger" role="alert">
                We're sorry, and error has occurred. {{ searchResults.Error }}
            </div>
        </div>
        <div v-else-if="searchResults && !isEmpty(searchResults) && !isSearching">
            {{searchResults.totalResults}}
            <SearchResultsInfo v-for="(item, index) in searchResults" :result="item" className="search-result" :key="index" />
            <SearchLoadMore />
        </div>
        <div v-else-if="!isEmpty(searchResults) && isSearching">
            <LoadingSpinner className="is-searching" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useSearchStore } from '@/stores';
import { isEmpty } from '@/helpers';
import SearchResultsInfo from '@/components/search/SearchResultsInfo.vue';
import SearchLoadMore from '@/components/search/SearchLoadMore.vue';
import LoadingSpinner from '@/components/layout/LoadingSpinner.vue';

const searchStore = useSearchStore();
const searchResults = computed(() => searchStore.searchResults);
const isSearching = computed(() => searchStore.isSearching);
const hasKeywordError = computed(() => searchStore.keywordError);
const hasError = ref(false);
</script>

<style scoped lang="scss">
@import '@/assets/scss/includes/includes';

.search-results-container {
    position: relative;
}
</style>
