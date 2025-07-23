import { describe, it, expect, beforeEach } from 'vitest';
import { LibraryCollection } from '../src/LibraryCollection';

describe('LibraryCollection', () => {
  let library: LibraryCollection;

  beforeEach(() => {
    library = new LibraryCollection();
  });

  it('добавляет книгу и возвращает ее id', () => {
    const id = library.addBook('Хранители кольца', 'Толкин');
    expect(typeof id).toBe('string');
    expect(library.getBooksCount()).toBe(1);
  });

  it('не добавляет книгу с уже существующим названием', () => {
    library.addBook('Искра жизни', 'Эрих Мария Ремарк');
    const result = library.addBook('Искра жизни', 'Другой автор');
    expect(result).toBeInstanceOf(Error);
    expect(library.getBooksCount()).toBe(1);
  });

  it('удаляет книгу по id', () => {
    const id = library.addBook('Цветы для Элджернона', 'Дэниел Киз') as string;
    library.removeBook(id);
    expect(library.getBooksCount()).toBe(0);
  });

  it('возвращает информацию о книге по id', () => {
    const id = library.addBook('Тоска по уходящему сезону', 'Реко Секигути') as string;
    const info = library.getBookInfo(id);
    expect(info).toEqual({ title: 'Тоска по уходящему сезону', author: 'Реко Секигути' });
  });

  it('возвращает null, если книга с указанным id не найдена', () => {
    const info = library.getBookInfo('несуществующий-id');
    expect(info).toBeNull();
  });

  it('возвращает список всех книг', () => {
    const firstBookId = library.addBook('Книга Один', 'Автор А') as string;
    const secondBookId = library.addBook('Книга Два', 'Автор Б') as string;
    const allBooks = library.getAllBooks();

    expect(allBooks.length).toBe(2);
    expect(allBooks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: firstBookId, title: 'Книга Один', author: 'Автор А' }),
        expect.objectContaining({ id: secondBookId, title: 'Книга Два', author: 'Автор Б' }),
      ])
    );
  });

  it('должна возвращать правильное количество книг', () => {
    library.addBook('Книга 1', 'Автор 1');
    library.addBook('Книга 2', 'Автор 2');
    expect(library.getBooksCount()).toBe(2);
  });
});
