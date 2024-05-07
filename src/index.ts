import express, { Application } from "express";
import path from "path";
import Routes from "./routers/routes";


const app: Application = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "src/routes")));
app.use(express.static(path.join(__dirname, "src/public")));

new Routes(app);

app.listen(4000, () => {
    console.log("Connecting Server....");
})

