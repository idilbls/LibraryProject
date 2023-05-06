using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryProject.Models
{
    [Table("Book")]
    public class Book
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public int PublishYear { get; set; }
        public string Publisher { get; set; }
        public string ISBNNumber { get; set; }
        public string Language { get; set; }
        public int PageCount { get; set; }
        public string Genre { get; set; }
    }
}
