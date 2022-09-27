import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DataSourceChangedEventArgs } from "@syncfusion/ej2-angular-grids";
import { Observable } from "rxjs";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};
@Injectable({
  providedIn: "root",
})
export class ApiService {
  [x: string]: any;
  API_URL =  'https://pdptappsensor.elb.cisinlive.com';
  // API_URL = "http://localhost:4001";

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.API_URL + "/all-Student");
  }

  deleteData(item: any) {
    return this.http.delete(
      this.API_URL + "/delete-Student/" + item,
      httpOptions
    );
  }
  addData(addNew: any) {
    console.log("service data", addNew);
    return this.http.post(this.API_URL + "/add-Student", addNew, httpOptions);
  }

  // Update
  updateData(id: any, data: any) {
    return this.http.put(
      this.API_URL + "/update-Student/" + id, data[0], httpOptions);
  }

  //Add Child

  addChildData(addChild: any) {
    console.log("service data", addChild);
    return this.http.post(this.API_URL + "/add-Child", addChild, httpOptions);
  }

  // Add Next

  addNext(data: any) {
    console.log("service data", data);
    return this.http.post(this.API_URL + "/add-Next", data, httpOptions);
  }

  // Move Next

  moveNext(data: any) {
    console.log("service data", data);
    return this.http.post(this.API_URL + "/move-Next", data, httpOptions);
  }
 
  //Add Child

  moveChildData(mChild: any) {
    console.log("service data", mChild);
    return this.http.post(this.API_URL + "/move-Child", mChild, httpOptions);
  }
 
  addRecord(dataSourceChangedEvent: DataSourceChangedEventArgs) {
    return this.http.post(
      this.API_URL + "/add-Student",
      dataSourceChangedEvent.data,
      httpOptions
    );
  }
  updateRecord(dataSourceChangedEvent: DataSourceChangedEventArgs, id: any) {
    return this.http.put(
      this.API_URL + "/update-Student/" + id,
      dataSourceChangedEvent.data,
      httpOptions
    );
  }
  deleteRecord(state: any, id: any) {
    return this.http.delete(
      this.API_URL + "/delete-Student/" + state.data[0].id,
      httpOptions
    );
  }

  getAllCol() {
    return this.http.get(this.API_URL + "/all-Column");
  }

  addColumn(addNew: any) {
    return this.http.post(this.API_URL + "/add-Column", addNew, httpOptions);
  }

  deleteColumn(item: any) {
    return this.http.delete(
      this.API_URL + "/delete-Column/" + item,
      httpOptions
    );
  }
}
