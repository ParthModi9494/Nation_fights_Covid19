import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import * as Highcharts from 'highcharts';
import * as moment from 'moment/moment.js';
import { StateModel } from './models/table-states.model';
import { DataProiderService } from './services/data-proider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data: any;
  countryData = [];
  statewiseArr = [];
  highcharts = Highcharts;
  generalStats;

  confirmedPatientChartOptions;
  recoveredPatientsChartOptions;
  deceasedPatientsChartOptions;
  constructor(
    private apiService: ApiService,
    private dataProvider: DataProiderService
  ) { }
  ngOnInit() {
    this.apiService.getData().subscribe((data: any) => {
      const stateArr: StateModel[] = data.statewise;
      const sortedStatesArr = stateArr.sort((a, b) => {
        return Number[b.confirmed] - Number[a.confirmed];
      });
      console.log("sortedStatesArr", sortedStatesArr);
      const index = sortedStatesArr.findIndex((x) => {
        return x.state === "Total";
      });
      this.dataProvider.statesArr.next(sortedStatesArr);
      this.dataProvider.aggregated.next(sortedStatesArr[index]);
      this.dataProvider.casesTimeSeries.next(data.cases_time_series);
      sortedStatesArr.splice(index, 1);
    });
  }

  setChartData(data) {
    const timeSeries = [...data.cases_time_series];
    this.confirmedPatientChartOptions = {

      chart: {
        type: "spline",
        backgroundColor: "hsla(348, 100%, 61%,0.2)",
        borderRadius: "10px"
      },
      title: {
        text: "Confirmed Patients"
      },
      xAxis: {
        categories: timeSeries.map((x) => {
          return x.date;
        })
      },
      yAxis: {
        title: {
          text: "Patients"
        }
      },
      series: [{
        color: 'hsl(348, 100%, 61%)',
        name: 'Confirmed Patients',
        data: timeSeries.map((x) => {
          return Number(x.totalconfirmed);
        })
      }]
    };
    this.recoveredPatientsChartOptions = {
      chart: {
        type: "spline",
        backgroundColor: "hsla(171, 100%, 41%,0.2)",
        borderRadius: "10px",
      },
      title: {
        text: "Recovered Patients"
      },
      xAxis: {
        categories: timeSeries.map((x) => {
          return x.date;
        })
      },
      yAxis: {
        title: {
          text: "Patients"
        }
      },
      series: [{
        color: "hsl(171, 100%, 41%)",
        name: 'Recovered Patients',
        data: timeSeries.map((x) => {
          return Number(x.totalrecovered);
        })
      }]
    };

    this.deceasedPatientsChartOptions = {
      chart: {
        type: "spline",
        backgroundColor: "hsla(0, 0%, 48%,0.2)",
        borderRadius: "10px"
      },
      title: {
        text: "Deceased Patients"
      },
      xAxis: {
        categories: timeSeries.map((x) => {
          return x.date;
        })
      },
      yAxis: {
        title: {
          text: "Patients"
        }
      },
      series: [{
        color: "hsl(0, 0%, 48%)",
        name: 'Deceased Patients',
        data: timeSeries.map((x) => {
          return Number(x.totaldeceased);
        })
      }]
    };
  }

  getUpdatedTime(date) {
    if (date) {
      // return moment(moment(date).format("DD/MM/YYYY HH:mm:ss")).fromNow();
    } else {
      return "";
    }
  }


}
