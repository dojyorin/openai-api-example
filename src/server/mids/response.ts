function factoryResponse(code:number, body?:BodyInit, type?:string){
    return new Response(body, {
        status: code,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            ...type && {
                "Content-Type": type
            }
        }
    });
}

export function responseCode(code:number){
    return factoryResponse(code);
}

export function responseText(body:string){
    return factoryResponse(200, body, "text/plain");
}

export function responseHtml(body:string){
    return factoryResponse(200, body, "text/html");
}

export function responseByte(body:Uint8Array){
    return factoryResponse(200, body, "application/octet-stream");
}

export function responseJson<T extends Record<keyof T, unknown>>(body:T){
    return factoryResponse(200, JSON.stringify(body), "application/json");
}