import { log } from "console";
import { config } from "dotenv";
import { DataSource } from "typeorm";

config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASS as string,
  database: process.env.DB_DATABASE as string,
});

async function connect() {
  try {
    await AppDataSource.initialize();
    log("Data Source has been initialized");
  } catch (error) {
    log("Error during Data Source initialization", error);
  }
}

connect();
