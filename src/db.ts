import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "./config";

const dataSource = new DataSource({
  type: "mongodb",
  url: config.mongodb_uri,
  entities: [__dirname + "/entities/*.entity.{js,ts}"],
  synchronize: true,
  logging: false,
});

export default dataSource;
