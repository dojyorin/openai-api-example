import {OakRouter} from "../../deps.ts";
import {router as page} from "./static.ts";
import {router as api} from "./api.ts";

const router = new OakRouter();

router.use("/", page.routes(), page.allowedMethods());
router.use("/api", api.routes(), api.allowedMethods());

export {router};