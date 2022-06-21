import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit, ViewEncapsulation} from '@angular/core';
import { VirtualScrollService, TreeGridComponent, EditSettingsModel, ToolbarItems , EditService, ToolbarService, Column, checkboxChange  } from '@syncfusion/ej2-angular-treegrid';
import { ApiService } from './services/api.service';
import {PageSettingsModel, SortSettingsModel } from '@syncfusion/ej2-angular-treegrid';
import { DataSourceChangedEventArgs, dialogDestroy, DialogEditEventArgs, GridComponent, parentsUntil } from '@syncfusion/ej2-angular-grids';
import { Dialog } from '@syncfusion/ej2-popups';
import { SocketioService } from './socketio.service';
import { ContextMenuComponent, MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { ChangeEventArgs, DropDownList } from '@syncfusion/ej2-angular-dropdowns';
import { DialogUtility } from '@syncfusion/ej2-popups';
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
  public editSettings1!: EditSettingsModel;
  public toolbar!: ToolbarItems[];
  public toolbar1!: ToolbarItems[];

  public editOptions!: Object;
  public editOptions1!: Object;
  public formatOptions!: Object;
  public contextMenuItems!: Object[];
  public selectionSettings!: Object;
  public contextMenuSettings: any;
  @ViewChild('treegrid')
  public treegrid!: TreeGridComponent;
  public d1data!: Object;
  public filterSettings!: Object;
  public filterBarTemplate!: Object;
  dropDownFilter: any;
  treeGridObj: any;
  public orderidrules!: Object;
  public customeridrules!: Object;
  public freightrules!: Object;
  public modal: boolean = true;
  public inputEle:any;
  constructor(private api : ApiService , private http : HttpClient ,private socketService: SocketioService){ 
    this.contextMenuSettings = {
      showContextMenu: true,
      contextMenuItems: ["add", "edit", "delete"]
  }
  }
  ngOnInit(): void {
  
          this.api.getAll().subscribe((res:any)=>{
            // this.data =res;
            this.data = res.filter((item: any) => item);
            console.log("data",this.data)
          })
          this.selectionSettings = { type: 'Multiple' };

          this.sortSettings = { columns: [{ field: 'taskName', direction: 'Ascending' }, { field: 'taskID', direction: 'Descending' }]  };
          this.pageSettings = { pageSize: 6 };
          this.editOptions = { params: { format: 'y/M/d' } };
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel','Search'];
        this.toolbar1 = ['Add', 'Edit'];
        this.editSettings1 = { allowEditing: true, allowAdding: true, mode: 'Dialog' };

        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true };
        this.freightrules = { required: true };
        this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending','Edit', 'Delete', 'Save', 'Cancel', 'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage', 'LastPage', 'NextPage'];
        this.selectionSettings = { type: 'Multiple' };
        this.socketService.setupSocketConnection();

        // filter setting 
        this.filterSettings = { type: 'FilterBar', hierarchyMode: 'Parent', mode: 'Immediate' };
        //filter functioning 
        this.filterBarTemplate = {
          create: (args: { element: Element, column: Column }) => {
              let dd: HTMLInputElement = document.createElement('input');
              dd.id = 'duration';
              return dd;
          },
          write: (args: { element: Element, column: Column }) => {
              let dataSource: string[] = ['All', '1', '3', '4', '5', '6', '8', '9'];
              this.dropDownFilter = new DropDownList({
                  dataSource: dataSource,
                  value: 'All',
                  change: (e: ChangeEventArgs) => {
                      let valuenum: any = +e.value;
                      let id: any = <string>this.dropDownFilter.element.id;
                      let value: any = <string>e.value;
                      if ( value !== 'All') {
                          this.treeGridObj.filterByColumn( id, 'equal', valuenum );
                      } else {
                          this.treeGridObj.removeFilteredColsByField(id);
                      }
                  }
              });
              this.dropDownFilter.appendTo('#duration');
          }
      }
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
    console.log("add")
    this.onOpenDialog()
  }
  if(args.item.text === 'Edit Column') {
    console.log("edit")
    this.onOpenDialogEdit()
  }
  if(args.item.text === 'View Column') {
    console.log("view")
    this.onOpenDialogView()
   }
   
}


  public itemBeforeEvent(args: MenuEventArgs) {
    if (args.item.text !== 'Edit') {
      let shortCutSpan: HTMLElement = document.createElement('span');
      let text: string = args.item.text!;
      args.element.textContent = '';

      this.inputEle = document.createElement('input');
      this.inputEle.type = 'checkbox';
      this.inputEle.setAttribute('class', 'e-checkbox');
      shortCutSpan.innerText = text;

      args.element.appendChild(this.inputEle);
      args.element.appendChild(shortCutSpan);
    }
    if(this.inputEle?.checked)
    {
      console.log("checked")
      this.onOpenDialog()
    }
    if(args.item.text == 'Hide column')
    {
      let inputEle = document.createElement('input');
      inputEle.type = 'checkbox';
      inputEle.setAttribute('class', 'e-column');
      args.element.appendChild(inputEle);

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
        console.log("checked")
      } else {
        alert('Select any row');
      }
    }
    this.selectitem = args.item.text;
   if(args.item.text === "Hide Column") {
     this.grid.getColumnByField('name').visible =false;
   }
   if(args.item.text === 'UnHide Column') {
    this.grid.getColumnByField('name').visible =true;
  }
  if(args.item.text === 'Add Column' && checkbox?.checked) {
    console.log("add column ")
    this.onOpenDialog();
  }
  if(args.item.text === 'Edit Column') {
    this.grid.getColumnByField('name').visible =true;
  }
  if(args.item.text === 'View Column') {
     this.grid.getColumnByField('name').visible = false;
     this.grid.refreshColumns();
   }
  }

  public DialogObj!: { hide: () => void; };
  public onOpenDialog = (): void => {
    this.DialogObj = DialogUtility.confirm({
    title: 'Add Column Details',
    content: `
  <input type="text" id="form12" class="form-control" placeholder="Column Name" />
  <br><br>
  <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
  <a class="dropdown-item" href="#">Number</a>
  <a class="dropdown-item" href="#">String action</a>
  <a class="dropdown-item" href="#">Boolean</a>
  </div>
  <div class="dropdown-menu">
  <a class="dropdown-item" href="#">Regular link</a>
  <a class="dropdown-item active" href="#">Active link</a>
  <a class="dropdown-item" href="#">Another link</a>
</div>
</div>
    `,
    okButton: {  text: 'OK' },
    cancelButton: {  text: 'Cancel', click: this.cancelClick.bind(this) },
    showCloseIcon: true,
    closeOnEscape: true,
    animationSettings: { effect: 'Zoom' }
});
}
private okClick(): void {
    alert('you clicked OK button');
}

