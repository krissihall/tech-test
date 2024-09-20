<template>
    <div class="search-results-info-container row" :class="[ customClass ]">
        <div v-if="!isEmpty(result.Poster)" class="col col-auto poster">
            <img :src="result.Poster" :title="result.Title" class="poster-photo" />
        </div>
        <div class="col info">
            <h2>
                <a :href="linkUrl" :title="result.Title" target="_blank">
                    {{ result.Title }}
                </a>
                </h2>
                <div class="movie-details">
                <ul class="list-inline mb-0">
                    <li class="list-inline-item me-3">{{ result.Rated }}</li>
                    <li class="list-inline-item me-3">{{ result.Year }}</li>
                    <li class="list-inline-item me-3">{{ result.Runtime }}</li>
                    <li class="list-inline-item me-3">{{ result.Released }}</li>
                </ul>
                <ul class="list-inline mb-0">
                    <li class="list-inline-item me-3">{{ result.Actors }}</li>
                </ul>
                <ul class="list-inline mb-0">
                    <li class="list-inline-item me-3">{{ result.Genre }}</li>
                    <li class="list-inline-item me-3">{{ result.Director }}</li>
                    <li class="list-inline-item me-3">{{ result.Writer }}</li>
                </ul>
            </div>
            <p class="lead">{{ result.Plot }}</p>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { isEmpty } from '@/helpers';

const props = defineProps({
    result: Object,
    className: String
});

const customClass = computed(() => props.className && !isEmpty(props.className) ? props.className : null);
const linkUrl = computed(() => `https://www.imdb.com/title/${props.result.imdbID}/`);
</script>

<style scoped lang="scss">
@import '@/assets/scss/includes/includes';

.search-results-container {
    position: relative;
}

.poster-photo {
    display: block;
    max-width: rem-calc(200);

    .search-history & {
        max-width: rem-calc(100);
    }
}

.movie-details {
    color: rgba($light, 0.5);
    font-size: rem-calc(12);
    @include light-font;
}

.search-history {
    border-bottom: rem-calc(1) solid $tertiary;
    margin-bottom: rem-calc(24);
    padding-bottom: rem-calc(24);

    &:last-of-type {
        border-bottom: none;
    }

    h2 {
        font-size: rem-calc(24);
    }

    .lead {
        font-size: rem-calc(16);
    }
}
</style>
