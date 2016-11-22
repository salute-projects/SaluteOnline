using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SaluteOnline.Migrations
{
    public partial class addmigrationUserGuidAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.AddColumn<Guid>(
                name: "Guid",
                table: "Users",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "Users",
                column: "Id");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "User");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Guid",
                table: "User");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "User",
                column: "Id");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "Users");
        }
    }
}
