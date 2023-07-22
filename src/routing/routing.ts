import {OakRouter} from "../../deps.ts";
import {router as api} from "./api.ts";

const router = new OakRouter();

router.use("/api", api.routes(), api.allowedMethods());

export {router};