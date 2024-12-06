import express from "express";
import { filterUsers } from "../controllers/filter.js";

const Router = express.Router();

// Define the filter route
Router.get("/filter", filterUsers);

export default Router;
