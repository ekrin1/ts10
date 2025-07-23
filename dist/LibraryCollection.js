"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryCollection = void 0;
class LibraryCollection {
    books = new Map();
    addBook(title, author) {
        for (const book of this.books.values()) {
            if (book.title === title) {
                return new Error("Book with this title already exists.");
            }
        }
        const id = crypto.randomUUID();
        const book = { id, title, author };
        this.books.set(id, book);
        return id;
    }
    removeBook(id) {
        this.books.delete(id);
    }
    getBookInfo(id) {
        const book = this.books.get(id);
        return book ? { title: book.title, author: book.author } : null;
    }
    getAllBooks() {
        return Array.from(this.books.values());
    }
    getBooksCount() {
        return this.books.size;
    }
}
exports.LibraryCollection = LibraryCollection;
