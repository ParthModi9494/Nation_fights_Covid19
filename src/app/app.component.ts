import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import * as Highcharts from 'highcharts';
import * as moment from 'moment/moment.js';
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
    private apiService: ApiService
  ) { }
  ngOnInit() {
    this.apiService.getStatWiseData().subscribe((country) => {
      this.setStateData(country);
    })

    this.apiService.getData().subscribe((data: any) => {
      this.setTableData(data);
      this.setChartData(data);
    })
  }



  setStateData(country) {
    for (const state in country) {
      const districts = [];
      for (const district in country[state].districtData) {
        districts.push({ district, data: country[state].districtData[district] });
      }
      this.countryData.push({ state: state, districts: districts });
    }
  }

  setTableData(data) {
    this.statewiseArr = [...data.statewise].sort((a, b) => {
      return b.confirmed - a.confirmed;
    });
    console.log("states", this.statewiseArr);
    this.generalStats = this.statewiseArr.find((x) => {
      return x.state === "Total";
    })
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
    if(date){
      return moment(moment(date).format("DD/MM/YYYY HH:mm:ss")).fromNow();
    } else {
      return "";
    }
  }


}
