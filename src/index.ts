require("dotenv").config();
import app from "./app";
import config from "./config";
import dbDataSource from "./db";


async function bootstrap() {
  await dbDataSource.initialize();

  await new Promise<void>((resolve) =>
    app.listen({ port: config.port }, resolve)
  ).then(() => {
    console.log(`🚀 Server ready at http://localhost:${config.port}/`);
  });
}

bootstrap();
