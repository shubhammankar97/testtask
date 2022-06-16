import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { PageService, SortService, FilterService } from '@syncfusion/ej2-angular-treegrid';
import { AppComponent } from './app.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { SocketioService } from './socketio.service';
import { CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';
// import { IgxPreventDocumentScrollModule } from "./directives/prevent-scroll.directive";
import { IgxTreeGridModule } from "igniteui-angular";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxDropDownModule, IgxToggleModule } from 'igniteui-angular';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    TreeGridModule,
    GridModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonModule,
    DropDownListAllModule,
    CheckBoxAllModule,
    // IgxPreventDocumentScrollModule,
    IgxTreeGridModule,
    BrowserAnimationsModule, CommonModule, IgxDropDownModule, IgxToggleModule
  ],
  providers: [ApiService, PageService, SortService, FilterService, SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
