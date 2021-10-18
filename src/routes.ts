import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";

const routes = Router();

routes.post("/authenticate", new AuthenticateUserController().handle);

export { routes };
