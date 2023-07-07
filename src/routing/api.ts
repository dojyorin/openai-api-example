import {OakRouter} from "../../deps.ts";
import {router as chat} from "./api/chat.ts";
import {router as image} from "./api/image.ts";
import {router as model} from "./api/model.ts";

const router = new OakRouter();
router.use("/chat", chat.routes(), chat.allowedMethods());
router.use("/image", image.routes(), image.allowedMethods());
router.use("/model", model.routes(), model.allowedMethods());

export {router};