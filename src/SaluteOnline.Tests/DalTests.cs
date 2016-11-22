using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using SaluteOnline.Controllers;
using SaluteOnline.DAL;
using SaluteOnline.Domain.User;
using Xunit;

namespace SaluteOnline.Tests
{
    public class DalTests
    {
        [Fact]
        public async void GetAllTest()
        {
            var unitOfWorkMoq = Substitute.For<IUnitOfWork>();
            
            //var usersMock = Substitute.For<IGenericRepository<User>>();
            //usersMock.GetAsync(Arg.Any<Expression<Func<User, bool>>>(),
            //        Arg.Any<Func<IQueryable<User>, IOrderedQueryable<User>>>(), Arg.Any<string>()).ReturnsForAnyArgs(Task.FromResult(GetUsers().AsEnumerable()));
            unitOfWorkMoq.Users.GetAsync(Arg.Any<Expression<Func<User, bool>>>(),
                    Arg.Any<Func<IQueryable<User>, IOrderedQueryable<User>>>(), Arg.Any<string>())
                .ReturnsForAnyArgs(GetUsers());
            var usersCtrl = new UserController(unitOfWorkMoq);
            var result = await usersCtrl.Get();
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnSession = Assert.IsType<IEnumerable<User>>(okResult.Value);
            Assert.Equal(returnSession.Count(), GetUsers().Result.Count());
        }

        private async Task<IEnumerable<User>> GetUsers()
        {
            var users = new List<User>
            {
                new User
                {
                    Id = 0,
                    Guid = Guid.NewGuid(),
                    LastName = "LastName",
                    LinkToVk = "LinkToVk",
                    Nick = "Nick",
                    City = "Lviv",
                    PhoneSecondary = "123",
                    IsAdmin = true,
                    VisibleToOthers = true,
                    Gender = "Male",
                    About = "About",
                    Name = "Name",
                    Country = "Country",
                    LinkToFb = "LinkToFb",
                    Email = "Email",
                    IsActive = true,
                    BirthDate = DateTime.Now,
                    Phone = "12",
                    Avatar = "Ava"
                },
                new User
                {
                    Id = 1,
                    Guid = Guid.NewGuid(),
                    LastName = "LastName",
                    LinkToVk = "LinkToVk",
                    Nick = "Nick",
                    City = "Lviv",
                    PhoneSecondary = "123",
                    IsAdmin = true,
                    VisibleToOthers = true,
                    Gender = "Male",
                    About = "About",
                    Name = "Name",
                    Country = "Country",
                    LinkToFb = "LinkToFb",
                    Email = "Email",
                    IsActive = true,
                    BirthDate = DateTime.Now,
                    Phone = "12",
                    Avatar = "Ava"
                }
            };
            return await Task.Run(() => users);
        }
    }
}