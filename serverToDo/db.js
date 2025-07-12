const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "loolrov17",
  port: 5432,
});

module.exports = pool;
