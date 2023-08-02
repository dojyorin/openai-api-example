import {type Opt, unixtimeEncode} from "../../deps.ts";

export interface MetaField{
    $id: string;
    $update: number;
}

export class IMDS<T extends Opt<T>>{
    #kv:Map<string, T & MetaField>;
    #watch?:number;

    constructor(){
        this.#kv = new Map();
        this.#watch = undefined;
    }

    get size(){
        return this.#kv.size;
    }

    clear(){
        this.#kv.clear();
    }

    delete(k:string){
        return this.#kv.delete(k);
    }

    has(k:string){
        return this.#kv.has(k);
    }

    get(k:string){
        const result = this.#kv.get(k);

        if(!result){
            throw new ReferenceError();
        }

        return result;
    }

    set(k:string, v:T){
        return this.#kv.set(k, {
            ...v,
            $id: k,
            $update: unixtimeEncode()
        });
    }

    keys(){
        return this.#kv.keys();
    }

    values(){
        return this.#kv.values();
    }

    entries(){
        return this.#kv.entries();
    }

    touch(k:string){
        this.get(k).$update = unixtimeEncode();
    }

    purgeTimeout(timeout:number){
        const t = unixtimeEncode();

        for(const {$id, $update} of this.values()){
            if(timeout < t - $update){
                continue;
            }

            this.delete($id);
        }
    }

    watchStart(timeout:number){
        this.#watch = setInterval(() => this.purgeTimeout(timeout),  timeout * 1000);
    }

    watchEnd(){
        clearInterval(this.#watch);
    }

    *[Symbol.iterator](){
        for(const e of this.#kv){
            yield e;
        }
    }
}