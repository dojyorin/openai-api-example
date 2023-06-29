export async function route(request:Request){
    return responseEnd(isGet ? 200 : 405);
}