const roleSeeder = async (connection) => {
  try {
    const roles = [
      {
        role_code: "ADMIN",
        role_name: "Administrator",
        role_type: "C",
        role_status: "Active",
      },
      {
        role_code: "SUPERADMIN",
        role_name: "Super Admin",
        role_type: "C",
        role_status: "Active",
      },
    ];

    const query = `INSERT INTO role_master 
                       (role_code, role_name, role_type, role_status) 
                     VALUES ? 
                     ON DUPLICATE KEY UPDATE 
                       role_name = VALUES(role_name), 
                       role_type = VALUES(role_type), 
                       role_status = VALUES(role_status)`;

    const values = roles.map((role) => [
      role.role_code,
      role.role_name,
      role.role_type,
      role.role_status,
    ]);

    const [result] = await connection.query(query, [values]);

    if (result.affectedRows > 0) {
      console.log("Roles inserted or updated successfully.");
    } else {
      throw new Error("Unable to insert role data");
    }
  } catch (error) {
    console.error("Error inserting roles:", error.message);
    throw new Error("Unable to insert role data");
  }
};

module.exports = roleSeeder;
