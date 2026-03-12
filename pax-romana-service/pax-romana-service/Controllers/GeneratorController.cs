using Microsoft.AspNetCore.Mvc;
using pax_romana_service.Dependencies;
using pax_romana_service.Models;

namespace pax_romana_service.Controllers
{
    public class GeneratorController: ControllerBase
    {
        private readonly ILogger<GeneratorController> _logger;
        private readonly Repository _repo;

        public GeneratorController(ILogger<GeneratorController> logger, Repository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Generator>> GetGenerators()
        {
            try
            {
                _logger.LogInformation("Received request to get generators.");
                var generators = _repo.GetGenerators();
                _logger.LogInformation("Retrieve {count} generators.", generators.Count());
                return Ok(generators);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error when getting Generators: {ex.Message}");
                return BadRequest($"Error when getting Generators: {ex.Message}");
            }
        }

    }
}
