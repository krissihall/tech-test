<template>
  <div class="page-container">
    <PageHeader />

    <div class="page-content">
      <div class="search-form-container container-fluid">
        <Tabs value="searchMovies">
          <TabList>
            <Tab value="searchMovies">Search Movies</Tab>
            <Tab value="searchHistory" @click="refreshSearchHistory">Search History</Tab>
          </TabList>
          <TabPanel value="searchMovies">
            <SearchForm />
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
import { onMounted } from 'vue';
import { useSearchStore } from './stores';
import PageHeader from './components/layout/PageHeader.vue';
import SearchForm from './components/search/SearchForm.vue';
import SearchResults from './components/search/SearchResults.vue';
import SearchHistory from './components/search/SearchHistory.vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanel from 'primevue/tabpanel';

const searchStore = useSearchStore();

const refreshSearchHistory = async () => {
  searchStore.getSearchHistory();
};

onMounted(() => {
  searchStore.getSearchHistory();
});
</script>

<style scoped lang="scss">
</style>
