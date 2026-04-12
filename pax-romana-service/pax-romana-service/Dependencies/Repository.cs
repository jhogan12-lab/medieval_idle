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

        public async Task<Player> GetPlayerByEmail(string email)
        {
            using var cnn = new NpgsqlConnection(_config["ConnectionStrings:pax_romana"]);
            await cnn.OpenAsync();

            var player = await cnn.QuerySingleOrDefaultAsync<Player>(
                "SELECT * FROM dbo.playerbyemail_get(@email);",
                new { email }
            );

            return player ?? new Player();
        }

        public async Task<Player> GetPlayerByGoogleId(string googleId)
        {
            using var cnn = new NpgsqlConnection(_config["ConnectionStrings:pax_romana"]);
            await cnn.OpenAsync();

            var player = await cnn.QuerySingleOrDefaultAsync<Player>(
                "SELECT * FROM dbo.playerbygoogleId_get(@googleId);",
                new { googleId }
            );

            return player ?? new Player();
        }

        public async Task<Player> CreatePlayer(Player newPlayer)
        {
            using var cnn = new NpgsqlConnection(_config["ConnectionStrings:pax_romana"]);
            await cnn.OpenAsync();

            var player = await cnn.QuerySingleOrDefaultAsync<Player>(
                "SELECT * FROM dbo.createplayerforgoogleaccount_get(@email, @googleId)",
                new
                {
                    newPlayer?.Email,
                    newPlayer?.GoogleId
                });

            return player ?? new Player();
        }

        #endregion

    }
}
