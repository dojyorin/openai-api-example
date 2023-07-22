import {OakRouter} from "../../deps.ts";
import {router as api_chat} from "./api/chat.ts";
import {router as api_image} from "./api/image.ts";
import {router as api_model} from "./api/model.ts";

const router = new OakRouter();

const route_api = new OakRouter();

route_api.use("/chat", api_chat.routes(), api_chat.allowedMethods());
route_api.use("/image", api_image.routes(), api_image.allowedMethods());
route_api.use("/model", api_model.routes(), api_model.allowedMethods());

router.use("/api", route_api.routes(), route_api.allowedMethods());

export {router};