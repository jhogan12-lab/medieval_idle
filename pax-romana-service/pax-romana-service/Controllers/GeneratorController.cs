using Microsoft.AspNetCore.Mvc;
using pax_romana_service.Dependencies;

namespace pax_romana_service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
        public async Task<IActionResult> GetGenerators()
        {
            try
            {
                var result = await _repo.GetGenerators();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = ex.Message,
                    detail = ex.ToString()
                });
            }
        }

    }
}