private cancelClick(): void {
    //Hide the dialog
    this.DialogObj.hide();
}
public onOpenDialogEdit = (): void => {
  this.DialogObj = DialogUtility.confirm({
  title: 'Edit Column Details',
  content: `
<input type="text" id="form12" class="form-control" placeholder="Column Name" />
<br><br>
<div class="dropdown">
<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  Dropdown button
</button>
<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
<a class="dropdown-item" href="#">Number</a>
<a class="dropdown-item" href="#">String action</a>
<a class="dropdown-item" href="#">Boolean</a>
</div>
<div class="dropdown-menu">
<a class="dropdown-item" href="#">Regular link</a>
<a class="dropdown-item active" href="#">Active link</a>
<a class="dropdown-item" href="#">Another link</a>
</div>
</div>
  `,
  okButton: {  text: 'OK' },
  cancelButton: {  text: 'Cancel', click: this.cancelClick.bind(this) },
  showCloseIcon: true,
  closeOnEscape: true,
  animationSettings: { effect: 'Zoom' }
});
}public onOpenDialogView = (): void => {
  this.DialogObj = DialogUtility.confirm({
  title: 'View Details',
  content: `
<ejs-treegrid [dataSource]='data'></ejs-treegrid>
  `,
  okButton: {  text: 'OK', click: this.okClick.bind(this) },
  cancelButton: {  text: 'Cancel', click: this.cancelClick.bind(this) },
  showCloseIcon: true,
  closeOnEscape: true,
  animationSettings: { effect: 'Zoom' }
});
}
} 

