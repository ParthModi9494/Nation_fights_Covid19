import { Injectable } from '@angular/core';
import { DistrictResponseModel, StateModel } from '../models/table-states.model';
import { Subject } from 'rxjs';
import { CasesTimeSeries } from '../models/cases-time-series.model';
import * as moment from 'moment/moment.js';

@Injectable({
  providedIn: 'root'
})
export class DataProiderService {
  statesArr = new Subject<StateModel[]>();
  districtsArr = new Subject<DistrictResponseModel[]>();
  aggregated = new Subject<StateModel>();
  casesTimeSeries = new Subject<CasesTimeSeries[]>();
  aggregatedDelta;

  constructor() { }

  getTime(date) {
    if (date) {
      return `Last updated ${moment(date, "DD/MM/YYYY HH:mm:ss").fromNow()}`;
    } else {
      return "";
    }
  }
}
