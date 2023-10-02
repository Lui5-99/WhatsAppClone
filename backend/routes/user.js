import express from "express";
import multiparty from "connect-multiparty";
import { UserController } from "../controllers/user.js";
import { mdAuth } from "../middleware/index.js";

const mdupload = multiparty({ uploadDir: "./uploads/avatar" });

const api = express.Router();

// Endpoints
api.get("/user/me", mdAuth.asureAuth, UserController.getMe);
api.get("/user", mdAuth.asureAuth, UserController.getUsers);
api.get("/user/:id", mdAuth.asureAuth, UserController.getUser);
api.patch("/user/me", [mdAuth.asureAuth, mdupload], UserController.updatedUser);
api.get(
  "/users_except_participants_group/:group_id",
  mdAuth.asureAuth,
  UserController.getUserExceptParticioantsGroup
);

export const userRoutes = api;
