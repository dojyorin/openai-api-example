import {Oak} from "../deps.ts";
import {router} from "./routing/router.ts";
import {staticContent} from "./mw/static.ts";
import {errorResponse} from "./mw/error.ts";

const oak = new Oak();

oak.use(staticContent());
oak.use(router.routes(), router.allowedMethods());
oak.use(errorResponse());

export {oak};