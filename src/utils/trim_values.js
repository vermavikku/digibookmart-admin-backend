const trimRequestBody = (obj) => {
  if (typeof obj === "string") {
    return obj.trim();
  } else if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = trimRequestBody(obj[key]);
      return acc;
    }, {});
  } else if (Array.isArray(obj)) {
    return obj.map(trimRequestBody);
  }
  return obj;
};

module.exports = trimRequestBody;
