import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit, ViewEncapsulation} from '@angular/core';
import { VirtualScrollService, TreeGridComponent, EditSettingsModel, ToolbarItems , EditService, ToolbarService  } from '@syncfusion/ej2-angular-treegrid';
import { ApiService } from './services/api.service';
import {PageSettingsModel, SortSettingsModel } from '@syncfusion/ej2-angular-treegrid';
import { DataSourceChangedEventArgs, dialogDestroy, DialogEditEventArgs, GridComponent } from '@syncfusion/ej2-angular-grids';
import { Dialog } from '@syncfusion/ej2-popups';
import { SocketioService } from './socketio.service';
import { ContextMenuComponent, MenuItemModel } from '@syncfusion/ej2-angular-navigations';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [EditService, ToolbarService, VirtualScrollService]
})
export class AppComponent {
  title = 'testaskk';
  public data!: Object[];
  public sortSettings!: SortSettingsModel;
  public pageSettings!: PageSettingsModel;
  public editSettings!: EditSettingsModel;
  public toolbar!: ToolbarItems[];
  public editOptions!: Object;
  public formatOptions!: Object;
  public contextMenuItems!: Object[];
  public selectionSettings!: Object;
  
  @ViewChild('treegrid')
  public treegrid!: TreeGridComponent;
  public d1data!: Object;
  

  constructor(private api : ApiService , private http : HttpClient ,private socketService: SocketioService){ }
  ngOnInit(): void {
    this.socketService.setupSocketConnection();
          this.api.getAll().subscribe((res:any)=>{
            this.data = res
          })
          this.selectionSettings = { type: 'Multiple' };

          this.sortSettings = { columns: [{ field: 'taskName', direction: 'Ascending' }, { field: 'taskID', direction: 'Descending' }]  };
          this.pageSettings = { pageSize: 6 };
          this.editOptions = { params: { format: 'y/M/d' } };
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];

        this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending','Edit', 'Delete', 'Save', 'Cancel', 'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage', 'LastPage', 'NextPage'];
        this.selectionSettings = { type: 'Multiple' };
        
        }

        actionComplete(args: DialogEditEventArgs) {
          if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
         
              const dialog = args.dialog as Dialog;
              let getVal = args;
              const TaskName = 'TaskName';
              dialog.height = 400;
              console.log("dialog args val",getVal)
              // dialog.header = args.requestType === 'beginEdit' ? 'Record of ' + args.rowData[TaskName] : 'New Customer';
              args.frozenRightForm;
          }
          
        }
      @ViewChild('grid')
  public grid!: GridComponent;
      @ViewChild('contextmenu')
      public contextmenu!: ContextMenuComponent;
      @ViewChild('headercontextmenu')
      public headercontextmenu!: ContextMenuComponent;
  
       public selectitem! : string[];

      public menuItems: MenuItemModel[] = [
        {
            text: 'Save Grid Changes'
        },
        {
            text: 'Print Preview'
        },
        {
            text: 'Show Summary'
        },
        {
            text: 'Paste'
        }];
         public headermenuItems: MenuItemModel[] = [
        {
            text: 'Hide Column',
            id:'hide'
        },
        {
            text: 'UnHide Column',
            id:'unhide'
        }];
    
        public editing!: EditSettingsModel;
    
    beforeOpen(args:any): void {
       //debugger
       if(this.grid.getColumnByField('ShipCountry').visible == true){
         debugger
         $("unhide").style.display = "none";
         $("hide").style.display = "";
         $("unhide").disabled = true
     this.contextmenu.hideItems(['UnHide Column']);
       }
       else{
         $("hide").style.display = "none"; 
         $("unhide").style.display = "";
       }
      
     }

     getVal(asdasd:any){
alert(asdasd)
     }
        select(args:any):void {
          //debugger
          this.selectitem = args.item.text;
           if(args.item.text === "Save Grid Changes") {
             alert('kjh')
             this.grid.editModule.batchSave();
           }
           if(args.item.text === 'Print Preview') {
            this.grid.print();
          }
          if(args.item.text === 'Show Summary') {
            this.grid.aggregates = [{
            columns: [{
                type: 'Sum',
                field: 'Freight',
                footerTemplate: 'Sum: ${Sum}'
            }]
            }]
          }
          if(args.item.text === 'Hide Column') {
             this.grid.getColumnByField('ShipCountry').visible = false;
             this.grid.refreshColumns();
           }
           if(args.item.text === 'UnHide Column') {
             this.grid.getColumnByField('ShipCountry').visible = true;
             this.grid.refreshColumns();
           }
           if(args.item.text === 'Column background color') {
             (document.getElementsByClassName('e-headercell')[1] as any).style = "background-color: green";
           }
           if(args.item.text === 'Reset color') {
             (document.getElementsByClassName('e-headercell')[1] as any).style.cssText = "";
           }
           if(args.item.text === 'Paste') {
             debugger;
             (document.getElementsByClassName('e-headercell')[1] as any).style.cssText = "";
           }
        }

public dataSourceChanged(dataSourceChangedEvent: DataSourceChangedEventArgs):void{
  console.log(dataSourceChangedEvent.action);
  if(dataSourceChangedEvent.action === "add")
  {
    this.api.addRecord(dataSourceChangedEvent).subscribe(()=>{
      dataSourceChangedEvent.endEdit
    })
  }
  if(dataSourceChangedEvent.action === "edit")
  { 
    var getId:any = dataSourceChangedEvent.data;
    this.api.updateRecord(dataSourceChangedEvent,getId.id).subscribe(()=>{
      dataSourceChangedEvent.endEdit
    })
  }
  
}

}
