const { settings } = require("../models/index");

const getSetting = async (moduleName) => {
  try {
    const setting = await settings.selectSetting({ setting_for: moduleName });
    if (setting.length == 0) {
      return false;
    }
    return setting[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = { getSetting };
