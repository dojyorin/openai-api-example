import {Oak} from "../../deps.ts";
import {router} from "../routing/router.ts";
import {errorResponse} from "../plugin/error.ts";

const oak = new Oak();

oak.use(router.routes(), router.allowedMethods());
oak.use(errorResponse());

export {oak};