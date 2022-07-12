import { HttpClient } from "@angular/common/http";
import {
  Component,
  ViewChild,
  OnInit,
  ViewEncapsulation,
  ViewContainerRef,
  ElementRef
} from "@angular/core";
import {
  VirtualScrollService,
  TreeGridComponent,
  EditSettingsModel,
  ToolbarItems,
  EditService,
  ToolbarService,
  Column,
  checkboxChange,
  SelectionSettingsModel,
  RowDDService,
  SelectionService,
  PageService,
  DataStateChangeEventArgs,
  ColumnChooserService,
  FreezeService
} from "@syncfusion/ej2-angular-treegrid";
import { ApiService } from "./services/api.service";
import {
  PageSettingsModel,
  SortSettingsModel,
} from "@syncfusion/ej2-angular-treegrid";
import {
  appendChildren,
  DataSourceChangedEventArgs,
  DialogEditEventArgs,
  GridComponent,
  RowSelectEventArgs,
  parentsUntil
} from "@syncfusion/ej2-angular-grids";
import { Dialog } from "@syncfusion/ej2-popups";
import { SocketioService } from "./socketio.service";
import {
  ContextMenuComponent,
  MenuEventArgs,
  MenuItemModel,
} from "@syncfusion/ej2-angular-navigations";
import {
  ChangeEventArgs,
  DropDownList,
  DropDownListComponent,
} from "@syncfusion/ej2-angular-dropdowns";
import { DialogUtility } from "@syncfusion/ej2-popups";
import { DialogComponent } from "@syncfusion/ej2-angular-popups";
import { ReorderService } from "@syncfusion/ej2-angular-treegrid";
import { ResizeService } from "@syncfusion/ej2-angular-treegrid";
import { ButtonComponent } from "@syncfusion/ej2-angular-buttons";
import {
  IgxDialogComponent,
  IgxNumberSummaryOperand,
  IgxSummaryOperand,
  IgxSummaryResult,
  IgxTreeGridComponent,
} from "igniteui-angular";
import { Student } from "./student";
import { BeforeOpenCloseEventArgs } from "@syncfusion/ej2-angular-inputs";
import { EmitType } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
import { Internationalization, isNullOrUndefined } from '@syncfusion/ej2-base';
declare var $: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [
    EditService,
    ToolbarService,
    VirtualScrollService,
    ReorderService,
    ResizeService,
    RowDDService,
    SelectionService,
    PageService,
    ColumnChooserService,
    FreezeService,
    VirtualScrollService      
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = "testaskk";
  public data!: Object[];
  public sortSettings!: SortSettingsModel;
  public pageSettings!: PageSettingsModel;
  public editSettings!: EditSettingsModel;
  public selectionSettings!: SelectionSettingsModel;
  public toolbar!: string[];

  public editOptions!: Object;
  public editOptions1!: Object;
  public formatOptions!: Object;
  public selectionOptions!: object;
  public contextMenuSettings: any;

  @ViewChild("treegrid")
  public treeGridObj!: TreeGridComponent;
  @ViewChild("button1")
  public button1!: ButtonComponent;
  @ViewChild("button2")
  public button2!: ButtonComponent;

  public d1data!: Object;
  public filterSettings!: Object;
  public filterBarTemplate!: Object;

  public studentidrules!: Object;
  public studentnamerules!: Object;
  public modal: boolean = true;
  public inputEle: any;

  public check = this.data?.length < 50;

  customAttributes!: { class: string };
  public cellIndex!: number;
  @ViewChild("grid")
  public grid!: GridComponent;
  @ViewChild("contextmenu")
  public contextmenu!: ContextMenuComponent;
  @ViewChild("headercontextmenu")
  public headercontextmenu!: ContextMenuComponent;
  @ViewChild("dropdown1")
  public dropdown1!: DropDownListComponent;
  public dropEditSettings!: object;
  @ViewChild("treegrid")
  public DropGrid: any;
  public taskidrules!: Object;
  public tasknamerules!: Object;
  public startdaterules!: Object;
  public durationrules!: Object;
  public edit!: Object;
  public ddlfields!: Object;
  @ViewChild("treeGrid") public treeGrid!: IgxTreeGridComponent;
  @ViewChild("dialogAdd", { read: IgxDialogComponent })
  public dialog!: IgxDialogComponent;
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
  public showDelColumn: boolean = false;
  public showViewColumn: boolean = false;
  public showAddColumn: boolean = false;
  public showChooseColumn:boolean =false;
  public showNewColumn:boolean = false;
  public showAddNext:boolean = false;
  public showDeleteRow:boolean = false;
  public showEditRow:boolean = false;
  public showAddchild:boolean =false;


  public ColType: string = "";
  ColFColor: string = "";
  ColBColor: string = "";

  @ViewChild("treegrid")
  public treegrid!: TreeGridComponent;
  public copiedRecord: any;
  private moveRow: any = null;
  // Copy/Paste
  private clone: any = null;

  @ViewChild("ejDialog") ejDialog!: DialogComponent;
  @ViewChild("ejDialog") ejDialog2!: DialogComponent;
  @ViewChild("ejDialog") ejDialog3!: DialogComponent;
  @ViewChild("ejDialog") ejDialog4!: DialogComponent;
  @ViewChild("ejDialog") ejDialog5!: DialogComponent;

  public textWrap: boolean = false;

  ColChecked: boolean = false;

  public d2data: any = [];

  public d4data: any = [];

  public d3data: any = [];
  isShown: boolean = true;
  ////////////////////////////////
  public editparams!: Object;
  public deletedRecord!: object;
  public selectedIndex!: number;
  public selectedRecord!: Object;
  public flag!: boolean;
  public j!: number;
  public i!: number;
  public rec!: Object;
  /////////
  @ViewChild('application', {read: ViewContainerRef}) applicationRef!: ViewContainerRef;

    public column!: Array<any>;
    public rows!: Array<any>;

    // Add Remove
    private columnCount: number = 4;
    private rowCount: number = 3;

    // Editing
    private isEditActive: boolean = false;
    public editCell: any = null;
    private originalText: string = '';
    public editorFocused: boolean = false; 

    //dialog
      // The Dialog shows within the target element.
  public targetElement!: HTMLElement;
  public targetElement2! : HTMLElement;
  public targetElement3! : HTMLElement;
  public targetElement5! : HTMLElement;
  
  
    // Create element reference for dialog target element.
    @ViewChild('container', { read: ElementRef, static: true }) container!: ElementRef;
    // Dialog animation
    public dialogAnimation: Object= { effect: 'Zoom', duration: 400, delay: 0 };
    public animationSettings: Object = { effect: 'Zoom', duration: 400, delay: 0 };

    count:number = 0;

  public toolbar1!:string[];
  public editSetting1!:any;

  public freezeCol!:number;
  public columnNumber!: number;
  public stuName!:string[];
  public stuRoll!:number[];
  public stuId!:number[];
  public stuClass!:number[];
  public sortSetting1!:string[];
  public allowMultSort: boolean=false;
  public allowFilter: boolean = false;
  public freezeColumn: boolean = false;

  public stuCName!:string[];
  public stuCRoll!:number[];
  public stuCId!:number[];
  public stuCClass!:number[];
  /////////////////////////////////

  constructor(
    private api: ApiService,
    private http: HttpClient,
    private socketService: SocketioService
  ) {
    this.contextMenuSettings = {
      showContextMenu: true,
      toolbar: ["Add", "Edit", "Delete", "ColumnChooser"],
    };
  }
  ngOnInit(): void {
    this.api.getAll().subscribe((res: any) => {
      this.data = res.filter((item: any) => item);
      console.log("data", this.data);
    });

  this.selectionSettings = { persistSelection: true };
    this.contextMenuItems = [
      { text: "Edit ", target: ".e-headercontent", id: "editCol" },
    ];

    this.pageSettings = { pageSize: 6 };
    this.editOptions = { params: { format: "y/M/d" } };
    this.editSettings = {
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      allowEditOnDblClick: false,
      allowNextRowEdit: true,
      mode: "Dialog",
      showDeleteConfirmDialog: true,
    };
    //////////////editsetting
    this.editSetting1 = {
      allowAdding: true,
      mode: "Dialog",
      newRowPosition: "Child"
    };
    ///////////
    this.toolbar = ["Add", "Edit", "Delete", "Update", "Cancel", "Search"];
    this.dropEditSettings = { allowEditing: true, allowAdding: true };
    this.selectionOptions = {
      cellSelectionMode: "Box",
      type: "Multiple",
      mode: "dialog",
      rowSelecting: true,
      allowColumnSelection:true
    };
    this.studentidrules = { required: true, max: 150000 };
    this.studentnamerules = { required: true };
    this.customAttributes = { class: "customcss" };
    this.selectionSettings = { type: "Multiple" };
    this.socketService.setupSocketConnection();
    this.d2data = [
      { id: "string", type: "string" },
      { id: "number", type: "number" },
      { id: "boolean", type: "boolean" },
      { id: "datetime", type: "datetime" },
      { id: "date", type: "date" },
    ];

    this.d3data = [
      { id: "right", type: "Right" },
      { id: "left", type: "Left" },
      { id: "Center", type: "Center" },
    ];

    this.fields = { text: "type", value: "id" };

    // filter setting
    this.filterSettings = {
      type: "FilterBar",
      hierarchyMode: "Parent",
      mode: "Immediate",
    };
    //filter functioning
    this.filterBarTemplate = {
      create: (args: { element: Element; column: Column }) => {
        let dd: HTMLInputElement = document.createElement("input");
        dd.id = "duration";
        return dd;
      },
      write: (args: { element: Element; column: Column }) => {
        let dataSource: string[] = [
          "All",
          "1",
          "3",
          "4",
          "5",
          "10",
          "11",
          "12",
        ];
        this.dropDownFilter = new DropDownList({
          dataSource: dataSource,
          value: "All",
          change: (e: ChangeEventArgs) => {
            let valuenum: any = +e.value;
            let id: any = <string>this.dropDownFilter.element.id;
            let value: any = <string>e.value;
            if (value !== "All") {
              this.treeGridObj.filterByColumn(id, "equal", valuenum);
            } else {
              this.treeGridObj.removeFilteredColsByField(id);
            }
          },
        });
        this.dropDownFilter.appendTo("#duration");
      },
    };
    this.taskidrules = { required: true, number: true };
    this.tasknamerules = { required: true };
    this.edit = { params: { format: "n" } };
    this.ddlfields = { text: "name", value: "id" };
    this.d1data = [
      { id: "CellEditing", name: "Cell Editing" },
      { id: "RowEditing", name: "Row Editing" },
    ];
    //close of ngOninit
    this.student = new Student();
    this.nextRow = this.data?.length + 1;

this.column = [
  {
    field: 'id',
    headerText: 'Student ID'
  },
  {
    field: 'name',
    headerText: 'Student Name'
  },
  {
    field: 'roll_no',
    headerText: 'Roll Number'
  },
  {
    field: 'class',
    headerText: 'Class'
  }
];
    /////////////////////////////////////////////////////////
    this.contextMenuItems = [
      { text: "Edit ", target: ".e-headercontent", id: "editCol" },
    ];


    ///////////////////////////color row selected
    let gridInstance = this.grid;
this.grid.element.addEventListener('click', function(e){
  let element = e.target;
  let row = parentsUntil((element as Element), 'parenttr');
  if(!isNullOrUndefined(row)) {
  let prevSelectedRows = gridInstance.getContent().querySelectorAll('.bgcolor');
  for( let i = 0; i < prevSelectedRows.length; i++){
    prevSelectedRows[i].classList.remove('bgcolor');
  }
  row.classList.add('bgcolor');
  }
})

  }

  actionComplete(args: any) {

    if (args.requestType == "save") {
      var index = args.index;
      this.treegrid.selectRow(index); // select the newly added row to scroll to it
}

    if (args.requestType === "beginEdit" || args.requestType === "add") {
      const dialog = args.dialog as Dialog;
      let getVal = args;
      const TaskName = "TaskName";
      dialog.height = 400;
      console.log("dialog args val", getVal);
      // dialog.header = args.requestType === 'beginEdit' ? 'Record of ' + args.rowData[TaskName] : 'New Customer';
      args.frozenRightForm;
    }
  }

  public selectitem!: string[];

  public menuItems: MenuItemModel[] = [
    {
      text: "Add Next",
      id: 'addnext'
    },
    {
      text: "Add Child",
      id: 'addchild'
    },
    {
      text: "Edit Row",
      id: 'edit'
    },
    {
      text: "Select Rows",
      id: 'select'
    },
    {
      text: "Delete Rows",
      id: 'del'
    },
    {
      text: "Copy As Next",
      id: 'copynext'
    },
    {
      text: "Copy As Child",
      id: 'copychild'
    },
    {
      text: "Move As Next",
      id: 'movenext'
    },
    {
      text: "Move As Child",
      id: 'movechild'
    },
  ];

  public editing!: EditSettingsModel;
  getVal(asdasd: any) {
    alert(asdasd);
  }
// //////////cruds
  public dataSourceChanged(
    dataSourceChangedEvent: DataSourceChangedEventArgs
  ): void {
    if (dataSourceChangedEvent.action === "add") {
      this.api.addRecord(dataSourceChangedEvent).subscribe(() => {
        dataSourceChangedEvent.endEdit;
      });
    }
    if (dataSourceChangedEvent.action === "edit") {
      var getId: any = dataSourceChangedEvent.data;
      this.api.updateRecord(dataSourceChangedEvent, getId.id).subscribe(() => {
        dataSourceChangedEvent.endEdit;
      });
    }
    if (dataSourceChangedEvent.requestType === "delete") {
      var getId: any = dataSourceChangedEvent.data;
      this.api.deleteRecord(dataSourceChangedEvent, getId.id).subscribe(() => {
        dataSourceChangedEvent.endEdit;
      });
    }
  }

  public headermenuItems: MenuItemModel[] = [
    
    {
      text: "Add Column",
      id: "addCol",
    },
    {
      text: "Edit Column",
      id: "editCol",
    },
    {
      text: "View Column",
      id: "viewCol",
    },
    {
      text: "Delete Column",
      id: "delCol",
    },
    {
      text: "Choose Column",
      id: "chooseCol",
    },
    {
      text: "Freeze Column",
      id: "freezeCol",
    },
    {
      text: "Filter Column",
      id: "filterCol",
    },
    {
      text: "Multisort Column",
      id: "msortCol",
    },
  ];

////////////////////////
  beforeOpen(args: any): void {
   console.log("beforeOpen ", args)
  }
  // Set Dialog position
  public pos: object={ X: 860, Y: 100 };

  select(args: any): void {
    //debugger
    this.selectitem = args.item.text;
    
    if (args.item.text === "Add Column") {
      console.log("add");
      this.showAddColumn = !this.showAddColumn;

    }
    if (args.item.text === "Edit Column") {
      console.log("edit");
      this.showEditColumn = !this.showEditColumn;
      this.checkNewEdit = "edit";
      this.getCurrentField();

    }
    if (args.item.text === "View Column") {
      console.log("view");
      this.showViewColumn =!this.showViewColumn;
     
    }
    if (args.item.text === "Delete Column") {
      console.log("delete");
      this.showDelColumn = !this.showDelColumn;

    }
    if (args.item.text === "Choose Column") {
      console.log("Choose");
      this.toolbar = [ "ColumnChooser"];

    }
    if (args.item.text === "Freeze Column") {
      console.log("Freeze", args);
      this.freezeColumn = true
    }
    if (args.item.text === "Filter Column") {
      console.log("Filter");
      this.allowFilter = true;

    }
    if (args.item.text === "Multisort Column") {
      console.log("Multisort");
      this.allowMultSort = true;
      
    }
  }
  /////////////////
  context(arg:any){
    if (arg.column.headerText == "Student ID") {
      arg.column.Freeze(1);
      this.columnValue = 1;
      this.columnField = "id";
    }
    if (arg.column.headerText == "Student Name") {
      this.columnValue = 2;
      this.columnField = "name";
    }
    if (arg.column.headerText == "Roll Number") {
      this.columnValue = 3;

      this.columnField = "roll_no";
    }
    if (arg.column.headerText == "Class") {
      this.columnValue = 4;

      this.columnField = "class";
    }

  }
  //dialog///////////////////////////////
  
      // Hide the Dialog when click the footer button.
      public hideDialog: EmitType<object> = () => {
    this.ejDialog.hide();
      }
    public hideDialog2: EmitType<object> = () => {
        this.ejDialog2.hide();
          }
    public hideDialog3: EmitType<object> = () => {
            this.ejDialog.hide();
              }
      // Enables the footer buttons
      public buttons: Object = [
      {
          'click': this.hideDialog.bind(this),
          // Accessing button component properties by buttonModel property
            buttonModel: {
            content: 'OK',
            isPrimary: true
          }
      },
      {
          'click': this.hideDialog.bind(this),
          buttonModel: {
            content: 'Cancel'
          }
      }
      ];
      // Sample level code to handle the button click action
      public onOpenDialog = (event: any): void => {
    // Call the show method to open the Dialog
    this.ejDialog.show();
      };

       // Sample level code to handle the button click action
       public onOpenDialog2 = (event: any): void => {
        // Call the show method to open the Dialog
        this.ejDialog2.show();
          };
/////////////////////////////////////////    

  public itemBeforeEvent(args: MenuEventArgs) {
    
    if (args.item.text !== "Edit") {
      let shortCutSpan: HTMLElement = document.createElement("span");
      let text: string = args.item.text!;
      args.element.textContent = "";

      this.inputEle = document.createElement("input");
      this.inputEle.type = "checkbox";
      this.inputEle.setAttribute("class", "e-checkbox");
      shortCutSpan.innerText = text;

      args.element.appendChild(this.inputEle);
      args.element.appendChild(shortCutSpan);
    }
    if (this.inputEle?.checked) {
      console.log("checked");
      this.ejDialog.open();
    }
    if (args.item.text == "Hide column") {
      let inputEle = document.createElement("input");
      inputEle.type = "checkbox";
      inputEle.setAttribute("class", "e-column");
      args.element.appendChild(inputEle);
    }
  }
  /////////////Add Column Event
  addColumn():void {
    let obj = { field: "Freight", headerText: 'Freight', width: 120 };
    this.treegrid?.columns.splice(2, 0, obj); //Add the columns

    this.grid.columns.push(obj as any); //you can add the columns by using the Grid columns method
    let columnName = { field: 'priority', width: 100 };
    this.treegrid.columns.splice(2, 0, columnName); //Add the columns
    this.grid.refreshColumns();
  }
  
  /////////////////////

  onSelect(args: any) {

    var selectedRecord = this.selectedRecord;
    if (
      !args.event.target.classList.contains("e-checkbox") &&
      args.item.text !== "Edit Row"
    ) {
      var checkbox = args.element.querySelector(".e-checkbox");
      checkbox.checked = !checkbox.checked;
    }

    if (args.item.text === "Add Next") {
      
      console.log("checked");
      this.showAddNext= true;
    }
    if (args.item.text === "Add Child") {
      this.showAddchild =true;
    }
    if (args.item.text === "Edit Row") {
      console.log("edit row")
      this.showEditRow = true
    }
    if (args.item.text === "Select Rows") {
      this.rowSelected(args)
    }

    if (args.item.text === "Delete Rows") {
      console.log("delete",args);
      this.showDeleteRow = true;
      this.delete();
    }

    if (args.item.text === "Copy As Next") {
    }

    if (args.item.text === "Copy As Child") {
    }
    if (args.item.text === "Move As Next") {
    }
    if (args.item.text === "Move As Child") {
    }
    if (args.item.text === "MoveAsChild") {
    }
  }
  ///////////method
  public dataSourceChanged1(
    dataSourceChangedEvent: DataSourceChangedEventArgs
  ): void {
    if (dataSourceChangedEvent.action === "add") {
      this.api.addRecord(dataSourceChangedEvent).subscribe(() => {
        dataSourceChangedEvent.endEdit;
      });
    }
    if (dataSourceChangedEvent.action === "edit") {
      var getId: any = dataSourceChangedEvent.data;
      this.api.updateRecord(dataSourceChangedEvent, getId.id).subscribe(() => {
        dataSourceChangedEvent.endEdit;
      });
    }
    if (dataSourceChangedEvent.requestType === "delete") {
      var getId: any = dataSourceChangedEvent.data;
      this.api.deleteRecord(dataSourceChangedEvent, getId.id).subscribe(() => {
        dataSourceChangedEvent.endEdit;
      });
    }
  }
  ////////////Edit
  public dataStateChange(dataSourceChangedEvent: DataSourceChangedEventArgs): void {
    this.api.addRecord(dataSourceChangedEvent).subscribe(() => {
      dataSourceChangedEvent.endEdit;})
    }
  ////////Add Next
  addNext(){

    let si: HTMLInputElement =  document.getElementById('dialog')?.querySelector('#sid')!;
    let sn: HTMLInputElement =  document.getElementById('dialog')?.querySelector('#sname')!;
    let sr: HTMLInputElement =  document.getElementById('dialog')?.querySelector('#sroll')!;
    let sc: HTMLInputElement =  document.getElementById('dialog')?.querySelector('#sclass')!;
  console.log("sn val",sn.value)
    var data = [{
      id:si.value,
      name: sn.value,
      roll_no:sr.value,
      class: sc.value
    }]


    var grid = (document.getElementsByClassName("e-grid")[0] as any).ej2_instances[0];
    console.log("add next function ", grid.getSelectedRecords()[0].id);
    this.api.addData(data).subscribe(()=>{
  console.log("add Data api")
    });
    console.log(this.stuClass.values);
      this.ejDialog.hide();
}
///////////////add Child
addChild(data:any){

  this.editSetting1 = {
    allowAdding: true,
    mode: "Dialog",
    newRowPosition: "Child"
  };
  console.log("addChild clicked")
  var childRow = {
    name: 'newRow'
  };
  this.treeGridObj?.addRecord(childRow, data.index,"Below"); // call addRecord method with data and index of parent record as parameters
    this.ejDialog.hide();

}
///////////////edit Row
editRow(){

  let si: HTMLInputElement =  document.getElementById('dialog')?.querySelector('#sid')!;
  let sn: HTMLInputElement =  document.getElementById('dialog')?.querySelector('#sname')!;
  let sr: HTMLInputElement =  document.getElementById('dialog')?.querySelector('#sroll')!;
  let sc: HTMLInputElement =  document.getElementById('dialog')?.querySelector('#sclass')!;
console.log("sn val",sn.value)
  var data = [{
    id:si.value,
    name: sn.value,
    roll_no:sr.value,
    class: sc.value
  }]


  var grid = (document.getElementsByClassName("e-grid")[0] as any).ej2_instances[0];
  console.log("add next function ", grid.getSelectedRecords()[0].id);
  this.api.updateData(si.value,data).subscribe(()=>{
console.log("edit Data api")
  });
    this.ejDialog.hide();
}
/////////////delete Row
delete(): void {

  var grid = (document.getElementsByClassName("e-grid")[0] as any).ej2_instances[0];
  console.log("delete function ", grid.getSelectedRecords()[0].id);
  this.api.deleteData(grid.getSelectedRecords()[0].id).subscribe(()=>{
console.log("deleteData api")
  })
    this.ejDialog.hide();
}


//////////////////
  public DialogObj!: { hide: () => void };

  private okClick(): void {
    alert("you clicked OK button");
  }

  private cancelClick(): void {
    //Hide the dialog
    this.DialogObj.hide();
  }

  checkNewEdit!: string;

  btnclick(args: any) {
    this.hideDialog.bind(args);
    this.ejDialog2.hide();
    this.ejDialog3.hide();
    this.ejDialog4.hide();
    this.ejDialog.hide();
    this.ejDialog5.hide();

  }
  btnclick3(args: any) {
    this.ejDialog.hide();

    this.hideDialog3.bind(args)
  }
  //second delete function
  // deleteColumn(args:any) {
    
  //   // this.treegrid.columns.filter((i:any,x:any) => {  
  //   //     if(i.field == args.column.field) { 
  //   //     this.treegrid.columns.splice(x,1); //you can simply remove based on field name or an index of a column 
  //   // } 
  //   // }); 
  //   // this.treegrid.refreshColumns(); 
  //     }

  // Delete Column
  public deleteColumn(args: any) {
    console.log("field",this.getCurrentField)
    args.removeColumn = function () {
      this.grid.removeColumn(args);
    };

    console.log("deleteColumn:");
    if (this.checkNewEdit == "edit") {
      var catched = false;

      console.log("edit:");
      this.column.forEach((r: any) => {
        console.log("R:", r);
        if (!catched) {
          console.log("catched:", catched);
          catched = true;
          var style = document.createElement("style");
          style.type = "text/css";
          style.innerHTML = `.e-treegrid .e-headercell.cssClassaa { background-color: ${this.ColBColor}; 
            color:${this.ColFColor};
          }`;
          document.body.append(style);
        }

        if (r.field == this.columnField) {
          console.log("r.field:", r.field, "columnField:", this.columnField);
          r.headerText = this.ColName;
          r.type = this.ColType;
          r.textAlign = this.ColAlign;
          r["customAttributes"] = { class: "cssClassaa" };
        }
      });

      this.treegrid.refreshColumns();
      this.textWrap = this.ColChecked;
    }

    this.showEditColumn = false;

    this.ejDialog.hide();
   
      this.treegrid.columns.filter?((i:any,x:any) => {  
          if(i.field == 'duration') { 
          this.treegrid.columns.splice(x,1); //you can simply remove based on field name or an index of a column 
      } 
      }):
      this.treegrid.refreshColumns(); 
      this.ejDialog.hide();  
  }


  //row drag and drop
  rowDataBound(args: any) {
    if (args.data.taskID == 1) {
      args.row.querySelector("td").innerHTML = " "; //hide the DragIcon(td element)
    }
  }
  onRowClicked(event: any) {
    setInterval(() => {
      $(event).css("background-color", "red");
    }, 30000);
  }
  rowDragStartHelper(args: any) {
    if (args.data[0].taskID == 1) {
      args.cancel = "true"; //prevent Drag operations by setting args.cancel as true
    }
  }
  rowDrop(args: any) {
    var treeGridobj = (document.getElementById("TreeGrid") as any)
      .ej2_instances[0];
    var data = treeGridobj.getCurrentViewRecords()[args.dropIndex];
    if (data.hasChildRecords) {
      //apply your own customized condition
      args.cancel = "true";
      alert("dropping disabled for parent row"); //alert message while dropping on parent row
    }
  }
  rowDragStart(args: any) {
    args.rows[0].classList.add("e-dragclonerow"); //customize the dragged row here
  }
  rowDrag(args: any) {
    var treeGridobj = (document.getElementById("TreeGrid") as any)
      .ej2_instances[0];
    var rowEle: Element = args.target ? args.target.closest("tr") : null;
    var rowIdx: number = rowEle ? (rowEle as HTMLTableRowElement).rowIndex : -1;
    var currentData = treeGridobj.getCurrentViewRecords()[rowIdx];
    if (rowIdx !== -1) {
      if (currentData.hasChildRecords)
        treeGridobj.rowDragAndDropModule.addErrorElem(); //shown (no drop) icon for the parent records
    }
  }

  //adding child record
  onAddRecord(args: any) {
    // var namedata = {name:'ritesh', roll_no:1511, class:14}
    // this.treegrid.addRecord(namedata, args.index);

    //
    var grid = (document.getElementsByClassName("e-treegrid")[0] as any).ej2_instances[0];
  console.log(grid.getSelectedRecords()[0].id);
  console.log("index",grid.getSelectedRecords()[0].getSelectedRowIndexes);

  ////////////////
  let si: HTMLInputElement =  document.getElementById('dialog')?.querySelector('#scid')!;
  let sn: HTMLInputElement =  document.getElementById('dialog')?.querySelector('#scname')!;
  let sr: HTMLInputElement =  document.getElementById('dialog')?.querySelector('#scroll')!;
  let sc: HTMLInputElement =  document.getElementById('dialog')?.querySelector('#scclass')!;

  var data = [{
    id:si.value,
    name: sn.value,
    roll_no:sr.value,
    class: sc.value
  }];
  console.log("sn val",data)
  grid.addchild({
    id:si.value,
    name: sn.value,
    roll_no:sr.value,
    class: sc.value
})
grid.dataSource = grid;
var index = grid['getSelectedRowIndexes']()[0];

grid.addRecord(data, index - 1, 'Above'); // paste as Child



alert("TaskID 1 with child has been added");
  

///////////

// this.treeGridObj.deleteRecord('taskID', this.selectedRecord); //delete the copied record

  ///method perform 
// if (this.flag == false) {
//       var i = this.treeGridObj.flatData.length;

//       this.flag = true;
//     } else {
//       var rec = this.treeGridObj.getBatchChanges();
//       if (rec.addedRecords) {
//         i = rec.addedRecords[0].taskID;
//       }

//       this.j++;
//     }

//     var data = {
//       taskID: i + 1,
//       taskName: 'test',
//     };

//     var treegridInst = this.treeGridObj;
//     var selectedRecord = this.selectedRecord;
//     if (args.item.id === 'deletion') {
//       this.selectedIndex = this.treeGridObj['getSelectedRowIndexes']()[0]; // select the records on perform Copy action
//       this.selectedRecord = this.treeGridObj['getSelectedRecords']()[0];
//       this.treeGridObj.deleteRecord('taskID', this.selectedRecord); //delete the copied record
//     } else if (args.item.id === 'addition') {
//       debugger;
//       // this.treeGridObj.deleteRecord('taskID', this.selectedRecord); //delete the copied record
//       var index = this.treeGridObj['getSelectedRowIndexes']()[0];

//       this.treeGridObj.addRecord(data, index - 1, 'Above'); // paste as Child
//     }
  }
  validation(args: any) {
    this.treegrid.endEdit();
  }

  actioncomplete(args: any) {
    console.log("action complete");
    if (args.requestType == "save") {
      var index = args.index;
      this.treegrid.selectRow(index); // select the newly added row to scroll to it
}
  }

  toolabarclickHandler(args: any) {
    if (args.item.id === "savebutton") {
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
    rowSelection: "multiple",

    treeData: true,
    getDataPath: (params: any) => {
      return params.group;
    },
  };

  //add data as parent
  public openDialog(parentID: any) {
    this.student.ParentID = parentID;
    this.dialog.open();
  }

  addRow() {
    console.log("add", this.student);
    this.treegrid.saveCell();
    // this.treeGridObj.addRecord(this.student, index - 1, 'Above');

    this.treeGrid?.addRow(this.student, this.student.ParentID);
    console.log("first work");

    this.student.ID = this.nextRow++;
    console.log("check add");

    if (this.student.ParentID === 1) {
      this.treeGrid?.addRow(this.student);
    } else {
      this.treeGrid?.addRow(this.student, this.student.ParentID);
    }
    this.cancel();
  }

  cancel() {
    console.log("cancel");
    this.dialog.close();
    this.student = new Student();
  }

  rowSelecting(): void {
    console.log("row select");
    this.appendElement(
      'Tree Grid <b style="color:#388e3c">rowSelecting</b> event called<hr>'
    );
  }
  // rowSelected(): void {
  //   this.appendElement('Tree Grid <b style="color:#388e3c">rowSelected</b> event called<hr>');
  // }
  appendElement(html: string): void {
    let span: HTMLElement = document.createElement("span");
    span.innerHTML = html;
    let log: HTMLElement = document.getElementById("EventLog")!;
    log?.insertBefore(span, log.firstChild);
  }

  onClick() {
    $(".EventLog").innerHTML = "";
  }

  //edit col

  contextMenuOpen(arg: any): void {
    
    console.log("contextMenuOpen:", arg.column.field);

    this.rowIndex = arg.rowInfo.rowIndex;
    let elem: Element = arg.event.target as Element;

    if (arg.column.field == "id") {
      this.columnValue = 1;
      this.columnField = "id";
      this.ColName = 'Student ID';
      this.ColType = 'number';
      this.ColAlign = 'Left';
    }
    if (arg.column.field == "name") {
      this.columnValue = 2;
      this.columnField = "name";
      this.ColName = 'Student Name';
      this.ColType = 'Left';

    }
    if (arg.column.field == "roll_no") {
      this.columnValue = 3;
      this.columnField = "roll_no";
      this.ColName = 'Roll Number';
      this.ColType = 'Left';

    }
    if (arg.column.field == "class") {
      this.columnValue = 4;
      this.columnField = "class";
      this.ColName = 'Class';
      this.ColType = 'Left';

    }

    else{}
    let row: Element = elem.closest(".e-row")!;
    let uid: string = row && row.getAttribute("data-uid")!;

    var grid = (document.getElementsByClassName("e-grid")[0] as any).ej2_instances[0];
  console.log("delete function ", grid.getSelectedRecords()[0].id);

  this.stuName = grid.getSelectedRecords()[0].name;
  this.stuRoll = grid.getSelectedRecords()[0].roll_no;
  this.stuId = grid.getSelectedRecords()[0].id;
  this.stuClass = grid.getSelectedRecords()[0].class;

  }

  contextMenuClick(args: any): void {
    console.log("contextMClick",args.item.text)
    if (args.item.text === "Edit Column") {
      this.checkNewEdit = "edit";
      this.showEditColumn = true;
      this.getCurrentField();
    } 
    if (args.item.id === "addnext") {
      console.log("addnext");
      this.treegrid.editModule.addRecord();
    }
    
//////////////////
    // if (this.flag == false) {
    //    this.i = this.treeGridObj.flatData.length;

    //   this.flag = true;
    // } else {
    //   var rec = this.treeGridObj.getBatchChanges();
    //   if (rec.addedRecords) {
    //     this.i = rec.addedRecords[0].taskID;
    //   }

    //   this.j++;
    // }

    // var data = {
    //   taskID: this.i + 1,
    //   taskName: 'test',
    // };

    // var treegridInst = this.treeGridObj;
    // var selectedRecord = this.selectedRecord;
    // if (args.item.id === 'deletion') {
    //   this.selectedIndex = this.treeGridObj['getSelectedRowIndexes']()[0]; // select the records on perform Copy action
    //   this.selectedRecord = this.treeGridObj['getSelectedRecords']()[0];
    //   this.treeGridObj.deleteRecord('taskID', this.selectedRecord); //delete the copied record
    // } else if (args.item.id === 'addition') {
    //   debugger;
    //   // this.treeGridObj.deleteRecord('taskID', this.selectedRecord); //delete the copied record
    //   var index = this.treeGridObj['getSelectedRowIndexes']()[0];

    //   this.treeGridObj.addRecord(data, index - 1, 'Above'); // paste as Child
    // }
  
  }

  public saveColumn(args:any) {
    console.log("saveColumn:");
    if (this.checkNewEdit == "edit") {
      var catched = false;

      console.log("edit:");
      this.column.forEach((r: any) => {
        console.log("R:", r);
        if (!catched) {
          console.log("catched:", catched);
          catched = true;
          var style = document.createElement("style");
          style.type = "text/css";
          style.innerHTML = `.e-treegrid .e-headercell.cssClassaa { background-color: ${this.ColBColor}; 
           color:${this.ColFColor};
         }`;
          document.body.append(style);
        }

        if (r.field == this.columnField) {
          console.log("r.field:", r.field, "columnField:", this.columnField);
          r.headerText = this.ColName;
          r.type = this.ColType;
          r.textAlign = this.ColAlign;
          r["customAttributes"] = { class: "cssClassaa" };
        }
      });

      this.treegrid.refreshColumns();
      this.textWrap = this.ColChecked;
    }

    this.showEditColumn = false;

    this.ejDialog.hide();
  }
 

  saveColEdit(args:any){
    console.log("saveColEdit:", args);
    if (this.checkNewEdit == 'edit') {
      var catched = false;
 
    console.log("edit:",this.column);
 
      this.column.forEach((r) => {
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

   
      // this.treegrid.refreshColumns();
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
 
// Add Remove Columns ----------------------------------------------------------------
            
createNewColumn(){
    this.columnCount++;
    // this.treegrid.createElement('e-column','e-column',true)

    return { id: this.columnCount, headerText: "Header" + this.columnCount };
}

// Add Remove Rows ----------------------------------------------------------------
            
createNewRow(){
    this.rowCount++;

    let newRow: any = {
        text: "Row" + this.rowCount,
        cells: []
    }

    for (let j = 1; j <= this.column.length; j++){
        let colId: any = this.column[j-1].id;

        newRow.cells.push({ cid: colId, text: "Item" + this.rowCount + colId });
    }

    return newRow;
}


// Editing ---------------------------------------------------------------------------

showEditor(cell: any){
    // A timeout is required in this case, because when edit option from context menu is selected
    // there is a small delay prior context menu closes and focus is transfered from context menu to the cell
    // In other cases (when context menu is not used), the timout is not needed
    
    let self = this;

    let editTimeout = setTimeout(function(){
        self.originalText = cell.text;
        self.isEditActive = true;
        self.editCell = cell;
        self.editorFocused = true;

        clearTimeout(editTimeout);
    }, 150);
}

///////////////row select

rowSelected(args: any) {
  var grid = (document.getElementsByClassName("e-grid")[0] as any)
    .ej2_instances[0];
  console.log(grid.getSelectedRecords());
  $('.e-grid td.e-active').css('background-color','hsl(192, 91%, 79%)').setTimeout(() => {
    
  }, 3000);
  console.log("timer");
alert
}
/////////////////column selected

onColumnClicked(args: any) {
  var grid = (document.getElementsByClassName("e-grid")[0] as any)
    .ej2_instances[0];
  console.log("column clicked",grid);
}
/////////////////////data
dataSource(args:any){
  this.dataSourceChanged1(args)
  this.treegrid.beforeBatchAdd(this.createNewColumn(),this.treegrid.columns);
}

////////////////////row selected

// rowSelected1(args:any) {
//   console.log('row index: ' , args.row.getAttribute('aria-rowindex'));
//   console.log('column index: ' , args.target.getAttribute('aria-colindex'));
// }

////////////////////////////////////////////////////////////////////
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
      summaryResult: IgxNumberSummaryOperand.min([data]),
    });
    result.push({
      key: "max",
      label: "Max",
      summaryResult: IgxNumberSummaryOperand.max([data]),
    });
    return result;
  }
}
