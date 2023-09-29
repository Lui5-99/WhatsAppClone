import express from "express";
import multiparty from "connect-multiparty";
import { GroupController } from "../controllers/index.js";
import { mdAuth } from "../middleware/index.js";

const mdupload = multiparty({ uploadDir: "./uploads/group" });

const api = express.Router();

// Endpoints
api.post("/group", [mdAuth.asureAuth, mdupload], GroupController.create);
api.get("/group", mdAuth.asureAuth, GroupController.getAll);
api.get("/group/:id", mdAuth.asureAuth, GroupController.getGroup);

export const groupRoutes = api;
