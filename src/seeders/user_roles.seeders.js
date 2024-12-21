const userRolesSeeder = async (connection) => {
  try {
    // Define the user roles to be inserted
    const userRoles = [
      {
        role_code: "ADMIN",
        user_name: "client",
        default_role: "1",
        status: "Active",
      },
      {
        role_code: "SUPERADMIN",
        user_name: "techplus",
        default_role: "1",
        status: "Active",
      },
    ];

    // SQL query for bulk insert with ON DUPLICATE KEY UPDATE
    const query = `INSERT INTO user_roles 
                       (role_code, user_name, default_role, status) 
                     VALUES ? 
                     ON DUPLICATE KEY UPDATE 
                       default_role = VALUES(default_role), 
                       status = VALUES(status)`;

    // Mapping the user roles data to match the query placeholders
    const values = userRoles.map((role) => [
      role.role_code,
      role.user_name,
      role.default_role,
      role.status,
    ]);

    // Execute the query with the values
    const [result] = await connection.query(query, [values]);

    if (result.affectedRows > 0) {
      console.log("User roles inserted or updated successfully.");
    } else {
      throw new Error("Unable to insert user roles data");
    }
  } catch (error) {
    console.error("Error inserting user roles:", error.message);
    throw new Error("Unable to insert user roles data");
  }
};

module.exports = userRolesSeeder;
