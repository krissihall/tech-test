<template>
    <div class="search-results-container container-fluid">
        <div v-if="hasError">
            <div class="alert alert-danger" role="alert">
                We're sorry, and error has occurred. {{ searchResults.Error }}
            </div>
        </div>
        <div v-else-if="searchResults && !isEmpty(searchResults) && !isSearching">
            <SearchResultsInfo v-for="result in searchResults" :result="result" :key="result.id" />
        </div>
        <div v-else-if="!isEmpty(searchResults) && isSearching">
            <LoadingSpinner className="is-searching" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useSearchStore } from '@/stores';
import { isEmpty } from '@/helpers';
import SearchResultsInfo from '@/components/search/SearchResultsInfo.vue';
import LoadingSpinner from '@/components/layout/LoadingSpinner.vue';

const searchStore = useSearchStore();
const searchResults = computed(() => searchStore.searchResults);
const isSearching = computed(() => searchStore.isSearching);
const hasError = ref(false);

watch(searchResults, (newObj) => {
    if (!isEmpty(newObj) && newObj.Response !== 'False') {
        console.log('new search', newObj);
        // Do something if custom work is needed
        hasError.value = false;
    } else if (newObj.Response === 'False') {
        console.log('error has occured', newObj.Error);
        // Display error message
        // TODO: use Bootstrap "toast" message for errors: https://getbootstrap.com/docs/5.3/components/toasts/
        hasError.value = true;
    }
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/includes/includes';

.search-results-container {
    position: relative;
}
</style>
