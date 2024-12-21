const settingSeeder = async (connection) => {
  try {
    const email = {
      email_status: "1",
      host: "mail.smtp2go.com",
      username: "iaismartosm",
      password: "s0easOsLAWQmppHA",
      port_number: "2525",
      multitype: "html",
    };

    const settings = [
      {
        setting_for: "email",
        setting_json: JSON.stringify(email),
        created_by: 0,
      },
    ];

    const query = `INSERT INTO settings 
                         (setting_for, setting_json, created_by) 
                       VALUES ? 
                       ON DUPLICATE KEY UPDATE 
                         setting_for = VALUES(setting_for), 
                         setting_json = VALUES(setting_json), 
                         created_by = VALUES(created_by)`;

    const values = settings.map((setting) => [
      setting.setting_for,
      setting.setting_json,
      setting.created_by,
    ]);

    const [result] = await connection.query(query, [values]);

    if (result.affectedRows > 0) {
      console.log("settings inserted or updated successfully.");
    } else {
      throw new Error("Unable to insert settings data");
    }
  } catch (error) {
    console.error("Error inserting settings:", error.message);
    throw new Error("Unable to insert settings data");
  }
};

module.exports = settingSeeder;
