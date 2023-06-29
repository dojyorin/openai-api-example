export async function route(request:Request){
    if(!isPost){
        return responseEnd(405);
    }

    const input = await _json<ChatQuery["messages"]>();

    if(!input.length || input.some(({role, content}) => !role || !content)){
        return responseEnd(400);
    }

    const messages = input.map(({role, content}) => ({role, content}));

    const result = await fetchApi<ChatResult>("/chat/completions", {
        method: "POST",
        body: JSON.stringify(<ChatQuery>{
            model: "gpt-3.5-turbo",
            messages
        })
    });

    return responseEnd(result.choices);
}