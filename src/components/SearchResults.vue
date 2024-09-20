<template>
    <div class="search-results-container container-fluid">
        <div v-if="hasError">
            <div class="alert alert-danger" role="alert">
                We're sorry, and error has occurred. {{ searchResults.Error }}
            </div>
        </div>
        <div v-else-if="!isEmpty(searchResults) && !isSearching" class="row">
            <div v-if="!isEmpty(searchResults.Poster)" class="col col-auto poster">
                <img :src="searchResults.Poster" :title="searchResults.Title" class="poster-photo" />
            </div>
            <div class="col info">
                <h2>{{ searchResults.Title }}</h2>
                <div class="movie-details">
                    <ul class="list-inline mb-0">
                        <li class="list-inline-item me-3">{{ searchResults.Rated }}</li>
                        <li class="list-inline-item me-3">{{ searchResults.Year }}</li>
                        <li class="list-inline-item me-3">{{ searchResults.Runtime }}</li>
                        <li class="list-inline-item me-3">{{ searchResults.Released }}</li>
                    </ul>
                    <ul class="list-inline mb-0">
                        <li class="list-inline-item me-3">{{ searchResults.Actors }}</li>
                    </ul>
                    <ul class="list-inline mb-0">
                        <li class="list-inline-item me-3">{{ searchResults.Genre }}</li>
                        <li class="list-inline-item me-3">{{ searchResults.Director }}</li>
                        <li class="list-inline-item me-3">{{ searchResults.Writer }}</li>
                    </ul>
                </div>
                <p class="lead">{{ searchResults.Plot }}</p>
            </div>
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
import LoadingSpinner from './layout/LoadingSpinner.vue';

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

.poster-photo {
    display: block;
    max-width: rem-calc(200);
}

.movie-details {
    color: rgba($light, 0.5);
    font-size: rem-calc(12);
    @include light-font;
}
</style>
