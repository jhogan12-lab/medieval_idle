using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using pax_romana_service.Models;

namespace pax_romana_service.Controllers
{
    public class PlayerController
    {
        [HttpGet]
        public Player GetPlayer()
        {
            return new Player();
        }   
        

    }
}
