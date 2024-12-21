const pool = require("../config/transaction");

const userSeeders = require("./users.seeders");
const roleSeeders = require("./role_master.seeders");
const userRoleSeeders = require("./user_roles.seeders");
const menuSeeders = require("./menu_master.seeders");
const mamSeeders = require("./mam.seeders");
const settingSeeder = require("./settings.seeders");

const runSeeders = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    console.log("Running seeders...");

    await Promise.all([
      userSeeders(connection),
      roleSeeders(connection),
      userRoleSeeders(connection),
      menuSeeders(connection),
      mamSeeders(connection),
      settingSeeder(connection),
    ]);

    await connection.commit();
    console.log("All seeders executed successfully.");
  } catch (err) {
    await connection.rollback();
    console.error("Error running seeders:", err);
  } finally {
    if (connection) {
      await connection.release();
    }
  }
};

module.exports = runSeeders;
