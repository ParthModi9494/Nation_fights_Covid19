import { Injectable } from '@angular/core';
import { DistrictResponseModel, StateModel } from '../models/table-states.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataProiderService {
  statesArr = new Subject<StateModel[]>();
  districtsArr = new Subject<DistrictResponseModel[]>();
  aggregated = new Subject<StateModel>();
  aggregatedDelta;

  constructor() { }
}
