namespace pax_romana_service.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? PasswordHash { get; set; }
        public string? PhoneNumber { get; set; }
        public int Gold { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public DateTime LastUpdatedDateTime { get; set; }
        public bool Active { get; set; }
        public string? GoogleId { get; set; }
        public Generator[]? Generators { get; set; }

    }
}
