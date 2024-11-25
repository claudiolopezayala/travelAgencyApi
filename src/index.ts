import express from "express"
import { envs } from "./utils/dotenv"
import appRouter from "./router/app-router"
import { MongoDatabase } from "./db/connection";

const app = express();

(async () => await MongoDatabase.connect({mongoUrl: envs.MONGO_URL, dbName: envs.MONGO_DB}))();
app.use(express.json())
app.use("/", appRouter)

app.listen(envs.PORT, ()=>{
  console.log(`Server is running on port ${envs.PORT}`)
})