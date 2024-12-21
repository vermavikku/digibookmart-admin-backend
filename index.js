const express = require("express");
const app = express();
const env = require("./src/config/env");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const db = require("./src/config/database");
const { logs_middlewear } = require("./src/middlewares/index");
const router = require("./src/routes/index");

// const runSeeders = require("./src/seeders");

const { socketService } = require("./src/services/index");
const http = require("http");
const server = http.createServer(app);

const corsOptions = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const socket = new socketService(server);

app.use(logs_middlewear.requestLogs);
app.use(logs_middlewear.responseLogs);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/v1", router);

// if (process.env.RUN_SEEDERS === "true") {
//   setTimeout(() => {
//     runSeeders()
//       .then(() => {
//         console.log("Seeders executed on server start");
//       })
//       .catch((err) => {
//         console.error("Failed to run seeders on server start:", err);
//       });
//   }, 1000);
// }

// app.get('/test', (req, res) => {
//   res.send('Test route working');
// });

console.log(env.port);


const PORT =env.port;

server.listen(PORT, () => {
  console.log(`Server Running On Port Number ${PORT}`);
});
