import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLast3MessagesController } from "./controllers/GetLast3MessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";

const routes = Router();

routes.post("/authenticate", new AuthenticateUserController().handle);
routes.post(
  "/messages",
  ensureAuthenticated,
  new CreateMessageController().handle
);

routes.get("/messages/last3", new GetLast3MessagesController().handle);
routes.get("/profile", ensureAuthenticated, new ProfileUserController().handle);

export { routes };
