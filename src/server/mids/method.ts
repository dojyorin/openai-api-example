export function isGet({method}:Request){
    return method === "GET";
}

export function isPost({method}:Request){
    return method === "POST";
}