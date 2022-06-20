import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit, ViewEncapsulation} from '@angular/core';
import { VirtualScrollService, TreeGridComponent, EditSettingsModel, ToolbarItems , EditService, ToolbarService  } from '@syncfusion/ej2-angular-treegrid';
import { ApiService } from './services/api.service';
import {PageSettingsModel, SortSettingsModel } from '@syncfusion/ej2-angular-treegrid';
import { DataSourceChangedEventArgs, dialogDestroy, DialogEditEventArgs, GridComponent, parentsUntil } from '@syncfusion/ej2-angular-grids';
import { Dialog } from '@syncfusion/ej2-popups';
import { SocketioService } from './socketio.service';
import { ContextMenuComponent, MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-angular-navigations';

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
  public contextMenuSettings: any;
  @ViewChild('treegrid')
  public treegrid!: TreeGridComponent;
  public d1data!: Object;

  
  constructor(private api : ApiService , private http : HttpClient ,private socketService: SocketioService){ 
    this.contextMenuSettings = {
      showContextMenu: true,
      contextMenuItems: ["add", "edit", "delete"]
  }
  }
  ngOnInit(): void {
  
          this.api.getAll().subscribe((res:any)=>{
            this.data =res;
            // this.data = res.filter((item: any) => item);
            console.log("data",this.data)
          })
          this.selectionSettings = { type: 'Multiple' };

          this.sortSettings = { columns: [{ field: 'taskName', direction: 'Ascending' }, { field: 'taskID', direction: 'Descending' }]  };
          this.pageSettings = { pageSize: 6 };
          this.editOptions = { params: { format: 'y/M/d' } };
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];

        this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending','Edit', 'Delete', 'Save', 'Cancel', 'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage', 'LastPage', 'NextPage'];
        this.selectionSettings = { type: 'Multiple' };
        this.socketService.setupSocketConnection();
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
   
        public editing!: EditSettingsModel;
   
     getVal(asdasd:any){
alert(asdasd)
     }

public dataSourceChanged(dataSourceChangedEvent: DataSourceChangedEventArgs):void{
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
  if(dataSourceChangedEvent.requestType === "delete")
  { 
    var getId:any = dataSourceChangedEvent.data;
    this.api.deleteRecord(dataSourceChangedEvent,getId.id).subscribe(()=>{
      dataSourceChangedEvent.endEdit
    })
  }
  
}

public headermenuItems: MenuItemModel[] = [ 
  { 
      text: 'Hide Column', 
      id:'hide' 
  }, 
  { 
      text: 'UnHide Column', 
      id:'unhide' 
  }, 
  { 
      text: 'Add Column', 
      id:'addCol' 
  }, 
  { 
      text: 'Edit Column', 
      id:'editCol' 
  }, 
  { 
      text: 'View Column', 
      id:'viewCol' 
  }

  ]; 

beforeOpen(args:any): void { 
  this.headercontextmenu.showItems(['Sort Column', 'Clear Sort', 'UnHide Column', 'Hide Column']); 
  if (parentsUntil(args.event.target, 'first', true)) {   // checks  the grid id with the target element’s parent until it matches with the id. 
    if (this.grid.getColumnByField('name').visible == true) { 
      this.headercontextmenu.hideItems(['UnHide Column', 'Sort Column', 'Clear Sort']); 
    } 
    else { 
      this.headercontextmenu.hideItems(['Hide Column', 'Sort Column', 'Clear Sort']); 
      this.headercontextmenu.showItems(['UnHide Column']); 
    } 
  } else { 
    this.headercontextmenu.hideItems(['UnHide Column', 'Hide Column']); 
    this.headercontextmenu.showItems(['Sort Column', 'Clear Sort']); 
  } 

} 

select(args:any):void {
  //debugger
  this.selectitem = args.item.text;
   if(args.item.text === "Hide Column") {
     this.grid.getColumnByField('name').visible =false;
   }
   if(args.item.text === 'UnHide Column') {
    this.grid.getColumnByField('name').visible =true;
  }
  if(args.item.text === 'Add Column') {
    this.grid.addRecord()
  }
  if(args.item.text === 'Edit Column') {
    this.grid.getColumnByField('name').visible =true;
  }
  if(args.item.text === 'View Column') {
     this.grid.getColumnByField('name').visible = false;
     this.grid.refreshColumns();
   }
   
}


  public itemBeforeEvent(args: MenuEventArgs) {
    if (args.item.text !== 'Edit') {
      let shortCutSpan: HTMLElement = document.createElement('span');
      let text: string = args.item.text!;
      args.element.textContent = '';

      let inputEle = document.createElement('input');
      inputEle.type = 'checkbox';
      inputEle.setAttribute('class', 'e-checkbox');
      shortCutSpan.innerText = text;

      args.element.appendChild(inputEle);
      args.element.appendChild(shortCutSpan);
    }
  }

  onSelect(args:any) {
    if (
      !args.event.target.classList.contains('e-checkbox') &&
      args.item.text !== 'Edit'
    ) {
      var checkbox = args.element.querySelector('.e-checkbox');
      checkbox.checked = !checkbox.checked;
    }

    if (args.item.text === 'Edit') {
      if (this.grid.getSelectedRecords().length) {
        this.grid.startEdit();
      } else {
        alert('Select any row');
      }
    }
  }
  
} 

