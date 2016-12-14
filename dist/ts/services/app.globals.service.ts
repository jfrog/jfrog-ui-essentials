import {Injectable} from "@angular/core";

@Injectable()
export class AppGlobalsService {
    private globals = {};

    public get(key) {
        return this.globals[key];
    }

    public set(key, val) {
        this.globals[key] = val;
    }

    public remove(key) {
        if (this.globals[key] !== undefined) delete this.globals[key];
    }

    public clearAll(){
        this.globals = {};
    }

}