import { defineStore } from "pinia";

export const useBookManage = defineStore("bookManageStore", {
    state: () => ({
        books: [],
        bookGenres: [
            "Fantasy", "Science Fiction", "Dystopian", "Action & Adventure", "Mystery", "Horror", "Thriller & Suspense", "Historical Fiction", "Romance", "Women’s Fiction",
            "LGBTQ+", "Contemporary Fiction", "Literary Fiction", "Magical Realism", "Graphic Novel", "Short Story", "Young Adult", "New Adult", "Children’s", "Memoir & Autobiography",
            "Biography", "Food & Drink", "Art & Photography", "Self-help", "History", "Travel", "True Crime", "Humor", "Essays", "Guide/How-to", "Religion & Spirituality", "Humanities & Social Sciences",
            "Parenting & Families", "Science & Technology"
        ],

        bookTitle: "",
        bookAuthor: "",
        bookGenre: "",
        bookPages: 0,

        isLoading: false,
        showForm: false,
        formSubmited: true,
    }),
    getters: {
        favorites: (state) => {
            return state.books.filter(b => b.isFave);
        },
        shouldShowForm: (state) => {
            return state.showForm;
        },
        isFavoriteBook: (state) => {
            return (id) => {
                const book = state.books.find(book => book.id === id);
                if (book) {
                    return book.isFave;
                }
            }
        },
        getBookGenres: (state) => {
            return state.books.bookGenres;
        },
        totalPages: (state) => {
            let pages = 0;
            state.books.forEach(book => {
                if (book.status === "completed") {
                    pages += Number(book.book_pages)
                }

            });
            return pages;
        },
        totalReadBooks: (state) => {
            let filteredBooks = state.books.filter(book => book.status === "completed");
            return filteredBooks.length;
        },
        totalReadingBooks: (state) => {
            let filteredReadingBooks = state.books.filter(book => book.status === "reading");
            return filteredReadingBooks.length;
        },
        totalFavoriteBooks: (state) => {
            let favoriteBooks = 0;
            state.books.forEach(book => {
                if (book.isFave) {
                    favoriteBooks += 1;
                }
            });
            return favoriteBooks;
        },
        tbookAuthor:(state) => {
            return state.bookAuthor;
        }
    },
    actions: {
        async getBooks() {
            this.isLoading = true;

            try {
                const res = await fetch("http://localhost:3000/books");
                const data = await res.json();
                this.books = data
            } catch (error) {
                console.log(error)
            } finally {
                this.isLoading = false;
            }
        },
        async changeOption(status, id) {
            try {
                await fetch("http://localhost:3000/books/" + id, {
                    method: "PATCH",
                    body: JSON.stringify({ status }),
                    headers: { "Content-Type": "application/json" }
                });
            } catch (error) {
                console.log(error);
            }
        },
        async addBook(book) {
            try {
                const res = await fetch("http://localhost:3000/books", {
                    method: "POST",
                    body: JSON.stringify(book),
                    headers: { "Content-Type": "application/json" }
                });

                const savedBook = await res.json();
                this.books.push(savedBook);  // Use the actual backend-generated ID
            } catch (error) {
                console.log(error);
            }

        },
        async updateBookPages(id, pageNumber) {
            try {
                await fetch("http://localhost:3000/books/" + id, {
                    method: "PATCH",
                    body: JSON.stringify({ book_current_pages: pageNumber }),
                    headers: { "Content-Type": "application/json" }
                });
            } catch (error) {
                console.log(error);
            }
        },
        async removeBook(id) {
            this.books = this.books.filter(b => {
                return b.id !== id;
            });
            try {
                await fetch(`http://localhost:3000/books/${id}`, {
                    method: "DELETE",
                });
                await this.getBooks();
            } catch (error) {
                console.log(error);
            }
        },
        async toggleFave(id) {
            const book = this.books.find(b => b.id === id);
            book.isFave = !book.isFave;
            try {
                await fetch("http://localhost:3000/books/" + id, {
                    method: "PATCH",
                    body: JSON.stringify({ isFave: book.isFave }),
                    headers: { "Content-Type": "application/json" }
                });
            } catch (error) {
                console.log(error);
            }
        },
        toggleShowForm(value) {
            this.showForm = value;
        },
        formWasSubmited() {
            this.formSubmited = false;
        }
    }

})