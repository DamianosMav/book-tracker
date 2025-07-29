<script setup>
import { useBookManage } from "../stores/BooksStore"

const bookStore = useBookManage();
</script>

<template>
    <main class="dashboard">
      <h2>Dashboard</h2>

      <section class="stats card">
        <div><strong>{{ bookStore.totalReadBooks }}</strong><p>Total Books Read</p></div>
        <div><strong>{{ bookStore.totalPages }}</strong><p>Total Pages Read</p></div>
        <div><strong>{{ bookStore.totalReadingBooks }}</strong><p>Currently Reading</p></div>
        <div><strong>{{ bookStore.totalFavoriteBooks }}</strong><p>Total Favorite Books</p></div>
      </section>
    </main>
</template>