import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StartComponent } from './start/start.component';
import { PickerComponent } from './picker/picker.component';
import { HttpService } from './http.service';
import { ChosenComponent } from './chosen/chosen.component';

@NgModule({
  declarations: [
    AppComponent,
    PickerComponent,
    StartComponent,
    ChosenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
