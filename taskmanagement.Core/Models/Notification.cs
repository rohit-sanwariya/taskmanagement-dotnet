namespace taskmanagement.Core.Models;
public class Notification
    {
        public int NotificationID { get; set; }
        public int UserID { get; set; }
        public required string Content { get; set; }
        public bool ReadStatus { get; set; }
        public DateTime CreatedAt { get; set; }

        public User? User { get; set; } // Navigation property
    }