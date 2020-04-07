import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options } from 'highcharts';
import { DataProiderService } from 'src/app/services/data-proider.service';
import { CasesTimeSeries } from 'src/app/models/cases-time-series.model';
@Component({
  selector: 'app-time-series-charts',
  templateUrl: './time-series-charts.component.html',
  styleUrls: ['./time-series-charts.component.scss']
})
export class TimeSeriesChartsComponent implements OnInit {
  Highcharts = Highcharts; // required
  confirmedCasesChartOptions: Options;
  recoveredCasesChartOptions: Options;
  deceasedCasesChartOptions: Options;
  timeseries: CasesTimeSeries[] = [];

  dailyConfirmedCases: number[] = [];
  dailyRecoveredCases: number[] = [];
  dailyDeceasedCases: number[] = [];

  totalConfirmedCases: number[] = [];
  totalRecoveredCases: number[] = [];
  TotalDeceasesCases: number[] = [];
  daily = false;
  dates: string[] = [];
  constructor(
    private dataProvider: DataProiderService
  ) { }

  ngOnInit(): void {
    this.dataProvider.casesTimeSeries.subscribe((timeseries: CasesTimeSeries[]) => {
      this.dailyConfirmedCases = timeseries.map((x) => { return Number(x.dailyconfirmed) });
      this.dailyRecoveredCases = timeseries.map((x) => { return Number(x.dailyrecovered) });
      this.dailyDeceasedCases = timeseries.map((x) => { return Number(x.dailydeceased) });

      this.totalConfirmedCases = timeseries.map((x) => { return Number(x.totalconfirmed) });
      this.totalRecoveredCases = timeseries.map((x) => { return Number(x.totalrecovered) });
      this.TotalDeceasesCases = timeseries.map((x) => { return Number(x.totaldeceased) });

      this.dates = timeseries.map((x) => { return x.date });

      this.setConfirmedChartOptions();
      this.setRecoveredChartOptions();
      this.setDeceasedChartOptions();
    })
  }

  setDeceasedChartOptions() {
    this.deceasedCasesChartOptions = {
      chart: {
        borderRadius: 10,
        type: 'spline',
        backgroundColor: "hsla(0, 0%, 21%,0.1)"
      },
      title: {
        style: {
          color: "hsl(0, 0%, 21%)"
        },
        text: 'Deceased Cases'
      },
      xAxis:
      {
        categories: this.dates
      },
      yAxis: {
        title: {
          text: 'Cases'
        }
      },
      plotOptions: {
        spline: {
          color: "hsl(0, 0%, 21%)"
        }
      },
      series: [
        {
          data: this.daily ? this.dailyDeceasedCases : this.TotalDeceasesCases,
          type: 'spline',
          name: "Deacesed",
          marker: {
            enabled: true,
            radius: 1
          }
        }
      ]
    }
  }
  setRecoveredChartOptions() {

    this.recoveredCasesChartOptions = {
      chart: {
        borderRadius: 10,
        type: 'spline',
        backgroundColor: "hsla(141, 53%, 53%,0.1)"
      },
      title: {
        style: {
          color: "hsl(141, 53%, 53%)"
        },
        text: 'Recovered Cases'
      },
      xAxis:
      {
        categories: this.dates
      },
      yAxis: {
        title: {
          text: 'Cases'
        }
      },
      plotOptions: {
        spline: {
          color: "hsl(141, 53%, 53%)"
        }
      },
      series: [
        {
          data: this.daily ? this.dailyRecoveredCases : this.totalRecoveredCases,
          type: 'spline',
          name: "Recovered",
          marker: {
            enabled: true,
            radius: 1
          }
        }
      ]
    };
  }

  setConfirmedChartOptions() {
    this.confirmedCasesChartOptions = {
      chart: {
        borderRadius: 10,
        type: 'spline',
        backgroundColor: "hsla(348, 100%, 61%,0.1)"
      },
      title: {
        style: {
          color: "hsl(348, 100%, 61%)"
        },
        text: 'Confirmed Cases'
      },
      xAxis:
      {
        categories: this.dates
      },
      yAxis: {
        title: {
          text: 'Cases'
        }
      },
      plotOptions: {
        spline: {
          color: "hsl(348, 100%, 61%)"
        }
      },
      series: [
        {
          data: this.daily ? this.dailyConfirmedCases : this.totalConfirmedCases,
          type: 'spline',
          name: "Confirmed",
          marker: {
            enabled: true,
            radius: 1
          }
        }
      ]
    };
  }
  loadDailyData() {
    this.daily = true;
    this.setConfirmedChartOptions();
    this.setRecoveredChartOptions();
    this.setDeceasedChartOptions();
  }

  loadCumulativeData() {
    console.log("cumulative");
    this.daily = false;
    this.setConfirmedChartOptions();
    this.setRecoveredChartOptions();
    this.setDeceasedChartOptions();
  }

}
