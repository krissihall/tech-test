<template>
  <div class="page-container">
    <PageHeader />

    <div class="page-content">
      <div class="search-form-container container-fluid">
        <SearchForms />
        <SearchResults />
      </div>
    </div>
  </div>
</template>

<script setup>
import PageHeader from './components/layout/PageHeader.vue';
import SearchForms from './components/SearchForms.vue';
import SearchResults from './components/SearchResults.vue';
</script>

<style scoped lang="scss">
</style>
