import { httpResultModel } from './../models/httpResultModel';
import { HttpProvider } from './../../providers/http/http';
export abstract class  ProviderBase<T> {
    constructor(
        public url: string,
        public http: HttpProvider) { }

    get(): Promise<httpResultModel> {
        return this.http.get(this.url);
    }    

    getById(uid:string): Promise<httpResultModel> {
        return this.http.get(`${this.url}/${uid}`);
    }

    post(model: T): Promise<httpResultModel> {
        return this.http.post(this.url, model);
    }

    put(uid:string, model: T): Promise<httpResultModel> {
        return this.http.put(`${this.url}/${uid}`, model);
    }

    delete(uid:string): Promise<httpResultModel> {
        return this.http.delete(`${this.url}/${uid}`);
    }   
}
