<template>
    <div class="loader-container" :class="[ customClass ]">
        <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { isEmpty } from '@/helpers';

const props = defineProps({
    className: String
});

const customClass = computed(() => props.className && !isEmpty(props.className) ? props.className : null);
</script>
