const isValid = (val) => {  
  return val !== undefined && val.length > 0 && val !== null;
};
module.exports = {
  PORT: isValid(process.env.PORT) ? process.env.PORT : 3000,
  DB_NAME: isValid(process.env.DB_NAME) ? process.env.DB_NAME : "",
  DB_USERNAME: isValid(process.env.DB_USERNAME) ? process.env.DB_USERNAME : "",
  DB_PASSWORD: isValid(process.env.DB_PASSWORD) ? process.env.DB_PASSWORD : "",
};
