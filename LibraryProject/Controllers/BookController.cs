using LibraryProject.Models;
using LibraryProject.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : Controller
    {
        private readonly IBookService _bookService;
        private readonly ILogger<BookController> _logger;

        public BookController(IBookService bookService, ILogger<BookController> logger)
        {
            _bookService = bookService;
            _logger = logger;
        }

        [HttpGet("get_all")]
        public async Task<IList<Book>> GetAllBooks()
        {
            try
            {
                return await _bookService.GetAllAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw;
            }
        }

        [HttpGet("get_by_id")]

        public async Task<Book> GetBookById([FromQuery] int id)
        {
            try
            {
                return await _bookService.GetByIdAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw;
            }

        }

        [HttpPost("add")]
        public async Task<Book> AddBook([FromBody] Book book)
        {
            try
            {
                return await _bookService.AddAsync(book);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw;
            }

        }

        [HttpPost("update")]
        public async Task<Book> UpdateBook([FromBody] Book book)
        {
            try
            {
                return await _bookService.UpdateAsync(book);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw;
            }
        }

        [HttpDelete("delete")]
        public async Task<bool> DeleteAsync([FromQuery] int id)
        {
            try
            {
                return await _bookService.DeleteAsync(id);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw;
            }
        }
    }
}
