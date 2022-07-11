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
import { ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { IgxTreeGridModule } from "igniteui-angular";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { DialogModule } from '@syncfusion/ej2-angular-popups';

import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ToolbarModule, ToolbarAllModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { IgxButtonModule,	IgxDialogModule, IgxRippleModule } from "igniteui-angular";
import { FreezeService } from '@syncfusion/ej2-angular-treegrid';

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
    ContextMenuModule,
    IgxTreeGridModule,
    BrowserAnimationsModule, CommonModule,
    DialogModule,
    ColorPickerModule,
    NumericTextBoxAllModule,
    TreeGridAllModule,
    ButtonAllModule,
    ToolbarModule, ToolbarAllModule,
    DropDownListModule,
    MultiSelectAllModule,
    IgxButtonModule,	IgxDialogModule, IgxRippleModule
  ],
  providers: [ApiService, PageService, SortService, FilterService, SocketioService, FreezeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
