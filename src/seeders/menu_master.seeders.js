const menuMasterSeeder = async (connection) => {
  try {
    // Define the menu items to be inserted
    const menus = [
      {
        menu_title: "Settings",
        menu_code: "st",
        menu_url: "",
        menu_icon: "setting-2",
        menu_description: "settings of project",
        menu_order: 1,
        menu_status: "Active",
        menu_parent_code: "",
      },
      {
        menu_title: "Manage Menus",
        menu_code: "mm",
        menu_url: "/settings/manage-menus",
        menu_icon: "",
        menu_description: "manage all menus of project",
        menu_order: 1,
        menu_status: "Active",
        menu_parent_code: "st",
      },
      {
        menu_title: "Manage Roles",
        menu_code: "mr",
        menu_url: "/settings/manage-roles",
        menu_icon: "",
        menu_description: "manage all roles of project",
        menu_order: 2,
        menu_status: "Active",
        menu_parent_code: "st",
      },
      {
        menu_title: "Base Data",
        menu_code: "bd",
        menu_url: "",
        menu_icon: "",
        menu_description: "-",
        menu_order: 2,
        menu_status: "Active",
        menu_parent_code: "",
      },
      {
        menu_title: "Courses",
        menu_code: "cr",
        menu_url: "/base-data/courses",
        menu_icon: "",
        menu_description: "-",
        menu_order: 1,
        menu_status: "Active",
        menu_parent_code: "bd",
      },
      {
        menu_title: "Branches",
        menu_code: "br",
        menu_url: "/base-data/branches",
        menu_icon: "",
        menu_description: "-",
        menu_order: 2,
        menu_status: "Active",
        menu_parent_code: "bd",
      },
      {
        menu_title: "Subjects",
        menu_code: "sub",
        menu_url: "/base-data/subject",
        menu_icon: "",
        menu_description: "-",
        menu_order: 3,
        menu_status: "Active",
        menu_parent_code: "bd",
      },
      {
        menu_title: "Mediums",
        menu_code: "me",
        menu_url: "/base-data/medium",
        menu_icon: "",
        menu_description: "-",
        menu_order: 4,
        menu_status: "Active",
        menu_parent_code: "bd",
      },
      {
        menu_title: "Regions",
        menu_code: "rg",
        menu_url: "/base-data/region",
        menu_icon: "",
        menu_description: "-",
        menu_order: 5,
        menu_status: "Active",
        menu_parent_code: "bd",
      },
      {
        menu_title: "Centers",
        menu_code: "ct",
        menu_url: "/base-data/centers",
        menu_icon: "",
        menu_description: "-",
        menu_order: 6,
        menu_status: "Active",
        menu_parent_code: "bd",
      },
      {
        menu_title: "Exams",
        menu_code: "ex",
        menu_url: "/base-data/exam-master",
        menu_icon: "",
        menu_description: "-",
        menu_order: 7,
        menu_status: "Active",
        menu_parent_code: "bd",
      },
      {
        menu_title: "Examiners",
        menu_code: "examiner",
        menu_url: "/base-data/users",
        menu_icon: "",
        menu_description: "-",
        menu_order: 8,
        menu_status: "Active",
        menu_parent_code: "bd",
      },
    ];

    // SQL query for bulk insert with ON DUPLICATE KEY UPDATE
    const query = `INSERT INTO menu_master 
                       (menu_title, menu_code, menu_url, menu_icon, menu_description, menu_order, menu_status, menu_parent_code) 
                     VALUES ? 
                     ON DUPLICATE KEY UPDATE 
                       menu_title = VALUES(menu_title), 
                       menu_status = VALUES(menu_status)`;

    // Mapping the menu data to match the query placeholders
    const values = menus.map((menu) => [
      menu.menu_title,
      menu.menu_code,
      menu.menu_url,
      menu.menu_icon,
      menu.menu_description,
      menu.menu_order,
      menu.menu_status,
      menu.menu_parent_code,
    ]);

    // Execute the query with the values
    const [result] = await connection.query(query, [values]);

    if (result.affectedRows > 0) {
      console.log("Menu items inserted or updated successfully.");
    } else {
      throw new Error("Unable to insert menu data");
    }
  } catch (error) {
    console.error("Error inserting menu items:", error.message);
    throw new Error("Unable to insert menu data");
  }
};

module.exports = menuMasterSeeder;
