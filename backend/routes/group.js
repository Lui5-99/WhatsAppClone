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
api.patch(
  "/group/:id",
  [mdAuth.asureAuth, mdupload],
  GroupController.updateGroup
);
api.patch("/group/exit/:id", mdAuth.asureAuth, GroupController.exitGroup);
api.patch(
  "/group/add_participants/:id",
  mdAuth.asureAuth,
  GroupController.addParticipant
);
api.patch("/group/ban", mdAuth.asureAuth, GroupController.banParticipantGroup);

export const groupRoutes = api;
