const { encrypt } = require("../config/crypto");
require("dotenv").config();

const userSeeder = async (connection) => {
  try {
    const admin_password = await encrypt("Admin@123");
    const super_admin_password = await encrypt("Super@123");

    const users = [
      {
        name: "client_name",
        user_name: "client",
        password: admin_password,
        email: "client@client.com",
        mobile_number: "1234567890",
        center_code: "",
        region_code: "",
        status: "Active",
        created_by: 0,
      },
      {
        name: "Techplus Infotech",
        user_name: "techplus",
        password: super_admin_password,
        email: "vikas.verma@techplusinfotech.com",
        mobile_number: "1234567890",
        center_code: "",
        region_code: "",
        status: "Active",
        created_by: 0,
      },
    ];

    const query = `INSERT INTO users 
                     (name, user_name, password, email, mobile_number, center_code, region_code, status, created_by)
                     VALUES ? 
                     ON DUPLICATE KEY UPDATE 
                     name=VALUES(name), 
                     password=VALUES(password), 
                     email=VALUES(email), 
                     mobile_number=VALUES(mobile_number), 
                     center_code=VALUES(center_code), 
                     region_code=VALUES(region_code), 
                     status=VALUES(status)`;

    const values = users.map((user) => [
      user.name,
      user.user_name,
      user.password,
      user.email,
      user.mobile_number,
      user.center_code,
      user.region_code,
      user.status,
      user.created_by,
    ]);

    const [result] = await connection.query(query, [values]);

    if (result.affectedRows > 0) {
      console.log("Users inserted or updated successfully.");
    } else {
      throw new Error("Unable to insert users data");
    }
  } catch (error) {
    console.error("Error inserting users:", error.message);
    throw new Error("Unable to insert users data");
  }
};

module.exports = userSeeder;
