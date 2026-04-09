using Microsoft.AspNetCore.Mvc;
using pax_romana_service.Dependencies;
using pax_romana_service.Models;

namespace pax_romana_service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayerController: ControllerBase
    {
        private readonly ILogger<PlayerController> _logger;
        private readonly Repository _repo;

        public PlayerController(ILogger<PlayerController> logger, Repository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        /// <summary>
        /// Retrieves the player's data by their Id
        /// </summary>
        /// <param name="playerId"></param>
        /// <returns>A Player object</returns>
        [HttpGet("{playerId}")]
        public ActionResult<Player> GetPlayerById([FromRoute] int playerId)
        {
            try
            {
                if (playerId == 0)
                {
                    _logger.LogError("PlayerId is not valid: {playerId}", playerId);
                    return BadRequest($"Error when getting player data: PlayerId is not valid {playerId}");
                }
                _logger.LogInformation("Received request to get data for player: {playerId}", playerId);
                var player = _repo.GetPlayerById(playerId);
                return Ok(player);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error when getting player data: {playerId}", playerId);
                return BadRequest($"Error when getting player data: {ex.Message}");
            }
        }

    }
}
