"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors");
// process.env.DATABASE_HOST= "localhost";
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const DATABASE_HOST = "localhost";

const PORT = +process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  const user = "postgres";
  const host = "localhost";
  const port = 5432;
  const dbname = (process.env.NODE_ENV === "test")
      ? "jobly_test"
      : process.env.DATABASE_URL || "jobly";

  return `postgres://${user}:${'new_pass'}@${host}:${port}/${dbname}`;
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
//
// WJB: Evaluate in 2021 if this should be increased to 13 for non-test use
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("Jobly Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  DATABASE_HOST,
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
