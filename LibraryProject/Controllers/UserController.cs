using Azure;
using LibraryProject.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LibraryProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IConfiguration _configuration;
        public UserController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost("add")]
        public async Task<User> Register([FromBody]User user)
        {
            var userExists = await _userManager.FindByNameAsync(user.UserName);
            if (userExists != null)
                throw new ApplicationException("User already exists!");

            if (!ModelState.IsValid)
            {
                throw new ApplicationException("Model State is not valid!");
            }

            var result = await _userManager.CreateAsync(
                new IdentityUser() { UserName = user.UserName, Email = user.Email, SecurityStamp= Guid.NewGuid().ToString() },
                user.Password);

            if (!result.Succeeded)
            {
                throw new ApplicationException("Unsuccessful!");
            }

            user.Password = null;
            return user;
        }

        [HttpGet("get_by_name")]
        public async Task<User> GetUser(string username)
        {
            IdentityUser user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                throw new ApplicationException("Not found!");
            }

            return new User
            {
                UserName = user.UserName,
                Email = user.Email
            };
        }

        [HttpPost("login")]
        public async Task<LoginResponseModel> Login([FromBody] LoginModel user)
        {
            var result = new LoginResponseModel();
            var currentUser = await _userManager.FindByNameAsync(user.Username);

            if (currentUser != null && await _userManager.CheckPasswordAsync(currentUser, user.Password))
            {
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };
                var token = GetToken(authClaims);

                var signInResult = await _signInManager.PasswordSignInAsync(currentUser, user.Password, false, false);

                if (signInResult.Succeeded)
                {
                    result =  new LoginResponseModel
                    {
                        Token = new JwtSecurityTokenHandler().WriteToken(token),
                        Expiration = token.ValidTo
                    };
                }
            }
            else
            {
                throw new ApplicationException("Unauthorized!");
            }
            return result;
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }

        [HttpPost("change_password")]
        public async Task<bool> ChangePassword(ChangePasswordModel model)
        {
            var currentUser = await _userManager.FindByNameAsync(model.Username);

            if (currentUser == null)
            {
                throw new ApplicationException("Not found!");
            }

            var result = await _userManager.ChangePasswordAsync(currentUser, model.OldPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                throw new ApplicationException("Unsuccessful!");
            }

            await _signInManager.RefreshSignInAsync(currentUser);

            return true;
        }
    }

}
