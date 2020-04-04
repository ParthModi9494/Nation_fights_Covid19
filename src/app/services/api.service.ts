import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DistrictResponseModel } from '../models/table-states.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }


  getDistrictsData(): Observable<DistrictResponseModel[]> {
    return this.http.get<DistrictResponseModel[]>(`${environment.endPointUrl}/v2/state_district_wise.json`);
  }

  getData() {
    return this.http.get(`${environment.endPointUrl}/data.json`);
  }


}
