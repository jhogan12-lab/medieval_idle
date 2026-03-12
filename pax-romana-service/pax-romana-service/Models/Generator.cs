namespace pax_romana_service.Models
{
    public class Generator
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int BaseCost { get; set; }
        public int GoldPerSecond { get; set; }
        public bool Active { get; set; }
    }
}
