import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataSourceChangedEventArgs } from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs';
const httpOptions ={headers:new HttpHeaders({
  "Content-Type": "application/json"
})};
@Injectable({
  providedIn: 'root'
})

export class ApiService {
  API_URL =  'https://pdptappsensor.elb.cisinlive.com'
  // API_URL =  'http://localhost:4001'

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(this.API_URL+'/all-Student');
  }

  deleteData(item:any){
    return this.http.delete(this.API_URL+'/delete-Student/',item)
  }
  addData(addNew:any){
    return this.http.post(this.API_URL+'/add-Student',addNew)
  }

  addRecord(dataSourceChangedEvent: DataSourceChangedEventArgs){
return this.http.post(this.API_URL+'/add-Student',dataSourceChangedEvent.data, httpOptions);
  }
  updateRecord(dataSourceChangedEvent: DataSourceChangedEventArgs,id:any){
  
    return this.http.put(this.API_URL+'/update-Student/'+id,dataSourceChangedEvent.data, httpOptions);
      }
      deleteRecord(state:any,id:any){
  
        return this.http.delete(this.API_URL+'/delete-Student/'+state.data[0].id, httpOptions);
          }
}

