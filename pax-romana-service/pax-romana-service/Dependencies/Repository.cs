using pax_romana_service.Controllers;
using pax_romana_service.Models;
using System.Linq;
using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;
using Npgsql;

namespace pax_romana_service.Dependencies
{
    public class Repository
    {
        private readonly ILogger<Repository> _logger;
        private readonly IConfiguration _config;

        public Repository(ILogger<Repository> logger, IConfiguration config)
        {
            _logger = logger;
            _config = config;
        }

        #region Generator

        public async Task<IEnumerable<Generator>> GetGenerators()
        {


            using var cnn = new NpgsqlConnection(_config["ConnectionStrings:pax_romana"]);
            await cnn.OpenAsync();

            var generators = await cnn.QueryAsync<Generator>(
                "SELECT * FROM dbo.generators_get();"
            );

            return generators;
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
