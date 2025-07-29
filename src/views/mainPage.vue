<script setup>
import TheHeader from '@/components/TheHeader.vue';
import TheDashBoard from '@/components/TheDashBoard.vue';
import TheBookForm from '@/components/TheBookForm.vue';
import TheBookList from '@/components/TheBookList.vue';
import TheAnalytics from '@/components/TheAnalytics.vue';
</script>

<template>
  <div class="app">
    <TheHeader />
    <TheDashBoard />
    <TheBookForm />
    <TheBookList />
    <TheAnalytics />
  </div>
</template>
