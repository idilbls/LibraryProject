using LibraryProject.Models;
using LibraryProject.Models.EntityFrameworkCore.Context;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryProject.Services
{
    public class BookService : IBookService
    {
        protected readonly LibraryDbContext _context;

        public BookService(LibraryDbContext context)
        {
            _context = context;
        }
        public async Task<Book> AddAsync(Book book)
        {
            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
            return book;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var result = await _context.Books.FindAsync(id);
            _context.Books.Remove(result);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IList<Book>> GetAllAsync()
        {
            var list = _context.Books.ToList();
            return await Task.FromResult(list);
        }

        public async Task<Book> GetByIdAsync(int id)
        {
            var book = await _context.Books.FindAsync(id);
            return book;
        }

        public async Task<Book> UpdateAsync(Book book)
        {
            var result = await _context.Books.FindAsync(book.Id);

            result.Name = book.Name;
            result.Author = book.Author;
            result.PublishYear = book.PublishYear;
            result.Publisher = book.Publisher;
            result.ISBNNumber = book.ISBNNumber;
            result.Language = book.Language;
            result.PageCount = book.PageCount;
            result.Genre = book.Genre;

            _context.Books.Update(result);
            await _context.SaveChangesAsync();
            return result;
        }
    }
}
