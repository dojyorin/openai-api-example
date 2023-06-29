function responseEnd<T extends number | string | Record<keyof T, unknown>>(data:T){
    return new Response((()=>{
        switch(typeof data){
            case "number": return undefined;
            case "string": return data;
            case "object": return JSON.stringify(data);
        }
    })(), {
        status: (()=>{
            switch(typeof data){
                case "number": return data;
                case "string": return 200;
                case "object": return 200;
            }
        })(),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Content-Type": (()=>{
                switch(typeof data){
                    case "number": return "text/plain";
                    case "string": return "text/plain";
                    case "object": return "application/json";
                }
            })()
        }
    });
}