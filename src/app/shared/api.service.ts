import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) {}

  //Create a Restaurent Using Post Method
  postRestaurent(data:any){
    return this._http.post<any>("http://localhost:3000/posts/",data).pipe(map((res:any)=>{
      return res;
    }))
  }

  //Create Restaurent Using Get Method
  getRestaurent(){
    return this._http.get<any>("http://localhost:3000/posts/").pipe(map((res:any)=>{
      return res;
    }))
  }
  //Create reataurent Using Update Method
  updateRestaurent(data:any, id:number){
    return this._http.put<any>("http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteRestaurent(id:number){
    return this._http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }
}
