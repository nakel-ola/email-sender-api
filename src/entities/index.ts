import dbDataSource from "../db";
import APIKeyEntity from "./api.entity";

const db = {
  apiKey: dbDataSource.getMongoRepository(APIKeyEntity),
};

export default db;
