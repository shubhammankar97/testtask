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

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get('http://localhost:3000/all-Student');
  }

  deleteData(item:any){
    return this.http.delete('http://localhost:3000/delete-Student/',item)
  }
  addData(addNew:any){
    return this.http.post('http://localhost:3000/add-Student',addNew)
  }

  addRecord(dataSourceChangedEvent: DataSourceChangedEventArgs){
return this.http.post('http://localhost:3000/add-Student',dataSourceChangedEvent.data, httpOptions);
  }
  updateRecord(dataSourceChangedEvent: DataSourceChangedEventArgs,id:any){
  
    return this.http.put('http://localhost:3000/update-Student/'+id,dataSourceChangedEvent.data, httpOptions);
      }
      deleteRecord(state:any,id:any){
  
        return this.http.delete('http://localhost:3000/delete-Student/'+state.data[0].id, httpOptions);
          }
}

