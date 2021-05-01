using Microsoft.EntityFrameworkCore.Migrations;

namespace JewelryStore.DAL.Migrations
{
    public partial class InitialData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CustomerType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Customer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CustomerTypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Customer_CustomerType_CustomerTypeId",
                        column: x => x.CustomerTypeId,
                        principalTable: "CustomerType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "CustomerType",
                columns: new[] { "Id", "Name" },
                values: new object[] { 999, "Privileged" });

            migrationBuilder.InsertData(
                table: "CustomerType",
                columns: new[] { "Id", "Name" },
                values: new object[] { 998, "Regular" });

            migrationBuilder.InsertData(
                table: "Customer",
                columns: new[] { "Id", "CustomerName", "CustomerTypeId", "Password", "UserName" },
                values: new object[] { 1, null, 999, "test@123", "test123" });

            migrationBuilder.InsertData(
                table: "Customer",
                columns: new[] { "Id", "CustomerName", "CustomerTypeId", "Password", "UserName" },
                values: new object[] { 2, null, 998, "test@1234", "test1234" });

            migrationBuilder.CreateIndex(
                name: "IX_Customer_CustomerTypeId",
                table: "Customer",
                column: "CustomerTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Customer");

            migrationBuilder.DropTable(
                name: "CustomerType");
        }
    }
}
