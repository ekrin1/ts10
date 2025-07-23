"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const LibraryCollection_1 = require("../src/LibraryCollection");
(0, vitest_1.describe)('LibraryCollection', () => {
    let library;
    (0, vitest_1.beforeEach)(() => {
        library = new LibraryCollection_1.LibraryCollection();
    });
    (0, vitest_1.it)('should add a book and return its id', () => {
        const id = library.addBook('The Great Gatsby', 'F. Scott Fitzgerald');
        (0, vitest_1.expect)(typeof id).toBe('string');
        (0, vitest_1.expect)(library.getBooksCount()).toBe(1);
    });
    (0, vitest_1.it)('should not allow adding a book with the same title', () => {
        library.addBook('1984', 'George Orwell');
        const result = library.addBook('1984', 'Another Author');
        (0, vitest_1.expect)(result).toBeInstanceOf(Error);
        (0, vitest_1.expect)(library.getBooksCount()).toBe(1);
    });
    (0, vitest_1.it)('should remove a book by id', () => {
        const id = library.addBook('Brave New World', 'Aldous Huxley');
        library.removeBook(id);
        (0, vitest_1.expect)(library.getBooksCount()).toBe(0);
    });
    (0, vitest_1.it)('should get book info by id', () => {
        const id = library.addBook('Fahrenheit 451', 'Ray Bradbury');
        const info = library.getBookInfo(id);
        (0, vitest_1.expect)(info).toEqual({ title: 'Fahrenheit 451', author: 'Ray Bradbury' });
    });
    (0, vitest_1.it)('should return null for non-existing book id', () => {
        const info = library.getBookInfo('non-existent-id');
        (0, vitest_1.expect)(info).toBeNull();
    });
    (0, vitest_1.it)('should return all books', () => {
        const id1 = library.addBook('Book One', 'Author A');
        const id2 = library.addBook('Book Two', 'Author B');
        const allBooks = library.getAllBooks();
        (0, vitest_1.expect)(allBooks.length).toBe(2);
        (0, vitest_1.expect)(allBooks).toEqual(vitest_1.expect.arrayContaining([
            vitest_1.expect.objectContaining({ id: id1, title: 'Book One', author: 'Author A' }),
            vitest_1.expect.objectContaining({ id: id2, title: 'Book Two', author: 'Author B' }),
        ]));
    });
    (0, vitest_1.it)('should return the correct number of books', () => {
        library.addBook('Book 1', 'Author 1');
        library.addBook('Book 2', 'Author 2');
        (0, vitest_1.expect)(library.getBooksCount()).toBe(2);
    });
});
