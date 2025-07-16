using Common.Dto.User;
using Mailjet.Client.Resources;
using Microsoft.AspNetCore.Authorization; 
using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Service.Interfaces;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SocialNetwork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly IAuthService authService;
        private readonly IOwner owner;

        public UserController(IUserService userService, IAuthService authService, IOwner owner)
        {
            this.userService = userService;
            this.authService = authService;
            this.owner = owner;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<List<UserDto>> Get()
        {
            return await userService.GetAll();
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<UserDto> Get(int id)
        {
            return await userService.GetById(id);
        }

        // GET api/<UserController>/5
        [HttpGet("private/{id}")]
        [Authorize]
        public async Task<IActionResult> GetPrivate(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
                return Unauthorized();
            int userIdfromClaim = int.Parse(userIdClaim);

            var isOwner = await owner.IsOwner(id, userIdfromClaim);

            if (!isOwner && !User.IsInRole("Admin"))
                return Forbid();

            var user = await userService.GetByIdPrivate(id);
            return Ok(user);
        }

        // POST api/<UserController>
        [HttpPost("Register")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Register([FromForm] UserRegisterDto user)
        {
            // Validation
            
            if (string.IsNullOrWhiteSpace(user.Email))
            {
                return BadRequest("Email is required and cannot be empty.");
            }

            if (!user.Email.EndsWith("@gmail.com"))
            {
                return BadRequest("Email must end with '@gmail.com'.");
            }

            if (user.Email.Contains(" "))
            {
                return BadRequest("Email cannot contain spaces.");
            }

            if (string.IsNullOrWhiteSpace(user.Password))
            {
                return BadRequest("Password is required and cannot be empty.");
            }

            if (user.Password.Length < 6)
            {
                return BadRequest("Password must be at least 6 characters long.");
            }

            if (!user.Password.Any(char.IsLetter))
            {
                return BadRequest("Password must contain at least one letter.");
            }

            if (!user.Password.Any(char.IsDigit))
            {
                return BadRequest("Password must contain at least one number.");
            }

            if (user.Password.Contains(" "))
            {
                return BadRequest("Password cannot contain spaces.");
            }

            // Image

            if (user.fileImageProfile != null)
            {
                UploadImage(user.fileImageProfile);
                user.ImageProfileUrl = user.fileImageProfile.FileName;
            }
            Console.WriteLine("Length of image bytes: " + user.ArrImageProfile?.Length);

            return Ok(await userService.Add(user));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromForm] UserLogin userLogin)
        {
            try
            {
                var token = await authService.GenerateTokenAsync(userLogin);
                return Ok(token);
            }
            catch(Exception)
            {
                return Unauthorized("user not found");
            }
        }

        // PUT api/<FeedbackController>/5
        [HttpPut("{userId}")]
        [Authorize]
        public async Task<IActionResult> Put(int userId, [FromForm] UserRegisterDto user)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
                return Unauthorized();
            int userIdfromClaim = int.Parse(userIdClaim);

            var isOwner = await owner.IsOwner(userId, userIdfromClaim);
            
            if (!isOwner && !User.IsInRole("Admin"))
                return Forbid(); 

            await userService.Update(userId, user);
            return Ok();
        }

        // DELETE api/<FeedbackController>/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
                return Unauthorized();
            int userId = int.Parse(userIdClaim);

            var isOwner = await owner.IsOwner(id, userId);

            if (!isOwner && !User.IsInRole("Admin"))
                return Forbid(); 

            await userService.Delete(id);
            return Ok();
        }

        private void UploadImage(IFormFile file)
        {
            var path = Path.Combine(Environment.CurrentDirectory, "Images/", file.FileName);
            using (var stream = new FileStream(path, FileMode.Create))
            {
                file.CopyTo(stream);
            }
        }
    }
}
