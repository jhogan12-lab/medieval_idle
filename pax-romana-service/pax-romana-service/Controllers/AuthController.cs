using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using pax_romana_service.Dependencies;
using pax_romana_service.Models;

namespace pax_romana_service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController: ControllerBase
    {
        private readonly JwtService _jwtService;
        private readonly Repository _repo;

        public AuthController(JwtService jwtService, Repository repo)
        {
            _jwtService = jwtService;
            _repo = repo;
        }

        /// <summary>
        /// Sign in with just email and password, no SSO
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest req)
        {
            var player = await _repo.GetPlayerByEmail(req.Email);

            if (player == null) return Unauthorized();

            var hasher = new PasswordHasher<Player>();
            var result = hasher.VerifyHashedPassword(player, player.PasswordHash ?? "", req.Password);

            if (result == PasswordVerificationResult.Failed)
                return Unauthorized();

            var jwt = _jwtService.GenerateJwt(player);

            Response.Cookies.Append("auth_token", jwt, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            });

            return Ok();
        }

        /// <summary>
        /// A Login endpoint for a user to sign in with Google SSO
        /// </summary>
        /// <param name="idToken"></param>
        /// <returns></returns>
        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin([FromBody] string idToken)
        {
            GoogleJsonWebSignature.Payload payload;

            try
            {
                payload = await GoogleJsonWebSignature.ValidateAsync(idToken);
            }
            catch
            {
                return Unauthorized();
            }

            var player = await _repo.GetPlayerByGoogleId(payload.Subject);

            if (player == null)
            {
                player = new Player
                {
                    Email = payload.Email,
                    GoogleId = payload.Subject
                };

                await _repo.CreatePlayer(player);
            }

            var jwt = _jwtService.GenerateJwt(player);

            Response.Cookies.Append("auth_token", jwt, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            });

            return Ok();
        }


    }
}
