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
  API_URL =  'https://pdptappsensor.elb.cisinlive.com';
  // API_URL =  'http://localhost:4001'

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(this.API_URL+'/all-Student');
  }

  deleteData(item:any){
    return this.http.delete(this.API_URL+'/delete-Student/'+item, httpOptions)
  }
  addData(addNew:any){
    console.log("service data",addNew)
    return this.http.post(this.API_URL+'/add-Student',addNew, httpOptions)
  }

  // Update
  updateData(id: any, data: any){
    return this.http
      .put(this.API_URL+'/update-Student/'+id, data[0], httpOptions)
      
  }

// Update
addNext(id: any, data: any){
  return this.http
    .post(this.API_URL+'/addNext-Student/'+id, data[0], httpOptions)
    
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
  
  getAllCol(){
    return this.http.get(this.API_URL+'/all-Column');
  }

  addColumn(addNew:any){
    return this.http.post(this.API_URL+'/add-Column',addNew, httpOptions);
      }

  deleteColumn(item:any){

    return this.http.delete(this.API_URL+'/delete-Column/'+item, httpOptions);
      }
            
}

