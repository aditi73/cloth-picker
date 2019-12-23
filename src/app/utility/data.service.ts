import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class DataService {

    private data = new BehaviorSubject('');
    currentData = this.data.asObservable();

    constructor() { }

    setData(value: any) {
      this.data.next(value);
    }

    //set data to local storage
    setDataInStore(key:string,value:any){
        let data = btoa(unescape(encodeURIComponent(JSON.stringify(value))));
        localStorage.setItem(key, data);
    }

    //get data from local storage
    getDataFromStore(key:string){
        if(localStorage.getItem(key)){
            let data = decodeURIComponent(escape(window.atob(localStorage.getItem(key))));
            return JSON.parse(data);
        }else{
            return false;
        }
    }

    //remove particular data from local storage
    removeDataFromStore(key:string){
      localStorage.removeItem(key);
    }

    //clear local storage
    clearDataInStore(){
      localStorage.clear();
    }
}
