<template>
    <div class="search-history-container container-fluid">
        <template v-if="searchHistory && searchHistory.length">
            <DataView :value="searchHistory" paginator :rows="10" :rowsPerPageOptions="[10, 20, 30]"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                    paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown">
                <template #list="slotProps">
                    <SearchResultsInfo v-for="(item, index) in slotProps.items" :result="item" className="history-result" :key="index" />
                </template>
            </DataView>
        </template>
        <template v-else>
            <p class="no-history">No search history.</p>
        </template>
    </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue';
import { useSearchStore } from '@/stores';
import { isEmpty } from '@/helpers';
import DataView from 'primevue/dataview';
import SearchResultsInfo from './SearchResultsInfo.vue';

const searchStore = useSearchStore();
const searchResults = computed(() => searchStore.searchResults);
const searchHistory = computed(() => searchStore.searchHistory);

watch(searchResults, (newObj) => {
    if (newObj && !isEmpty(newObj)) {
        searchStore.getSearchHistory();
    }
});

onMounted(() => {
    if (!searchHistory.value && !searchHistory.value.length) {
        searchStore.getSearchHistory();
    }
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/includes/includes';

.search-history-container {
    padding-top: rem-calc(24);
}

.no-history {
    color: rgba($light, 0.5);
    font-size: rem-calc(22);
}
</style>
