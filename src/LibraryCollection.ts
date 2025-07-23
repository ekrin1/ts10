type BookInfo = { id: string; title: string; author: string };

export class LibraryCollection {
  private books: Map<string, BookInfo> = new Map();

  addBook(title: string, author: string): string | Error {
    for (const book of this.books.values()) {
      if (book.title === title) {
        return new Error("Книга с таким названием уже существует");
      }
    }

    const id = crypto.randomUUID();
    const book: BookInfo = { id, title, author };
    this.books.set(id, book);
    return id;
  }

  removeBook(id: string): void {
    this.books.delete(id);
  }

  getBookInfo(id: string): { title: string; author: string } | null {
    const book = this.books.get(id);
    return book ? { title: book.title, author: book.author } : null;
  }

  getAllBooks(): Array<{ id: string; title: string; author: string }> {
    return Array.from(this.books.values());
  }

  getBooksCount(): number {
    return this.books.size;
  }
}
