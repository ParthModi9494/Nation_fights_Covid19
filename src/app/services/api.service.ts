import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }


  getStatWiseData(): Observable<any> {
    return this.http.get(`${environment.endPointUrl}/state_district_wise.json`);
  }

  getData(){
    return this.http.get(`${environment.endPointUrl}/data.json`);
  }


}
