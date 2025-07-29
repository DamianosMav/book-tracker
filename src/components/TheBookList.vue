<script setup>
import { useBookManage } from "@/stores/BooksStore";
import { createPieChart } from "@/utils/chartUtils";

const bookStore = useBookManage();

bookStore.getBooks();


async function handleDelete(bookId) {
  await bookStore.removeBook(bookId)
  await createPieChart()
}

</script>
<template>
    <section class="book-section card">
        <div class="section-header">
            <h3>My Books</h3>
            <button class="btn" @click="bookStore.toggleShowForm(true)">Add Book</button>
        </div>
        <div class="categories">
            <p>Title</p>
            <p>Author</p>
            <p>Pages</p>
            <p>Genre</p>
            <p>Status</p>
        </div>
        <div>
            <div>
                <ul class="book-list">
                    <li v-for="book in bookStore.books" class="book">
                        <div class="heart-icons" @click="() => bookStore.toggleFave(book.id)">
                            <img src="/empty-heart.png" v-if="!bookStore.isFavoriteBook(book.id)">
                            <img src="/filled-heart.png" v-else>
                        </div>
                        <div class="trash-can-icon" @click="handleDelete(book.id)">
                            <img src="/trash-can.png">
                        </div>
                        <p class="book-title">{{ book.title }}</p>
                        <p class="book-author">{{ book.author }}</p>
                        <p class="book-pages">
                            <input class="book-pages-input" type="number" v-model.number="book.book_current_pages" placeholder="0"
                                :max="book.book_pages" @change="(pageNumber) => {
                                    const input = Number(pageNumber.target.value);
                                    const validValue = Math.min(input, book.book_pages);
                                    book.book_current_pages = validValue;
                                    bookStore.updateBookPages(book.id, validValue);
                                }" />/{{ book.book_pages }}
                        </p>
                        <p class="book-genre"> {{ book.genre }}</p>
                        <select name="status" :id=book.id class="badge reading" v-model="book.status"
                            @change="(option) => bookStore.changeOption(option.target.value, book.id)">
                            <option value="planToRead">Plan To Read</option>
                            <option value="reading">Reading</option>
                            <option value="completed">Completed</option>
                            <option value="onHold">On-Hold</option>
                            <option value="dropped">Dropped</option>
                        </select>
                    </li>
                    <!--
                    <br>
                    <br>
                    <li v-for="book in bookStore.favorites" class="book">
                        <div class="checkbox-wrapper-26">
                            <input type="checkbox" :id=book.id>
                            <label :for=book.id>
                                <div class="tick_mark"></div>
                            </label>
                        </div>
                        <p class="book-title">{{ book.title }}</p>
                        <p class="book-author">{{ book.athor }}</p>
                        <select name="status" :id=book.id class="badge reading">
                            <option value="reading">Reading</option>
                            <option value="completed">Completed</option>
                            <option value="onHold">On-Hold</option>
                            <option value="dropped">Dropped</option>
                            <option value="planToRead">Plan To Read</option>
                        </select>
                    </li>
                    -->
                </ul>
            </div>

        </div>

    </section>
</template>

<style>
.book {
    display: flex;
}

.book p {
    flex: 1;
    font-family: 'Segoe UI', sans-serif;
}

.categories {
    display: flex;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.5rem;
    gap: 14rem;
}

.book-pages-input {
    width: 2.5rem;
    font-size: 16px;
    font-family: 'Segoe UI', sans-serif;
    border: none;
    text-align: right;
}

.book-pages-input::selection {
    border: 1px solid black;
}

input[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
    -webkit-appearance: none;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    appearance: none;
    -webkit-appearance: none;
    margin: 0;
}

.book-list {
    padding-left: 0;
    margin-left: 0;
}

.heart-icons {
    display: flex;
    align-items: center;
}

.heart-icons img {
    width: 2rem;
    height: auto;

    cursor: pointer;
}

.pencil-icon{
    display: flex;
    align-items: center;
}

.pencil-icon img{
    width: 2rem;
    height: auto;

    cursor: pointer;
}

.trash-can-icon {
    display: flex;
    align-items: center;
}

.trash-can-icon img {
    width: 2rem;
    height: auto;

    cursor: pointer;
}
</style>
