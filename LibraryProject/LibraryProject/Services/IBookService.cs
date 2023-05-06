using LibraryProject.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryProject.Services
{
    public interface IBookService
    {
        Task<IList<Book>> GetAllAsync();
        Task<Book> GetByIdAsync(int id);
        Task<Book> AddAsync(Book book);
        Task<Book> UpdateAsync(Book book);
        Task<bool> DeleteAsync(int id);
    }
}
