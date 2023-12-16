import {Router} from "../../../deps.ts";
import {router as api_chat} from "./api_chat.ts";
import {router as api_image} from "./api_image.ts";
import {router as api_model} from "./api_model.ts";

const api = new Router();
api.use("/chat", api_chat.routes(), api_chat.allowedMethods());
api.use("/image", api_image.routes(), api_image.allowedMethods());
api.use("/model", api_model.routes(), api_model.allowedMethods());

const router = new Router();
router.use("/api", api.routes(), api.allowedMethods());

export {router};