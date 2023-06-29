function factoryResponse(code:number, body?:BodyInit, type?:string){
    return new Response(body, {
        status: code,
        headers: {
            "Access-Control-Allow-Origin": "*",
            ...type && {
                "Content-Type": type
            }
        }
    });
}

function responseCode(code:number){
    return factoryResponse(code);
}

function responseText(body:string){
    return factoryResponse(200, body, "text/plain");
}

function responseHtml(body:string){
    return factoryResponse(200, body, "text/html");
}

function responseJson<T extends Record<keyof T, unknown>>(body:T){
    return factoryResponse(200, JSON.stringify(body), "application/json");
}