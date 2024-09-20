<template>
  <div class="page-container">
    <PageHeader />

    <div class="page-content">
      <div class="search-form-container container-fluid">
        <Tabs value="searchMovies">
          <TabList>
            <Tab value="searchMovies">Search Movies</Tab>
            <Tab value="searchHistory">Search History</Tab>
          </TabList>
          <TabPanel value="searchMovies">
            <SearchForms />
            <SearchResults />
          </TabPanel>
          <TabPanel value="searchHistory">
            <SearchHistory />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useSearchStore } from './stores';
import PageHeader from './components/layout/PageHeader.vue';
import SearchForms from './components/search/SearchForms.vue';
import SearchResults from './components/search/SearchResults.vue';
import SearchHistory from './components/search/SearchHistory.vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanel from 'primevue/tabpanel';

const searchStore = useSearchStore();

onMounted(() => {
  searchStore.getSearchHistory();
});
</script>

<style scoped lang="scss">
</style>
