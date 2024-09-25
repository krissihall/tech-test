<template>
    <div class="pagination">
        <div v-if="loadMore" class="loading-container">
            <LoadingSpinner theme="light" />
        </div>
        <div class="row align-items-center space-between">
            <div class="col col-auto">
                <button class="btn btn-primary" @click="loadMoreResults">Load More</button>
            </div>
            <div class="col">
                <!-- Showing Page {{ currentPage }} of {{ totalPages }}<br /> -->
                Showing {{ currentCount }} of {{ totalResults }} Results
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useSearchStore } from '@/stores';
import { round } from '@/helpers';
import LoadingSpinner from '@/components/layout/LoadingSpinner.vue';

const searchStore = useSearchStore();
const totalResults = computed(() => searchStore.numSearchResults);
const perPage = computed(() => searchStore.showPerPage);
const loadMore = computed(() => searchStore.loadMore);
const currentCount = computed(() => searchStore.visibleSearchCount);
const currentPage = ref(searchStore.currentPage || 1);
const totalPages = ref(1);

const setPageNumbers = () => {
    totalPages.value = round((totalResults.value / perPage.value), 0);
};

const loadMoreResults = async () => {
    if (currentPage.value < totalPages.value) {
        searchStore.getNextSearchPage(currentPage.value += 1);
    }
};

onMounted(() => {
    setPageNumbers();
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/includes/includes';

.pagination {
    display: flex;
    flex-direction: column;
}
</style>
