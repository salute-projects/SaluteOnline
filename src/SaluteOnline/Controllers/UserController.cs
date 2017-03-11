using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SaluteOnline.DAL;
using SaluteOnline.Domain.Enums;
using SaluteOnline.Domain.User;

namespace SaluteOnline.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var users = await _unitOfWork.Users.GetAsync();
                if (users.Any())
                {
                    return Ok(users);
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var users = await _unitOfWork.Users.GetByIdAsync(id: id);
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetPage")]
        public async Task<IActionResult> GetPage([FromQuery] int page, int items)
        {
            try
            {
                return Ok(await _unitOfWork.Users.GetPageAsync(page, items));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
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

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await Task.Run(() => _unitOfWork.Users.DeleteAsync(id: id));
                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("DeleteUser")]
        public async Task<IActionResult> Delete(User user)
        {
            try
            {
                await Task.Run(() => _unitOfWork.Users.DeleteAsync(user));
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
