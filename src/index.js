const express = require("express");
const app = express();
const port = 3000;
const { Client } = require("pg");

// const res = await client.query('SELECT $1::text as message', ['Hello world!'])
// console.log(res.rows[0].message) // Hello world!
// await client.end()

app.get("/addresses", async (req, res) => {
  const { postcode } = req.query;
  const addressDB = new Client({
    user: "postgres",
    password: "mypassword",
    host: "localhost",
    database: "sampledb", // default process.env.PGDATABASE || process.env.USER
    port: 5433, // default process.env.PGPORT
    // connectionString?: string, // e.g. postgres://user:password@host:5432/database
  });
  await addressDB.connect();
  postcode.replace("+", " ");
  const addresses = addressDB.query(
    "select line1 from public.hackney_address where postcode = '$1';",
    [postcode]
  );
  console.log(postcode);
  res.status(200).json({ data: { addresses } });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
