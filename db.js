// db.js
import 'dotenv/config' //esse lê o arquivo .env e salva
import postgres from 'postgres'

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID} = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

export const sql = postgres(URL, {ssl: 'require' });


