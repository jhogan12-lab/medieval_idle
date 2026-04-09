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
            using (var connection = new SqlConnection(_config["ConnectionStrings:pax_romana"]))
            {
                await connection.OpenAsync();

                IEnumerable<Generator> generators = await connection.QueryAsync<Generator>(
                    "dbo.Generators_Get",
                    commandType: CommandType.StoredProcedure
                );

                return generators;
            }
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
