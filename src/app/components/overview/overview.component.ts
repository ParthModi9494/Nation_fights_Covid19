import { Component, OnInit } from '@angular/core';
import { faSadTear, faSmile, faProcedures, faNotesMedical } from '@fortawesome/free-solid-svg-icons';

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
  constructor() { }

  ngOnInit(): void {
  }

}
