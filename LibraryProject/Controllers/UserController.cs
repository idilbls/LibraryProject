using LibraryProject.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace LibraryProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        public UserController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("add")]
        public async Task<User> Register([FromBody]User user)
        {
            if (!ModelState.IsValid)
            {
                throw new ApplicationException("Model State is not valid!");
            }

            var result = await _userManager.CreateAsync(
                new IdentityUser() { UserName = user.UserName, Email = user.Email },
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
        public async Task<User> Login([FromBody] User user)
        {
            var result = new User();
            var currentUser = await _userManager.FindByNameAsync(user.UserName);

            if (currentUser != null && await _userManager.CheckPasswordAsync(currentUser, user.Password))
            {
                var signInResult = await _signInManager.PasswordSignInAsync(currentUser, user.Password, false, false);

                if (signInResult.Succeeded)
                {
                    result =  new User
                    {
                        UserName = currentUser.UserName,
                        Email = currentUser.Email
                    };
                }
            }
            else
            {
                throw new ApplicationException("Unauthorized!");
            }
            return result;
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
