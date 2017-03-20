using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaluteOnline.DAL;
using MongoUser = SaluteOnline.Domain.User.MongoUser;

namespace SaluteOnline.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPasswordHasher<MongoUser> _passwordHasher;

        public UserController(IUnitOfWork unitOfWork, IPasswordHasher<MongoUser> passwordHasher)
        {
            _unitOfWork = unitOfWork;
            _passwordHasher = passwordHasher;
        }

        [HttpGet("GetLogged")]
        public async Task<IActionResult> GetLogged()
        {
            try
            {
                var guid = Guid.Parse(User.Claims.SingleOrDefault(t => t.Type == "guid").Value);
                return Ok(await _unitOfWork.MongoUsers.GetByIdAsync(guid));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Insert(MongoUser user)
        {
            try
            {
                var updatedUser = await _unitOfWork.MongoUsers.InsertAsync(user);
                if (updatedUser != null)
                {
                    return Ok(updatedUser);
                }
                return BadRequest("User info wasn't updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch]
        [Authorize("AllAuthorized")]
        public async Task<IActionResult> Update(MongoUser user)
        {
            try
            {
                var guid = Guid.Parse(User.Claims.SingleOrDefault(t => t.Type == "guid").Value);
                var target = await _unitOfWork.MongoUsers.GetByIdAsync(guid);
                target.Birthday = user.Birthday;
                target.LastName = user.LastName;
                target.Email = user.Email;
                target.Name = user.Name;
                target.PhoneMain = user.PhoneMain;
                target.PhoneSecond = user.PhoneSecond;
                target.State = user.State;
                target.City = user.City;
                var updatedUser = await _unitOfWork.MongoUsers.UpdateAsync(target);
                if (updatedUser != null)
                {
                    return Ok(updatedUser);
                }
                return BadRequest("User info wasn't updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("UpdatePrivacy")]
        [Authorize("AllAuthorized")]
        public async Task<IActionResult> UpdatePrivacy(MongoUser user)
        {
            try
            {
                var guid = Guid.Parse(User.Claims.SingleOrDefault(t => t.Type == "guid").Value);
                var target = await _unitOfWork.MongoUsers.GetByIdAsync(guid);
                target.HideProfile = user.HideProfile;
                if (!string.IsNullOrEmpty(user.Password))
                {
                    target.Password = _passwordHasher.HashPassword(target, user.Password);
                }
                var updatedUser = await _unitOfWork.MongoUsers.UpdateAsync(target);
                if (updatedUser != null)
                {
                    return Ok(updatedUser);
                }
                return BadRequest("User info wasn't updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("UpdateAvatar")]
        [Authorize("AllAuthorized")]
        public async Task<IActionResult> UpdateAvatar()
        {
            try
            {
                var avatar = Request.Form.Files.FirstOrDefault();
                var stream = avatar.OpenReadStream();
                using (var reader = new BinaryReader(stream))
                {
                    var bytes = reader.ReadBytes((int)stream.Length);
                    var base64 = Convert.ToBase64String(bytes);
                    var guid = Guid.Parse(User.Claims.SingleOrDefault(t => t.Type == "guid").Value);
                    var target = await _unitOfWork.MongoUsers.GetByIdAsync(guid);
                    target.Avatar = base64;
                    var updatedUser = await _unitOfWork.MongoUsers.UpdateAsync(target);
                    if (updatedUser != null)
                    {
                        return Ok(base64);
                    }
                    return BadRequest("User info wasn't updated");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
