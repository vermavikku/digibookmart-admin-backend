const nodemailer = require("nodemailer");
const fs = require("fs");
const handlebars = require("handlebars");
const settings = require("../../services/setting.services");

const compileTemplate = (templateName, data) => {
  const filePath = `${__dirname}/${templateName}.html`;
  const source = fs.readFileSync(filePath, "utf8");
  const template = handlebars.compile(source);
  return template(data);
};

const emailSend = async (email, data) => {
  try {
    const emailSetting = await settings.getSetting("email");

    if (!emailSetting) {
      return false;
    }

    const config = JSON.parse(emailSetting.setting_json);

    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: false,
      auth: {
        user: config.username,
        pass: config.password,
      },
    });

    const html = compileTemplate("template", data);
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <paras@smartosm.com>',
      to: `${email}`,
      subject: "otp",
      html,
    });

    return true;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = emailSend;
