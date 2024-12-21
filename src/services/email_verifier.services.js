const emailExistence = require("email-existence");

const emailExist = (email) => {
  return new Promise((resolve, reject) => {
    emailExistence.check(email, (error, response) => {
      if (error) {
        console.error("Error:", error);
        reject(error);
      } else {
        if (response) {
          console.log("Email exists and is deliverable.");
          resolve(true);
        } else {
          console.log("Email does not exist or is not deliverable.");
          resolve(false);
        }
      }
    });
  });
};

module.exports = emailExist;
