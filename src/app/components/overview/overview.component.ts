import { Component, OnInit } from '@angular/core';
import { faSadTear, faSmile, faProcedures, faNotesMedical } from '@fortawesome/free-solid-svg-icons';
import { DataProiderService } from 'src/app/services/data-proider.service';
import { StateModel } from 'src/app/models/table-states.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  faSadTear = faSadTear;
  faSmile = faSmile;
  faProcedures = faProcedures;
  faNotesMedical = faNotesMedical;
  aggregated: StateModel;
  constructor(
    private dataProvider: DataProiderService
  ) { }

  ngOnInit(): void {
    this.dataProvider.aggregated.subscribe((aggregatedData) => {
      this.aggregated = aggregatedData;
    });
  }


  getTime(date){
    return this.dataProvider.getTime(date);
  }

}
