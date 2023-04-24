import { Pool } from "pg";

let connectionString;

connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  idleTimeoutMillis: 3000,
});

const psqlQuery = (query: string, params: (number | string | undefined)[]) => {
  return new Promise(async (resolve) => {
    await pool.query(query, params, (error, results) => {
      if (error) throw error;

      resolve(results.rows);
    });
  });
};
export default psqlQuery;

export const psqlInsert = async (
  table: string,
  values: { [test: string]: string | number | undefined }
) => {
  let valuesFillin = [];

  const valuesValues = Object.values(values);
  for (let i = 0; i < valuesValues.length; i++) {
    valuesFillin.push(`$${i + 1}`);
  }

  let query = `INSERT INTO ${table} (${Object.keys(values)
    .join(", ")
    .toLowerCase()}) VALUES (${valuesFillin.join(", ").toLowerCase()})`;

  await psqlQuery(query, valuesValues);
};

export const psqlUpdate = async (
  table: string,
  values: { [test: string]: string | number },
  where: { [test: string]: string | number }
) => {
  let finalValues = [];
  let updateValues = [];
  let whereValues = [];

  const valuesEntries = Object.entries(values);
  for (let i = 0; i < valuesEntries.length; i++) {
    const [key, value] = valuesEntries[i];

    updateValues.push(`${key}=$${finalValues.length + 1}`);
    finalValues.push(value);
  }

  const whereEntries = Object.entries(where);
  for (let i = 0; i < whereEntries.length; i++) {
    const [key, value] = whereEntries[i];

    whereValues.push(`${key.toLowerCase()}=$${finalValues.length + 1}`);
    finalValues.push(value);
  }

  let query = `UPDATE ${table} SET ${updateValues.join(
    ", "
  )} WHERE ${whereValues.join(", ")}`;

  await psqlQuery(query, finalValues);
};
