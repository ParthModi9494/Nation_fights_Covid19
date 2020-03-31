import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data: any;
  countryData = [];
  statewiseArr = [];
  constructor(
    private apiService: ApiService
  ) { }
  ngOnInit() {
    this.apiService.getStatWiseData().subscribe((country) => {
      console.log(country);
      for (const state in country) {
        const districts = [];
        for (const district in country[state].districtData) {
          districts.push({ district, data: country[state].districtData[district] });
        }
        this.countryData.push({ state: state, districts: districts });
      }
    })

    this.apiService.getData().subscribe((data: any) => {
      let statewiseArr = [];
      statewiseArr = [...data.statewise].sort((a, b) => {
        return b.confirmed - a.confirmed;
      });
      this.statewiseArr = statewiseArr;
      console.log("statewiseArr", statewiseArr);
    })
  }


}
