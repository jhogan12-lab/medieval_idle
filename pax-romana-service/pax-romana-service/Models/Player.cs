namespace pax_romana_service.Models
{
    public class Player
    {
        public int PlayerId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public int PlayerGold { get; set; }
    }
}
