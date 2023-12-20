import express from "express";
import mysql, { createConnection } from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = createConnection({
  host: "localhost",
  user: "root",
  password: "Nika12lai",
  database: "stbase",
  waitForConnections: true,
});

app.get("/table", (req, res) => {
  const tableName = req.query.tableName;
  const searchValue = JSON.parse(req.query.searchValue || "{}");

  let q = `SELECT * FROM ${tableName} WHERE 1`;

  // Initialize an array to store the values for filtering
  const filterValues = [];

  // Iterate through the searchValue fields and add conditions to the query
  Object.keys(searchValue).forEach((key) => {
    const value = searchValue[key];
    if (value !== "") {
      q += ` AND ${key} LIKE ?`;
      filterValues.push(`%${value}%`);
    }
  });

  // Add the final condition to exclude rows with null id
  q += " AND id IS NOT NULL";
  db.query(q, filterValues, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/table", (req, res) => {
  const tableName = req.query.tableName;
  const q = `INSERT INTO ${tableName} (name, lastname, personalid, mail, birthdate ) VALUES (?, ?, ?, ?, ?)`;
  const values = [
    req.body.name,
    req.body.lastname,
    req.body.personalid,
    req.body.mail,
    req.body.birthdate,
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json({ message: "Added successfully", data });
  });
});

app.delete("/table/:id", (req, res) => {
  const tableName = req.query.tableName;
  const Id = req.params.id;
  const q = `DELETE FROM ${tableName} WHERE Id = ?`;
  db.query(q, [Id], (err) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json({ message: "Deleted successfully" });
  });
});

app.put("/table/:id", (req, res) => {
  const tableName = req.query.tableName;
  const Id = req.params.id;
  const q = `UPDATE ${tableName} SET name = ?, lastname = ?, personalid = ?, mail= ?, birthdate = ? WHERE Id = ? `;

  const values = [
    req.body.name,
    req.body.lastname,
    req.body.personalid,
    req.body.mail,
    req.body.birthdate,
  ];

  db.query(q, [...values, Id], (err) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json({ message: "Updated successfully" });
  });
});

app.listen(8800, () => {
  console.log("welcome to server");
});
