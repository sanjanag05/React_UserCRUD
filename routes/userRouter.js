import express from "express";
import {
  fetch,
  create,
  uploadMiddleware,
  update,
  deleteUser,
} from "../controller/userController.js";

const route = express.Router();
route.get("/getAllUsers", fetch);
route.post("/create", create, uploadMiddleware);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteUser);

export default route;
