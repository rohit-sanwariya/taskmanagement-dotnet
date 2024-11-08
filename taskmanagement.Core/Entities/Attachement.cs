using taskmanagement.Core.Enums;

namespace taskmanagement.Core.Entities;


public class Attachment
{
    public int AttachmentID { get; set; }
    public required string FileName { get; set; }
    public FileType? FileType { get; set; }
    public long FileSize { get; set; }
    public int TaskID { get; set; }
    public required string Url { get; set; }
    public DateTime UploadedAt { get; set; }

    public Task? Task { get; set; } // Navigation property
}