<script setup>
import { useBookManage } from '@/stores/BooksStore';
import { createPieChart } from '@/utils/chartUtils';
import { ref } from "vue";

const bookStore = useBookManage();
const newBookTitle = ref("");
const newBookAuthor = ref("");
const newBookPages = ref("");
const newBookGenre = ref("");



async function handleSubmit() {
    if (newBookTitle.value.trim() && newBookAuthor.value.trim() && !isNaN(Number(newBookPages.value)) && newBookPages.value.trim() !== '' && newBookGenre.value.trim()) {
        bookStore.addBook({
            title: newBookTitle.value,
            author: newBookAuthor.value,
            genre: newBookGenre.value,
            book_pages: newBookPages.value,
            isRead: false,
            isFave: false,
            status: "planToRead"
        });
        clearForm();
        return;
    }
    //Issue error to user
    console.log("All field's must have a value");

    clearForm();
    await createPieChart();
    bookStore.toggleShowForm(false);
}

function clearForm() {
    newBookTitle.value = "";
    newBookAuthor.value = "";
    newBookGenre.value = "";
    newBookPages.value = "";
}



</script>

<template>
    <div class="form-popup" v-if="bookStore.showForm">
        <div class="form-popup-inner">
            <form class="form-section card">
                <input type="text" placeholder="Book Title" v-model="newBookTitle">
                <input type="text" placeholder="Book Author" v-model="newBookAuthor">
                <input type="text" placeholder="Total Book Pages" v-model="newBookPages">
                <select v-model="newBookGenre">
                    <option value="" disabled>Book Genre</option>
                    <option v-for="bookGenre in bookStore.bookGenres" :value="bookGenre">{{ bookGenre }}</option>
                </select>
                <button class="btn" @click="handleSubmit(); ">Add Book</button>
            </form>
        </div>

    </div>

</template>

<style>
.form-popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;
}

.form-popup-inner {
    background-color: white;
    padding: 2rem;
}
</style>