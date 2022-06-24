import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit, ViewEncapsulation} from '@angular/core';
import { VirtualScrollService, TreeGridComponent, EditSettingsModel, ToolbarItems , EditService, ToolbarService, Column, checkboxChange, SelectionSettingsModel, RowDDService, SelectionService, PageService  } from '@syncfusion/ej2-angular-treegrid';
import { ApiService } from './services/api.service';
import {PageSettingsModel, SortSettingsModel } from '@syncfusion/ej2-angular-treegrid';
import { DataSourceChangedEventArgs, DialogEditEventArgs, GridComponent } from '@syncfusion/ej2-angular-grids';
import { Dialog } from '@syncfusion/ej2-popups';
import { SocketioService } from './socketio.service';
import { ContextMenuComponent, MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { ChangeEventArgs, DropDownList, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ReorderService } from '@syncfusion/ej2-angular-treegrid';
import { ResizeService  } from '@syncfusion/ej2-angular-treegrid';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { IgxDialogComponent, IgxNumberSummaryOperand, IgxSummaryOperand, IgxSummaryResult, IgxTreeGridComponent } from 'igniteui-angular';
import { Student } from './student';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-angular-inputs';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [EditService, ToolbarService, VirtualScrollService, ReorderService, ResizeService, RowDDService, SelectionService, PageService],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'testaskk';
  public data!: Object[];
  public sortSettings!: SortSettingsModel;
  public pageSettings!: PageSettingsModel;
  public editSettings!: EditSettingsModel;
  public selectionSettings!: SelectionSettingsModel;;

  public toolbar!: ToolbarItems[];

  public editOptions!: Object;
  public formatOptions!: Object;
  public selectionOptions!: object;
  public contextMenuSettings: any;


  @ViewChild('treegrid')
  public treeGridObj!: TreeGridComponent;
  @ViewChild('button1')
    public button1!: ButtonComponent;
    @ViewChild('button2')
    public button2!: ButtonComponent;

  public d1data!: Object;
  public filterSettings!: Object;
  public filterBarTemplate!: Object;
 
  public studentidrules!: Object;
  public studentnamerules!: Object;
  public modal: boolean = true;
  public inputEle:any;
  
  public check = this.data?.length<50
 
  customAttributes!: { class: string; };
  public cellIndex!: number;
  @ViewChild('grid')
  public grid!: GridComponent;
      @ViewChild('contextmenu')
      public contextmenu!: ContextMenuComponent;
      @ViewChild('headercontextmenu')
      public headercontextmenu!: ContextMenuComponent;
      @ViewChild('dropdown1')
    public dropdown1!: DropDownListComponent;
  public dropEditSettings!: object;
    @ViewChild('treegrid')
     public DropGrid: any;
     public taskidrules!: Object;
     public tasknamerules!: Object;
     public startdaterules!: Object;
     public durationrules!: Object;
     public edit!: Object;
     public ddlfields!: Object;
     @ViewChild("treeGrid") public treeGrid!: IgxTreeGridComponent;
     @ViewChild("dialogAdd", { read: IgxDialogComponent }) public dialog!: IgxDialogComponent;
     public student!: Student;
     private nextRow!: number;
     public numberSummaries = CustomNumberSummary;

     ///////////////////////////////////////////// 
     public dropDownFilter!: DropDownList;

  public fields!: Object;
  public rowIndex!: number;
  public contextMenuItems!: Object;
  public ColName: string = "";
  columnValue!: number;
  columnField!: string;
  ColAlign: string = "";
  ColMinWidth!: number;
  public showEditColumn: boolean = false;
  public ColType: string = "";
  ColFColor: string = '';
  ColBColor: string = '';
  @ViewChild("treegrid")
  public treegrid!: TreeGridComponent;


  @ViewChild("ejDialog") ejDialog!: DialogComponent;


  public textWrap: boolean = false;

  ColChecked: boolean = false;

  public d2data:any=[];

  public d4data:any=[];

  public d3data:any= [];
//////////////////////////////////////////////////


  constructor(private api : ApiService , private http : HttpClient ,private socketService: SocketioService){ 
    this.contextMenuSettings = {
      showContextMenu: true,
      toolbar : ['Add', 'Edit', 'Delete']
  }
  }
  ngOnInit(): void {
  
          this.api.getAll().subscribe((res:any)=>{
            this.data = res.filter((item: any) => item);
            console.log("data",this.data)
          })
          // this.selectionSettings = { type: 'Multiple', enableToggle:true,  checkboxMode: 'ResetOnRowClick',persistSelection: true};
          this.selectionSettings = {persistSelection: true};
          this.contextMenuItems = [
            { text: 'Edit ', target: '.e-headercontent', id: 'editCol' }];
          this.sortSettings = { columns: [{ field: 'name', direction: 'Ascending' }, { field: 'name', direction: 'Descending' }]  };
          this.pageSettings = { pageSize: 6 };
          this.editOptions = { params: { format: 'y/M/d' } };
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog',  newRowPosition: 'Child', showDeleteConfirmDialog: true};
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel','Search'];
        this.dropEditSettings = {allowEditing: true, allowAdding: true}
        this.selectionOptions = {cellSelectionMode: 'Box', type: 'Multiple', mode: 'dialog',rowSelecting:true};
        this.studentidrules = { required: true, length: 10};
        this.studentnamerules = { required: true};
        // this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending','Edit', 'Delete', 'Save',
        //  'Cancel', 'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage', 'LastPage', 'NextPage',{ text: "EditCol ", target: ".e-headercontent", id: "editCol" },];
        this.customAttributes = {class: 'customcss'};
        this.selectionSettings = { type: 'Multiple' };
        this.socketService.setupSocketConnection();
        (this.d2data = [
          { id: "string", type: "string" },
          { id: "number", type: "number" },
          { id: "boolean", type: "boolean" },
          { id: "datetime", type: "datetime" },
          { id: "date", type: "date" }
        ]);
      
        (this.d3data = [
          { id: "right", type: "Right" },
          { id: "left", type: "Left" },
          { id: "Center", type: "Center" }
        ]);
    
        (this.fields = { text: "type", value: "id" });
      

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
              let dataSource: string[] = ['All', '1', '3', '4', '5', '10', '11', '12'];
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
      this.taskidrules = { required: true, number: true };
    this.tasknamerules = { required: true };
    this.startdaterules = { date: true };
    this.durationrules = { number: true, min: 0 };
    this.edit = { params: { format: 'n' } };
    this.ddlfields = { text: 'name', value: 'id' };
    this.d1data = [
      { id: 'CellEditing', name: 'Cell Editing' },
      { id: 'RowEditing', name: 'Row Editing' },
    ];
      //close of ngOninit
      this.student = new Student();
      this.nextRow = this.data?.length + 1;
/////////////////////////////////////////////////////////
this.contextMenuItems = [
  { text: 'Edit ', target: '.e-headercontent', id: 'editCol' },
];
(this.d2data = [
  { id: "string", type: "string" },
  { id: "number", type: "number" },
  { id: "boolean", type: "boolean" },
  { id: "datetime", type: "datetime" },
  { id: "date", type: "date" }
]);

(this.d3data = [
  { id: "right", type: "Right" },
  { id: "left", type: "Left" },
  { id: "Center", type: "Center" }
]);

(this.fields = { text: "type", value: "id" });
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
      
  
       public selectitem! : string[];

      public menuItems: MenuItemModel[] = [
        {
            text: 'CopyAsNext'
        },
        {
            text: 'CopyAsChild'
        },
        {
            text: 'MoveAsNext'
        },
        {
            text: 'MoveAsChild'
        },
        {
            text: 'AddNext'
        },
        {
            text: 'AddChild'
        },
        {
            text: 'AddParent'
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
  },
  {
      text: 'Delete Column',
      id:'delCol'
  }

  ]; 

beforeOpen(args:any): void { 
  if(this.grid.getColumnByField('roll_no').visible == true){
    debugger
    $("unhide").css.display = "none";
    $("hide").css.display = "";
    //document.getElementById("unhide").disabled = true
//this.contextmenu.hideItems(['UnHide Column']);
  }
  else{
    $("hide").style.display = "none"; 
    $("unhide").style.display = "";
  }
} 

select(args:any):void {
  //debugger
  this.selectitem = args.item.text;
   if(args.item.text === "Hide Column") {
    //  this.grid.getColumnByField('name').visible =false;
    //  this.hide()
    this.treegrid.hideColumns('Student Name')
    // this.treeGridObj.hideColumns('Student Name', 'Roll Number');

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
  if(args.item.text === 'Delete Column')
  {
    console.log("delete")
    this.onOpenDialogDelete()
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
      // this.hide()
      this.treeColumns.hideColumns('Student Name')
      this.treeGridObj.hideColumns('Student Name', 'Roll Number');
    }
   if(args.item.text === 'UnHide Column') {
    this.show()
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
   if(args.item.text === 'AddChild'){
     console.log("Add Child")
    // this.onAddRecord(args)
   }
   if(args.item.text === 'CopyAsNext'){
     console.log("CopyAsNext");
     let i = this.grid.getSelectedRecords()
     console.log("copyAsnext",i)
    // this.onAddRecord(args)
   }
   if(args.item.text === 'CopyAsChild'){
     console.log("CopyAsChild")
    // this.onAddRecord(args)
   }
   if(args.item.text === 'MoveAsNext'){
     console.log("MoveAsNext")
    // this.onAddRecord(args)
   }
   if(args.item.text === 'MoveAsChild'){
     console.log("MoveAsChild")
    // this.onAddRecord(args)
   }
   if(args.item.text === 'AddNext'){
     console.log("AddNext")
    // this.onAddRecord(args)
   }
   if(args.item.text === 'AddParent'){
     console.log("AddParent")
     this.dialog.open()
    // this.onAddRecord(args)
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
  <div *ngIf="showEditColumn">
    <ejs-dialog
      id="dialog"
      #ejDialog
      [animationSettings]="animationSettings"
      header="Edit Column"
      [target]="targetElement"
      width="300px"
      [showCloseIcon]="showCloseIcon"
    >
      <ng-template #content>
        <form id="template_driven" #userForm="ngForm" novalidate>
          <div class="form-group" style="padding-top: 11px;">
            <div class="e-float-input">
              <input
                type="text"
                name="ColName"
                [(ngModel)]="ColName"
                #ColumnName="ngModel"
              />
              <span class="e-float-line"></span>
              <label class="e-float-text e-label-top" for="name">Name</label>
              <div
                *ngIf="ColumnName.invalid && (ColumnName.dirty || ColumnName.touched)"
              >
                
              </div>
            </div>
          </div>

          <div class="form-group" style="padding-top: 11px;">
            <div class="e-float-input">
              <ejs-dropdownlist
                
                id="coltypeid"
                [dataSource]="d2data"
                [fields]="fields"
                placeholder="Type"
                name="ColType"
                [(ngModel)]="ColType"
              ></ejs-dropdownlist>
              </div>
          </div>

    

          <div class="form-group" style="padding-top: 11px;">
            <div style="display: flex; justify-content: space-between;">
              <span class="e-float-text e-label-top"
                >Choose new Font-color</span
              >

              <input
                ejs-colorpicker
                type="color"
                id="element"
                value="#FFFFFF"
                (change)="changeFontColor($event)"
                id="colorpicker"
              />
            </div>
          </div>
          <div class="form-group" style="padding-top: 11px;">
            <div style="display: flex; justify-content: space-between;">
              <span class="e-float-text e-label-top"
                >Choose new Background-color</span
              >

              <input
                ejs-colorpicker
                type="color"
                id="element"
                value="#FFFFFF"
                (change)="changeBackground($event)"
                id="colorpicker"
              />
            </div>
          </div>
          <div class="form-group" style="padding-top: 11px;">
            <div class="e-float-input">
              <ejs-dropdownlist
                #dropdown2
                id="element"
                [dataSource]="d3data"
                [fields]="fields"
                name="ColAlign"
                [(ngModel)]="ColAlign"
                placeholder="Alignment"
              ></ejs-dropdownlist>
            </div>
          </div>
          <div class="form-group" style="padding-top: 11px;">
            <div style="display: flex; justify-content: space-between;">
              <span class="e-float-text e-label-top" for="email"
                >Text-wrap</span
              >

              <ejs-checkbox
                labelPosition="Before"
                [checked]="false"
                name="ColChecked"
                [(ngModel)]="ColChecked"
              ></ejs-checkbox>
            </div>
          </div>
        </form>
      </ng-template>
      <ng-template #footerTemplate>
        <div>
          <button
            id="Button1"
            class="e-control e-btn e-primary e-flat"
            (click)="saveColumn($event)"
            data-ripple="true"
          >
            <span class="e-btn-icon e-icons e-ok-icon e-icon-left"></span>Save
          </button>
          <button
            id="Button2"
            class="e-control e-btn e-flat"
            (click)="btnclick($event)"
            data-ripple="true"
          >
            <span class="e-btn-icon e-icons e-close-icon e-icon-left"></span
            >Cancel
          </button>
        </div>
      </ng-template>
    </ejs-dialog>
    </div>
  `,
  
  showCloseIcon: true,
  closeOnEscape: true,
  animationSettings: { effect: 'Zoom' }
});
}public onOpenDialogView = (): void => {
  this.DialogObj = DialogUtility.confirm({
  title: 'View Column',
  content: `
  <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Student ID</th>
      <th scope="col">Student Name</th>
      <th scope="col">Roll Number</th>
      <th scope="col">Class</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let item of data">
      <td>{{item.id}}</td>
      <td>{{item.name}}</td>
      <td>{{item.roll_no}}</td>
      <td>{{item.class}}</td> 
    </tr>
  </tbody>
</table>
  `,
  okButton: {  text: 'OK' },
  cancelButton: {  text: 'Cancel', click: this.cancelClick.bind(this) },
  showCloseIcon: true,
  closeOnEscape: true,
  animationSettings: { effect: 'Zoom' }
});
}

public onOpenDialogDelete = ():void => {
  this.DialogObj = DialogUtility.confirm({
    title: 'Delete Column',
    content: `
    <div *ngIf="showEditColumn">
    <ejs-dialog
      id="dialog"
      #ejDialog
      [animationSettings]="animationSettings"
      header="Edit Column"
      [target]="targetElement"
      width="300px"
      [showCloseIcon]="showCloseIcon"
    >
      <ng-template #content>
        <form id="template_driven" #userForm="ngForm" novalidate>
          <div class="form-group" style="padding-top: 11px;">
            <div class="e-float-input">
              <input
                type="text"
                name="ColName"
                [(ngModel)]="ColName"
                #ColumnName="ngModel"
              />
              <span class="e-float-line"></span>
              <label class="e-float-text e-label-top" for="name">Name</label>
              <div
                *ngIf="ColumnName.invalid && (ColumnName.dirty || ColumnName.touched)"
              >
                
              </div>
            </div>
          </div>

          <div class="form-group" style="padding-top: 11px;">
            <div class="e-float-input">
              <ejs-dropdownlist
                
                id="coltypeid"
                [dataSource]="d2data"
                [fields]="fields"
                placeholder="Type"
                name="ColType"
                [(ngModel)]="ColType"
              ></ejs-dropdownlist>
              </div>
          </div>

          <div class="form-group" style="padding-top: 11px;">
            <div class="e-float-input">
              <ejs-dropdownlist
                #dropdown2
                id="element"
                [dataSource]="d3data"
                [fields]="fields"
                name="ColAlign"
                [(ngModel)]="ColAlign"
                placeholder="Alignment"
              ></ejs-dropdownlist>
            </div>
          </div>
          
      <ng-template #footerTemplate>
        <div>
          <button
            id="Button1"
            class="e-control e-btn e-primary e-flat"
            (click)="deleteColumn($event)"
            data-ripple="true"
          >
            <span class="e-btn-icon e-icons e-ok-icon e-icon-left"></span>Delete
          </button>
          <button
            id="Button2"
            class="e-control e-btn e-flat"
            (click)="btnclick($event)"
            data-ripple="true"
          >
            <span class="e-btn-icon e-icons e-close-icon e-icon-left"></span
            >Cancel
          </button>
        </div>
      </ng-template>
    </ejs-dialog>
    </div>
    `,
   

  showCloseIcon: true,
  closeOnEscape: true,
  animationSettings: { effect: 'Zoom' }
  })
}

 

  public treeColumns:any= [
    {
      field: 'orderName',
      headerText: 'Order Name'
    },
    {
      field: 'category',
      headerText: 'Category',
      editType: 'stringedit',
      type: 'string'
    },
    {
      field: 'orderDate',
      headerText: 'Order Date',
      textAlign: 'Right',
      editType: 'stringedit',
      type: 'string'
    },
    {
      field: 'units',
      headerText: 'Units',
      editType: 'stringedit',
      type: 'string'
    }
  ];
  checkNewEdit!: string;

//  contextMenuOpen(arg:any): void {
//    console.log("contextMenuOpen:",arg);
//     this.rowIndex = arg.rowInfo.rowIndex;
//     let elem: Element = arg.event.target as Element;

//     if (arg.column.headerText == "Student ID") {
//       this.columnValue = 1;
//       this.columnField = "id";
//     }
//     if (arg.column.headerText == "Student Name") {
//       this.columnValue = 2;
//       this.columnField = "name";
//     }
//     if (arg.column.headerText == "Roll Number") {
//       this.columnValue = 3;

//       this.columnField = "roll_no";
//     }
//     if (arg.column.headerText == "Class") {
//       this.columnValue = 4;

//       this.columnField = "class";
//     }

//     else{}
//     let row: Element = elem.closest(".e-row")!;
//     let uid: string = row && row.getAttribute("data-uid")!;

//     this.rowIndex = arg.rowInfo.rowIndex;
//     this.cellIndex = arg.rowInfo.cellIndex;
    
//   }


//   contextMenuClick(args:any): void {
//     if (args.item.id === "editCol") {
//       this.checkNewEdit = "edit";
//       this.showEditColumn = true;
//       this.getCurrentField();
//     } 
// //copying row on right click
//     // if (args.item.id === 'customCopy') {
//     //   this.treeGridObj.copy();
//     // } else if (args.item.id === 'customPaste') {
//     //   var rowIndex = this.rowIndex;
//     //   var cellIndex = this.cellIndex;
//     //   // var copyContent = this.treeGridObj.clipboardModule.copyContent;
//     //   // this.treeGridObj.paste(copyContent, rowIndex, cellIndex);
//     // }
     
//   }
 
//   saveColumn(args:any) {
//     console.log("saveColumn:");
//     if (this.checkNewEdit == 'edit') {
//       var catched = false;
// document.createElement('e-column');
     
      
//     console.log("edit:")
//       this.treeColumns.forEach((r:any) => {
//         console.log("R:",r);
//         if (!catched) {
//           console.log('catched:', catched);
//           catched = true;
//           var style = document.createElement('style');
//           style.type = 'text/css';
//           style.innerHTML = `.e-treegrid .e-headercell.cssClassaa { background-color: ${this.ColBColor}; 
//             color:${this.ColFColor};
//           }`;
//           document.body.append(style);
//         }

//         if (r.field == this.columnField) {
//           console.log('r.field:', r.field, 'columnField:', this.columnField);
//           r.headerText = this.ColName;
//           r.type = this.ColType;
//           r.textAlign = this.ColAlign;
//           r['customAttributes'] = { class: 'cssClassaa' };
//         }
//       });

   
//       this.treegrid.refreshColumns();
//       this.textWrap = this.ColChecked;
//     }

//     this.showEditColumn = false;

//     this.ejDialog.hide();
//   }
//   public changeFontColor(e: ChangeEventArgs): void {
//     this.ColFColor = <string>e.value;
//   }
//   public changeBackground(e: ChangeEventArgs): void {
//     this.ColBColor = <string>e.value;
//   }
 


//   getCurrentField() {
  
//     if (this.checkNewEdit == "edit") {
//       this.ColName = this.treegrid.getColumnByField(
//         this.columnField
//       ).headerText;
     
//       this.ColType = this.treegrid.getColumnByField(this.columnField).type;
//       console.log("ColType:",this.ColType)
//     } else {
//       this.ColName = "";
//       this.ColType = "";
//     }
//   }
  btnclick(args:any){}

  //Delete Column
  public deleteColumn(args:any) {

    args.removeColumn = function(){

      this.grid.removeColumn(args);
      
      }

    console.log("deleteColumn:");
    if (this.checkNewEdit == 'edit') {
      var catched = false;

     
      
    console.log("edit:")
      this.treeColumns.forEach((r:any) => {
        console.log("R:",r);
        if (!catched) {
          console.log('catched:', catched);
          catched = true;
          var style = document.createElement('style');
          style.type = 'text/css';
          style.innerHTML = `.e-treegrid .e-headercell.cssClassaa { background-color: ${this.ColBColor}; 
            color:${this.ColFColor};
          }`;
          document.body.append(style);
        }

        if (r.field == this.columnField) {
          console.log('r.field:', r.field, 'columnField:', this.columnField);
          r.headerText = this.ColName;
          r.type = this.ColType;
          r.textAlign = this.ColAlign;
          r['customAttributes'] = { class: 'cssClassaa' };
        }
      });

   
      this.treegrid.refreshColumns();
      this.textWrap = this.ColChecked;
    }

    this.showEditColumn = false;

    this.ejDialog.hide();
  }
 //show and hide column method
 show() {
  this.treeGridObj.showColumns(['Student Name', 'Roll Number']); //show by HeaderText
}

hide():void {
  this.treeGridObj.hideColumns(['Class', 'Roll Number']); //hide by HeaderText

  //hide column
  let columnName: string = <string>this.dropdown1.value;
  let column = this.treegrid.getColumnByField(columnName);
  let hiddenColumns: HTMLTextAreaElement = document.getElementById('hiddencolumns') as HTMLTextAreaElement;

  if (this.treegrid.getHeaderTable().querySelectorAll('th.e-hide').length === 3) {
      alert('Atleast one Column should be visible');
  } else {
      this.treegrid.grid.hideColumns(column.headerText, 'headerText');
      this.button1.disabled = true;
      this.button2.disabled = false;
      hiddenColumns.value = hiddenColumns.value + column.headerText + '\n';
  }

}

//row drag and drop
rowDataBound(args: any){
  if (args.data.taskID == 1) {
    args.row.querySelector('td').innerHTML = " ";  //hide the DragIcon(td element)
   
  }
}
rowDragStartHelper(args: any){
  if (args.data[0].taskID == 1) {
    args.cancel = 'true';   ;                 //prevent Drag operations by setting args.cancel as true
  }
}
rowDrop(args: any) {
    var treeGridobj = (document.getElementById('TreeGrid') as any).ej2_instances[0];
   var data = treeGridobj.getCurrentViewRecords()[args.dropIndex];
   if (data.hasChildRecords)  {             //apply your own customized condition                                   
         args.cancel = 'true'
        alert("dropping disabled for parent row")     //alert message while dropping on parent row
     }
}
rowDragStart (args: any) {
 args.rows[0].classList.add('e-dragclonerow'); //customize the dragged row here
}
rowDrag (args: any) {
   var treeGridobj = (document.getElementById('TreeGrid') as any).ej2_instances[0];
   var rowEle: Element = args.target ? args.target.closest('tr') : null;
   var rowIdx: number = rowEle ? (rowEle as HTMLTableRowElement).rowIndex : -1;
   var currentData = treeGridobj.getCurrentViewRecords()[rowIdx];
  if (rowIdx !== -1) {
    if (currentData.hasChildRecords)
      treeGridobj.rowDragAndDropModule.addErrorElem();//shown (no drop) icon for the parent records
  }
};
 
//adding child record
onAddRecord(args:any) {
  var parentdata = {
    id: String(Math.floor(Math.random() * (100000 + 1 - 50000) + 50000)),
    name: 'test',
  };

  this.treegrid.addRecord(parentdata, 8, 'Above');
}
validation(args:any) {
  this.treegrid.endEdit();
}

actioncomplete(args:any) {console.log("action complete")}

toolabarclickHandler(args:any) {
  if (args.item.id === 'savebutton') {
    this.treegrid.endEdit(); //you can save a record by invoking endEdit
  }
}

//  i = 0;
// change() {
//   let doc = document.getElementById("background");
//   let color = ["black", "blue", "brown", "green"];
//   doc.style.backgroundColor = color[i];
//   i = (i + 1) % color.length;
// }
// setInterval(change, 1000);
// setToRed ( )
// {
//   document.getElementById("colourButton").style.color = "#FF0000";
//   setTimeout ( "setToBlack()", 2000 );
// }

// setToBlack ( )
// {
//   document.getElementById("colourButton").style.color = "#000000";
// }

public gridOptions = {
  rowSelection: 'multiple',

  treeData: true,
  getDataPath: (params:any) => {
    return params.group;
  },
} 

//add data as parent
public openDialog(parentID:any) {
  this.student.ParentID = parentID;
  this.dialog.open();
}

addRow() {
  console.log("add", this.student);
  // this.student.
  this.treeGrid.createRow(this.data?.length+1, this.student)
  this.student.ID = this.nextRow++;
  console.log("check add")

  if (this.student.ParentID === 1) {
      this.treeGrid?.addRow(this.student);
  } else {
      this.treeGrid?.addRow(this.student, this.student.ParentID);
      
  }
  this.cancel();
}

cancel() {
  console.log("cancel")
  this.dialog.close();
  this.student = new Student();
}

public deleteRow(id:any) {
  this.treeGrid.deleteRow(id);
}




rowSelecting(): void {
  console.log("row select")
  this.appendElement('Tree Grid <b style="color:#388e3c">rowSelecting</b> event called<hr>');
}
// rowSelected(): void {
//   this.appendElement('Tree Grid <b style="color:#388e3c">rowSelected</b> event called<hr>');
// }
appendElement(html: string): void {
  let span: HTMLElement = document.createElement('span');
  span.innerHTML = html;
  let log: HTMLElement = document.getElementById('EventLog')!;
  log?.insertBefore(span, log.firstChild);
}

onClick () {
  $('.EventLog').innerHTML = '';
}

//edit col

contextMenuOpen(arg?: any): void {
  console.log("contextMenuOpen:",arg);
   this.rowIndex = arg.rowInfo.rowIndex;
   let elem: Element = arg.event.target as Element;

   if (arg.column.headerText == "Order Name") {
     this.columnValue = 1;
     this.columnField = "orderName";
   }
   if (arg.column.headerText == "Category") {
     this.columnValue = 2;
     this.columnField = "category";
   }
   if (arg.column.headerText == "Order Date") {
     this.columnValue = 3;

     this.columnField = "orderDate";
   }
   if (arg.column.headerText == "Units") {
     this.columnValue = 4;

     this.columnField = "units";
   }

   else{}
   let row: Element = elem.closest(".e-row")!;
   let uid: string = row && row.getAttribute("data-uid")!;
   
 }


 contextMenuClick(args:any): void {
   if (args.item.id === "editCol") {
     this.checkNewEdit = "edit";
     this.showEditColumn = true;
     this.getCurrentField();
   } 
    
 }

 public saveColumn() {
   console.log("saveColumn:");
   if (this.checkNewEdit == 'edit') {
     var catched = false;

    
     
   console.log("edit:")
     this.treeColumns.forEach((r:any) => {
       console.log("R:",r);
       if (!catched) {
         console.log('catched:', catched);
         catched = true;
         var style = document.createElement('style');
         style.type = 'text/css';
         style.innerHTML = `.e-treegrid .e-headercell.cssClassaa { background-color: ${this.ColBColor}; 
           color:${this.ColFColor};
         }`;
         document.body.append(style);
       }

       if (r.field == this.columnField) {
         console.log('r.field:', r.field, 'columnField:', this.columnField);
         r.headerText = this.ColName;
         r.type = this.ColType;
         r.textAlign = this.ColAlign;
         r['customAttributes'] = { class: 'cssClassaa' };
       }
     });

  
     this.treegrid.refreshColumns();
     this.textWrap = this.ColChecked;
   }

   this.showEditColumn = false;

   this.ejDialog.hide();
 }
 public changeFontColor(e: ChangeEventArgs): void {
   this.ColFColor = <string>e.value;
 }
 public changeBackground(e: ChangeEventArgs): void {
   this.ColBColor = <string>e.value;
 }


 getCurrentField() {
 
   if (this.checkNewEdit == "edit") {
     this.ColName = this.treegrid.getColumnByField(
       this.columnField
     ).headerText;
    
     this.ColType = this.treegrid.getColumnByField(this.columnField).type;
     console.log("ColType:",this.ColType)
   } else {
     this.ColName = "";
     this.ColType = "";
   }
 }

}

class CustomNumberSummary extends IgxSummaryOperand {

  constructor() {
      super();
  }
  public override operate(data?: any[]): IgxSummaryResult[] {
      const result = super.operate(data);
      result.push({
          key: "Min",
          label: "Min",
          summaryResult: IgxNumberSummaryOperand.min([data])
      });
      result.push({
          key: "max",
          label: "Max",
          summaryResult: IgxNumberSummaryOperand.max([data])
      });
      return result;
  }
}
