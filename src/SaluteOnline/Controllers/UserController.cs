using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SaluteOnline.DAL;
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

        [HttpPut]
        public async Task<IActionResult> Update(User user)
        {
            try
            {
                var updatedUser = await _unitOfWork.Users.UpdateAsync(user);
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
