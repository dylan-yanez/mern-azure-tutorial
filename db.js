/* const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "$323*xSdzEEE#FFF",
    port: "5432",
    database: "testinprogress"
});

module.exports = pool; */
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "admin1",
    password: "calcium12!",
    host: "tunevistaserver.postgres.database.azure.com",
    port: "5432", // Default PostgreSQL port
    database: "TuneVistaDatabase",
    ssl: {
        rejectUnauthorized: false, // Optionally, you can set this to true for strict SSL validation
    }
});

module.exports = pool;