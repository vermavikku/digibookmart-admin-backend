const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { evaluation } = require("../models");
const encrypt = async (data) => {
  try {
    const saltRounds = 10; // Number of salt rounds (cost factor)
    const hash = await bcrypt.hash(data, saltRounds);
    return hash;
  } catch (err) {
    console.error("Error hashing data:", err);
    throw err;
  }
};

const verify = async (data, hash) => {
  try {
    const match = await bcrypt.compare(data, hash);
    return match;
  } catch (err) {
    console.error("Error verifying data:", err);
    throw err;
  }
};

const secretKey = process.env.CRYPTO_KEY;

function getKeyFromPassword(secretKey) {
  return crypto.createHash("sha256").update(secretKey).digest();
}
// Function to encrypt data
async function encryptData(data) {
  const checkKey = await evaluation.getEvaluationByCondition({
    evaluation_marks: data,
  });
  if (checkKey.length > 0) {
    return encryptData(data);
  }
  const key = getKeyFromPassword(secretKey);
  const iv = crypto.randomBytes(16); // Initialization vector for randomness
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted; // Concatenate IV and encrypted data
}

// Function to decrypt data
function decryptData(encryptedData) {
  const key = getKeyFromPassword(secretKey);
  const parts = encryptedData.split(":");
  const iv = Buffer.from(parts[0], "hex");
  const encryptedText = parts[1];
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}

module.exports = { encrypt, verify, encryptData, decryptData };
