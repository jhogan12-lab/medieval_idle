using pax_romana_service.Controllers;
using pax_romana_service.Models;
using System.Linq;

namespace pax_romana_service.Dependencies
{
    public class Repository
    {
        private readonly ILogger<Repository> _logger;

        public Repository(ILogger<Repository> logger)
        {
            _logger = logger;
        }

        #region Generator

        public IEnumerable<Generator> GetGenerators()
        {
            return Enumerable.Empty<Generator>();
        }

        #endregion

        #region Player

        public Player GetPlayerById(int playerId)
        {
            return new Player();
        }

        #endregion

    }
}
