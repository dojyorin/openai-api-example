import {OakRouter} from "../../deps.ts";
import {type ServerState} from "../oak.ts";

export function createRouter(){
    return new OakRouter<ServerState>();
}