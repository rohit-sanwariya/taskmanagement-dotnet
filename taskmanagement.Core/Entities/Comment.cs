namespace taskmanagement.Core.Entities;
public class Comment
{
    public int CommentID { get; set; }
    public required string Content { get; set; }
    public int AuthorUserID { get; set; }
    public int TaskID { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public User? Author { get; set; } // Navigation property
    public Task? Task { get; set; }   // Navigation property
}