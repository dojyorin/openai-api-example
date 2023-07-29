import {createStore} from "../deps.js";

export const store = createStore({
    state(){
        return {
            count: 0
        };
    },

    getters: {
        count(s){
            return s.count;
        }
    },

    mutations: {
        increment(s){
            s.count++;
        },

        reset(s){
            s.count = 0;
        }
    },

    actions: {
        async delayReset(context){
            await new Promise(done => setTimeout(done, 1000));

            context.commit("reset");
        }
    }
});