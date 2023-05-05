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

type AcceptedTypes = number | string | boolean | undefined;

const psqlQuery = (query: string, params: AcceptedTypes[]) => {
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
  values: { [test: string]: AcceptedTypes }
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

export const psqlInsertMultiple = async (
  table: string,
  values: { [test: string]: AcceptedTypes }[]
) => {
  if (values.length == 0) return;

  let valuesFillin = [];
  let valuesValues: any[] = [];

  for (const value of values) {
    valuesValues = [...valuesValues, ...Object.values(value)];
    for (let i = 0; i < valuesValues.length; i++) {
      valuesFillin.push(`$${i + 1}`);
    }
  }

  const valuesLength = Object.values(values[0]).length;
  const valueGroups = values.map((innerValues, valuesIndex) => {
    return `(${Object.values(innerValues).map(
      (_, innerValueIndex) =>
        `$${innerValueIndex + 1 + valuesIndex * valuesLength}`
    )})`;
  });

  let query = `INSERT INTO ${table} (${Object.keys(values[0])
    .join(", ")
    .toLowerCase()}) VALUES ${valueGroups.join(", ")}`;

  await psqlQuery(query, valuesValues);
};

export const psqlUpdate = async (
  table: string,
  values: { [id: string]: AcceptedTypes },
  where: { [id: string]: AcceptedTypes }
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
  )} WHERE ${whereValues.join(" AND ")}`;

  await psqlQuery(query, finalValues);
};

export const psqlDelete = async (
  table: string,
  where: { [id: string]: AcceptedTypes }
) => {
  let finalValues = [];
  let whereValues = [];

  const whereEntries = Object.entries(where);
  for (let i = 0; i < whereEntries.length; i++) {
    const [key, value] = whereEntries[i];

    whereValues.push(`${key.toLowerCase()}=$${finalValues.length + 1}`);
    finalValues.push(value);
  }

  let query = `DELETE FROM ${table} WHERE ${whereValues.join(" AND ")}`;

  await psqlQuery(query, finalValues);
};
