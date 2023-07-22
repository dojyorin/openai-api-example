import {OakRouter} from "../../deps.ts";
import {router as api_chat} from "./api/chat.ts";
import {router as api_image} from "./api/image.ts";
import {router as api_model} from "./api/model.ts";

const router = new OakRouter();

router.use("/chat", api_chat.routes(), api_chat.allowedMethods());
router.use("/image", api_image.routes(), api_image.allowedMethods());
router.use("/model", api_model.routes(), api_model.allowedMethods());

export {router};