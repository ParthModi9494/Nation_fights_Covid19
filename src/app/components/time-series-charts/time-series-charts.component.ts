import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, BaseChartDirective, Color } from 'ng2-charts';
import { CasesTimeSeries } from 'src/app/models/cases-time-series.model';
import { DataProiderService } from 'src/app/services/data-proider.service';
@Component({
  selector: 'app-time-series-charts',
  templateUrl: './time-series-charts.component.html',
  styleUrls: ['./time-series-charts.component.scss']
})
export class TimeSeriesChartsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  timeseries: CasesTimeSeries[] = [];
  dailyConfirmedCases: number[] = [];
  dailyRecoveredCases: number[] = [];
  dailyDeceasedCases: number[] = [];

  totalConfirmedCases: number[] = [];
  totalRecoveredCases: number[] = [];
  totalDeceasedCases: number[] = [];
  dates: string[] = [];

  daily = false;

  lineChartLabels: Label[] = [];
  confirmedChartOptions: ChartOptions = this.setDefaultChartOptions("Confirmed");
  recoveredChartOptions: ChartOptions = this.setDefaultChartOptions("Recovered");
  deceasedChartOptions: ChartOptions = this.setDefaultChartOptions("Deceased");

  confirmedChartData: ChartDataSets[] = [this.createConfirmedDataSet()];
  recoveredChartData: ChartDataSets[] = [this.createRecoveredDataSet()];
  deceasedChartData: ChartDataSets[] = [this.createDeceasedDataSet()];
  lineChartType = "line";
  lineChartLegend = false;

  constructor(
    private dataProvider: DataProiderService
  ) { }

  createConfirmedDataSet(): ChartDataSets {
    return {
      data: this.daily ? this.dailyConfirmedCases : this.totalConfirmedCases,
      label: "Confirmed",
      borderColor: "hsl(348, 100%, 61%)",
      backgroundColor: "hsla(348, 100%, 61%,0.4)"
    }
  }

  createRecoveredDataSet(): ChartDataSets {
    return {
      data: this.daily ? this.dailyRecoveredCases : this.totalRecoveredCases,
      label: "Recovered",
      borderColor: "hsl(141, 53%, 53%)",
      backgroundColor: "hsla(141, 53%, 53%,0.4)",
    }
  }

  createDeceasedDataSet(): ChartDataSets {
    return {
      data: this.daily ? this.dailyDeceasedCases : this.totalDeceasedCases,
      label: "Deceased",
      borderColor: "hsl(0, 0%, 71%)",
      backgroundColor: "hsla(0, 0%, 71%,0.4)"
    }
  }

  ngOnInit(): void {
    this.dataProvider.casesTimeSeries.subscribe((timeseries: CasesTimeSeries[]) => {
      this.dailyConfirmedCases = timeseries.map((x) => { return Number(x.dailyconfirmed) });
      this.dailyRecoveredCases = timeseries.map((x) => { return Number(x.dailyrecovered) });
      this.dailyDeceasedCases = timeseries.map((x) => { return Number(x.dailydeceased) });

      this.totalConfirmedCases = timeseries.map((x) => { return Number(x.totalconfirmed) });
      this.totalRecoveredCases = timeseries.map((x) => { return Number(x.totalrecovered) });
      this.totalDeceasedCases = timeseries.map((x) => { return Number(x.totaldeceased) });

      this.dates = timeseries.map((x) => { return x.date });
      this.lineChartLabels = this.dates;

      this.confirmedChartData.pop();
      this.confirmedChartData.push(this.createConfirmedDataSet());

      this.recoveredChartData.pop();
      this.recoveredChartData.push(this.createRecoveredDataSet());

      this.deceasedChartData.pop();
      this.deceasedChartData.push(this.createDeceasedDataSet());
    })
  }

  setDefaultChartOptions(text: string): ChartOptions {
    return {
      title: {
        text: text,
        display: true
      },
      responsive: true,
      scales: {
        xAxes: [{
          ticks: {
            fontSize: 10
          },
          gridLines: {
            display: true
          }
        }],
        yAxes: [{
          ticks: {
            fontSize: 10,
          },
          gridLines: {
            display: true
          }
        }],
      }
    }
  }


  loadDailyData() {
    this.daily = true;
    this.lineChartType = "bar";

    this.confirmedChartData.pop();
    this.confirmedChartData.push(this.createConfirmedDataSet());

    this.recoveredChartData.pop();
    this.recoveredChartData.push(this.createRecoveredDataSet());

    this.deceasedChartData.pop();
    this.deceasedChartData.push(this.createDeceasedDataSet());

  }

  loadCumulativeData() {
    this.daily = false;
    this.lineChartType = "line";

    this.confirmedChartData.pop();
    this.confirmedChartData.push(this.createConfirmedDataSet());

    this.recoveredChartData.pop();
    this.recoveredChartData.push(this.createRecoveredDataSet());

    this.deceasedChartData.pop();
    this.deceasedChartData.push(this.createDeceasedDataSet());
  }

}
