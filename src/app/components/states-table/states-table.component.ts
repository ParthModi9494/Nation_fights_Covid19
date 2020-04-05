import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { StateModel } from '../../models/table-states.model';
import { faPlusSquare, faMinusSquare, IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { DistrictResponseModel } from '../../models/table-states.model';
import { DataProiderService } from 'src/app/services/data-proider.service';
import * as moment from 'moment/moment.js';

@Component({
  selector: 'app-states-table',
  templateUrl: './states-table.component.html',
  styleUrls: ['./states-table.component.scss']
})
export class StatesTableComponent implements OnInit {
  plus: IconDefinition = faPlusSquare;
  minus: IconDefinition = faMinusSquare;
  districtsArr: DistrictResponseModel[] = [];
  statesArr: StateModel[] = [];
  aggregated: StateModel;
  tableHeaders = {
    desktop: ["States / UT", "Confirmed", "Active", "Recovered", "Deaths"],
    mobile: ["States / UT", "CNFMD", "ACTV", "RCVRD", "DTHS"],
  };
  constructor(
    private apiService: ApiService,
    private dataProvider: DataProiderService
  ) {
  }

  ngOnInit(): void {

    this.dataProvider.statesArr.subscribe((statesArr) => {
      this.statesArr = statesArr || [];
    });
    this.dataProvider.aggregated.subscribe((aggregated) => {
      this.aggregated = aggregated;
    });

    this.apiService.getDistrictsData().subscribe((districts: DistrictResponseModel[]) => {
      districts = districts || [];
      this.districtsArr = districts;
      this.dataProvider.districtsArr.next(districts);
    });


  }

  toggleState(state: StateModel) {
    state.isSelected = !state.isSelected;
  }

  getDistricts(stateName: string) {
    const stateObj = this.districtsArr.find((stateObj) => {
      return stateObj.state == stateName;
    })
    return stateObj?.districtData || [];
  }

  getTime(date){
    if (date) {
      return  `Last updated ${moment(date,"DD/MM/YYYY HH:mm:ss").fromNow()}`;
    } else {
      return "";
    }
  }


}
