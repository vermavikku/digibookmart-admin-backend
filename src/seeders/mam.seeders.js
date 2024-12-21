const mamSeeder = async (connection) => {
  try {
    const permissions = ["create", "update", "delete", "export", "import"];
    // const menu_codes = [
    //   "st",
    //   "mm",
    //   "mr",
    //   "bd",
    //   "cr",
    //   "br",
    //   "sub",
    //   "me",
    //   "rg",
    //   "ct",
    //   "ex",
    //   "examiner",
    // ];  
    const menu_codes = [
      "mm",
      "mr",
    ];
    const roles = [
      {
        role_code: "SUPERADMIN",
        mac_status: "Active",
        created_by: 0,
      },
    ];

    let mamData = [];

    roles.forEach((role) => {
      menu_codes.forEach((code) => {
        permissions.forEach((permission) => {
          const values = {
            menu_code: code,
            mac_permission: permission,
          };
          mamData.push({ ...role, ...values });
        });
      });
    });

    const query = `INSERT INTO menu_access_master 
                     (role_code, menu_code, mac_permission, mac_status, created_by) 
                   VALUES ? 
                   ON DUPLICATE KEY UPDATE 
                     mac_status = VALUES(mac_status),
                     created_by = VALUES(created_by)`;

    const values = mamData.map((mac) => [
      mac.role_code,
      mac.menu_code,
      mac.mac_permission,
      mac.mac_status,
      mac.created_by,
    ]);

    const [result] = await connection.query(query, [values]);

    if (result.affectedRows > 0) {
      console.log("Menu access master items inserted or updated successfully.");
    } else {
      throw new Error("Unable to insert menu access master data");
    }
  } catch (error) {
    console.error("Error inserting menu access master items:", error.message);
    throw new Error("Unable to insert menu access master data");
  }
};

module.exports = mamSeeder;
