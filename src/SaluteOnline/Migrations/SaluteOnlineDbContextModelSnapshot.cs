using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using SaluteOnline.DAL;

namespace SaluteOnline.Migrations
{
    [DbContext(typeof(SaluteOnlineDbContext))]
    partial class SaluteOnlineDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SaluteOnline.Domain.User.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("About");

                    b.Property<string>("Avatar");

                    b.Property<DateTime?>("BirthDate");

                    b.Property<string>("City");

                    b.Property<string>("Country");

                    b.Property<string>("Email");

                    b.Property<string>("Gender");

                    b.Property<Guid>("Guid");

                    b.Property<bool>("IsActive");

                    b.Property<bool>("IsAdmin");

                    b.Property<string>("LastName");

                    b.Property<string>("LinkToFb");

                    b.Property<string>("LinkToVk");

                    b.Property<string>("Name");

                    b.Property<string>("Nick");

                    b.Property<string>("Phone");

                    b.Property<string>("PhoneSecondary");

                    b.Property<bool>("VisibleToOthers");

                    b.HasKey("Id");

                    b.ToTable("User");
                });
        }
    }
}
