import express from "express";
import cors from "cors";
import appConfig from "./2-utils/app-config";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import authRoutes from "./6-routes/auth-routes";
import dataRoutes from "./6-routes/cv-routes";
import routerScan from "./6-routes/scan-router";
import dal from "./2-utils/dal";
import expressFileUpload from "express-fileupload";
import routerUser from "./6-routes/users-routes";

const server = express();

server.use(cors());
server.use(express.json());
server.use(expressFileUpload()); // Creates request.files object containing files sent from backend.
server.use("/api/auth", authRoutes);
server.use("/api", dataRoutes);
server.use("/scan", routerScan);
server.use("/user", routerUser);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(appConfig.port,async () =>
{
    await dal.connect();
    console.log(`Listening on http://localhost:${appConfig.port}`)
});
