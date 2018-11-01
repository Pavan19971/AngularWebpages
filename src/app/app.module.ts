import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesComponent } from './services/services.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { Ng5SliderModule } from 'ng5-slider';
import { FormsModule } from '@angular/forms';

import {DataService} from './data.service';
import { BusFilterPipe } from './bus-filter.pipe';
import { BoardingFilterPipe } from './boarding-filter.pipe';
import { DroppingFilterPipe } from './dropping-filter.pipe';
import { PriceFilterPipe } from './price-filter.pipe'
import {NgxPaginationModule} from 'ngx-pagination'; 
@NgModule({
  declarations: [
    AppComponent,
    ServicesComponent,
    NavComponent,
    BusFilterPipe,
    BoardingFilterPipe,
    DroppingFilterPipe,
    PriceFilterPipe
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    Ng5SliderModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule

  ],
  providers: [
    DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
