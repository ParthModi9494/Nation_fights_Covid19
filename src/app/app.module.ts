import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OverviewComponent } from './components/overview/overview.component';
import { StatesTableComponent } from './components/states-table/states-table.component';
import { TimeSeriesChartsComponent } from './components/time-series-charts/time-series-charts.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    OverviewComponent,
    StatesTableComponent,
    MapComponent,
    TimeSeriesChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule,
    FontAwesomeModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
