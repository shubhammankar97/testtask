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
  FreezeService,
  ContextMenuService
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
import { TreeClipboard } from '@syncfusion/ej2-angular-treegrid';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
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
    VirtualScrollService,
    ContextMenuService,
    RowDDService      
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = "testaskk";
  public imageLoader:boolean = false
  public data: Object[]=[];
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
  public showChooseRow:boolean =false;
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

    public column:any=[];
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

  public freezeColId!:any;
  public columnNumber!: number;
  public stuName!:string[];
  public stuRoll!:number[];
  public stuId!:number[];
  public stuClass!:number[];
  public sortSetting1!:string[];
  public allowMultSort: boolean=false;
  public allowFilter: boolean = false;

  public stuCName!:string[];
  public stuCRoll!:number[];
  public stuCId!:number[];
  public stuCClass!:number[];

  public rowColdata:any;
  public col2Freeze!:number;
  public lock:boolean = false;

  public timeLeft:number =30;
  public timerId:any;
  public elem:any;
  public interval:any;
  public checRow:boolean=false;
  sourceData: any
  /////////////////////////////////
  abc =  null;
  constructor(
    private api: ApiService,
    private http: HttpClient,
    private socketService: SocketioService
  ) {
    this.sourceData = JSON.parse(localStorage.getItem('dataSource') || '{}');
    try {
      this.imageLoader = true
      this.api.getAll().subscribe((res: any) => {
        this.imageLoader = false
        this.data = res.filter((item: any) => item);
        localStorage.setItem('dataSource', JSON.stringify(this.data));
      })
      console.log(this.sourceData, "-----------------------------");
    } catch (error) {
      console.log(error, "error");
    }

 
    
    this.contextMenuSettings = {
      showContextMenu: true,
      toolbar: ["Add", "Edit", "Delete", "ColumnChooser"],
    };
  }


  ngOnInit(): void {

      // setTimeout(() => {
      //   this.data
      // }, 1000) 
      console.log("data 50k:", this.data);
  //     if(this.column.field === 'id')
  // {
  //   this.lock = true;
  // }

    this.api.getAllCol().subscribe((res:any)=>{
      console.log("column data",res);
      
    this.column = res
    if(this.column.field === 'id')
      {
        this.lock = true;
      }
    })
  console.log("column", this.column.field);
  
  this.selectionSettings = { persistSelection: true };

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
      newRowPosition:"Top",
      showConfirmDialog:true
    };
    //////////////editsetting
    this.editSetting1 = {
      allowAdding: true,
      mode: "Dialog",
      newRowPosition: "Top",
      showConfirmDialog: true,
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


    //contextmenu 2
this.contextMenuItems = [
  {
    text: 'Add Next',
    target: '.e-content',
    id: 'addnextrow',
    cssClass: 'e-flat',
  },
  {
    text: 'Add Child',
    target: '.e-content',
    id: 'addchildrow',
    cssClass: 'e-flat',
  },
  {
    text: 'Edit Row',
    target: '.e-content',
    id: 'editrow',
    cssClass: 'e-flat',
  },
  {
    text: 'Select Row',
    target: '.e-content',
    id: 'multiselectrow',
    cssClass: 'e-flat',
  },
  {
    text: 'Delete Row',
    target: '.e-content',
    id: 'deleterow',
    cssClass: 'e-flat',
  },
  { 
    text: 'Copy As Next',
   target: '.e-content',
    id: 'customCopy' 
  },
  { 
    text: 'Copy As Child',
   target: '.e-content',
    id: 'customCopy' 
  },
  {
    text: 'Move As Next',
    target: '.e-content',
    id: 'pastenextrow',
    cssClass: 'e-flat',
  },
  {
    text: 'Move As Child',
    target: '.e-content',
    id: 'pastechildrow',
    cssClass: 'e-flat',
  },
];


    this.d2data = [
      { id: "string", type: "string" },
      { id: "number", type: "number" },
      { id: "boolean", type: "boolean" },
      { id: "datetime", type: "datetime" },
      { id: "dropdownlist", type: "dropdownlist" },
    ];

    this.d3data = [
      { id: "right", type: "Right" },
      { id: "left", type: "Left" },
      { id: "Center", type: "Center" },
    ];

    this.fields = { text: "type", value: "id" };
    this.editparams = { params: { format: 'n' } };
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
          "13",
          "14",
          "15"
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


// this.column=[
//   {
//     field: 'id',
//     headerText: 'Student ID'
//   },
//   {
//     field: 'name',
//     headerText: 'Student Name'
//   },
//   {
//     field: 'roll_no',
//     headerText: 'Roll Number'
//   },
//   {
//     field: 'class',
//     headerText: 'Class'
//   }
// ];


    ///////////////////////////color row selected
    let gridInstance = this.grid;

  }


  actionComplete(args: any) {
    this.imageLoader = false
    console.log("action complete 1")
    if (args.requestType == "save") {
      var index = args.index;
      this.treegrid.selectRow(index); // select the newly added row to scroll to it
      console.log("action complete 2")
}

    if (args.requestType === "beginEdit" || args.requestType === "add") {
      const dialog = args.dialog as Dialog;
      let getVal = args;
      const TaskName = "TaskName";
      dialog.height = 400;
      console.log("dialog args val", getVal);
      // dialog.header = args.requestType === 'beginEdit' ? 'Record of ' + args.rowData[TaskName] : 'New Customer';
      
    }
  }

  public selectitem!: string[];

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

  public headermenuItems = [
    
    {
      text: "Add Column",
      id: "addCol",
      target: '.e-content',
    },
    {
      text: "Edit Column",
      id: "editCol",
      target: '.e-content',
    },
    {
      text: "View Column",
      id: "viewCol",
      target: '.e-content',
    },
    {
      text: "Delete Column",
      id: "delCol",
      target: '.e-content',
    },
    {
      text: "Choose Column",
      id: "chooseCol",
      target: '.e-content',
      iconCss:'e-checkbox'
    },
    {
      text: "Freeze Column",
      id: "freezeCol",
      target: '.e-content', 
      iconCss: ' e-icons e-select-all',
    },
    {
      text: "Filter Column",
      id: "filterCol",
      target: '.e-content',
      iconCss: ' e-icons e-select-all',
    },
    {
      text: "Multisort Column",
      id: "msortCol",
      target: '.e-content',
      iconCss: ' e-icons e-select-all',
    },
  ];

////////////////////////
  beforeOpen(args: any): void {
   console.log("beforeOpen ", args)
  }
  // Set Dialog position
  public pos: object={ X: 860, Y: 100 };

  select(args: any): void {
    this.selectitem = args.item.text;
    
    if (args.item.text === "Add Column") {
      console.log("add");
      console.log("col",this.column);

      this.showAddColumn = !this.showAddColumn;
   }
    if (args.item.text === "Edit Column") {
      console.log("edit");
      this.showEditColumn = !this.showEditColumn;
      this.startTimer();
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
      console.log("ID freeze", this.freezeColId);
      if(this.column.id==this.freezeColId)
      {
        this.column.allowFreezing = true;
      };
    //   this.column.freeze = 'Left';
    this.col2Freeze = this.freezeColId
      
    }
    if (args.item.text === "Filter Column") {
      console.log("Filter");
      this.allowFilter = !this.allowFilter;

    }
    if (args.item.text === "Multisort Column") {
      console.log("Multisort");
      this.allowMultSort = !this.allowMultSort;
      
    }
  }
////countdown
startTimer() {
  this.interval = setInterval(() => {
    if(this.timeLeft > 0) {
      this.timeLeft--;
    } else {
      this.ejDialog.hide();
      // this.timeLeft = 30;
    }
  },1000)
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
    
    if (args.item.text !== "Add Column" && args.item.text !== "Edit Column" && args.item.text !== "Delete Column" && args.item.text !== "View Column") {
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
  clicked(): void {
    let columnName = { field: this.ColName,type: this.ColType };
    this.treegrid.columns.splice(this.column.length+1, 0, columnName); //Add the columns
    this.api.addColumn(columnName).subscribe((res:any)=>{
      console.log("column appended", columnName.field);  
      
    })
    this.treegrid.refreshColumns();
    this.treegrid.endEdit;
    this.ejDialog.hide();
  }

///////
  removeColumn(args:any) {
    console.log("removecol",args);

    for(let i of this.column)
    {
      console.log("yess")
      if(i.field == args)
      {
        console.log("ID:",i.id);
        this.api.deleteColumn(i.id).subscribe((res:any)=>{
          console.log("delete column", res);
        });
      }
    }
    
    
    // this.treegrid.columns.pop();
    this.treegrid.refreshColumns();
    this.treegrid.endEdit;
    this.ejDialog.hide();
}
  //////////////////

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
      console.log("choose row");
      this.showChooseRow = true;
      if(args.column.field == 'checkbox')
      {
        console.log("select row", args.column.field);
        this.checRow = true;
      }
    }

    if (args.item.text === "Delete Rows") {
      console.log("delete",args);
      this.showDeleteRow = true;
      this.delete();
    }

    if (args.item.text === "Copy As Next") {
      console.log("copy as Next");
      this.treeGridObj.copy();
      console.log(" copy may work check");
    }

    if (args.item.text === "Copy As Child") {
      console.log("copy as child");
      this.treeGridObj.copy();
    }
    if (args.item.text === "Move As Next") {
    }
    if (args.item.text === "Move As Child") {
    }
    if (args.item.text === "MoveAsChild") {
    }
  }

  ////////copy record
  copy(){
    var grid = (document.getElementsByClassName("e-grid")[0] as any).ej2_instances[0];
    console.log("add next function ", grid.getSelectedRecords()[0]);
    let getdata = grid.getSelectedRecords()[0];
    this.treeGridObj.clipboardModule.copy(getdata);
    console.log("add next function before ", grid.getSelectedRecords()[0]);

    getdata?.clipboardModule.copy();
    console.log("add next function after ", grid.getSelectedRecords()[0]);


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
    var i = 50001;
    var data = {
      id: i + 1,
      name: this.stuName,
      roll_no: this.stuRoll,
      class: this.stuClass
    };
    this.treeGridObj.addRecord(data, this.rowIndex, 'Top'); //aadd record use can add row top orbelow using new row position
    $(data.id).style.backgroundColor = "blue";
    this.treeGridObj.endEdit;
    this.ejDialog.hide();
  //   let si: HTMLInputElement =  document.getElementById('dialog')?.querySelector('#sid')!;
  //   let sn: HTMLInputElement =  document.getElementById('dialog')?.querySelector('#sname')!;
  //   let sr: HTMLInputElement =  document.getElementById('dialog')?.querySelector('#sroll')!;
  //   let sc: HTMLInputElement =  document.getElementById('dialog')?.querySelector('#sclass')!;
  // console.log("sn val",sn.value)
  //   var data = [{
  //     id:si.value,
  //     name: sn.value,
  //     roll_no:sr.value,
  //     class: sc.value
  //   }]


  //   var grid = (document.getElementsByClassName("e-grid")[0] as any).ej2_instances[0];
  //   console.log("add next function ", grid.getSelectedRecords()[0].id);
  //   this.api.addData(data).subscribe(()=>{
  // console.log("add Data api")
  //   });
  //   console.log(this.stuClass.values);
  //     this.ejDialog.hide();
}
///////////////add Child
addChild(args:any){

  var i;
    var rec:any=[]
    ///////
    if (this.flag == false) {
      i = this.treeGridObj.flatData.length;

      this.flag = true;
    } else {
      rec = this.treeGridObj?.getBatchChanges();
      if (rec?.addedRecords) {
        i = rec.addedRecords[0].id;
      }

      this.j++;
    }

    var data = {
      id: i + 1,
      name: 'test',
    };

    var treegridInst = this.treeGridObj;
    var selectedRecord = this.selectedRecord;
   
      var index = this.treeGridObj['getSelectedRowIndexes']()[0];
      console.log("context new add child");

      this.treeGridObj.addRecord(data, index - 1, 'Above'); // paste as Child
  
    ///////
    if (args.item.text === "Edit Column") {
      this.checkNewEdit = "edit";
      this.showEditColumn = true;
      this.getCurrentField();
    } 
    if (args.item.id === "addnext") {
      console.log("addnext");
      this.treegrid.editModule.addRecord();
    }
    /////////////////////

  this.editSetting1 = {
    allowAdding: true,
    mode: "Dialog",
    newRowPosition: "Child"
  };
  console.log("addChild clicked")
  var childRow = {
    name: 'newRow'
  };
  this.treeGridObj?.addRecord(childRow, args.index,"Below"); // call addRecord method with data and index of parent record as parameters
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


////////////row drag and drop
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
   var i = 50001;
   var dataC = {
    id: i + 1,
    name: this.stuCName,
    roll_no: this.stuCRoll,
    class: this.stuCClass
  };
console.log("data child",dataC)
  this.treeGridObj.addRecord(dataC, this.rowIndex, 'Child'); //add child row
  this.api.addData(dataC).subscribe(()=>{
    console.log("data added");
  })
  this.treeGridObj.endEdit;
    /////////////////
    var grid = (document.getElementsByClassName("e-treegrid")[0] as any).ej2_instances[0];
  console.log(grid.getSelectedRecords()[0].id);
  console.log("index",grid.getSelectedRecords()[0].getSelectedRowIndexes);

 

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
    this.freezeColId = arg.column.id;
    this.rowIndex = arg.rowInfo.rowIndex;
    this.cellIndex = arg.rowInfo.cellIndex;

    this.rowIndex = arg.rowInfo.rowIndex;
    let elem: Element = arg.event.target as Element;

    for(let item of this.column){
      if(arg.column.field === item.field)
      {
        this.columnValue = item.id;
        this.columnField = item.field;
        this.ColName = item.field.substr(0,1).toUpperCase() + item.field.substr(1);
        this.ColType =  item.type;
        this.ColAlign = item.align;
      }
      else{}
    }

    
    let row: Element = elem.closest(".e-row")!;
    let uid: string = row && row.getAttribute("data-uid")!;

    var grid = (document.getElementsByClassName("e-grid")[0] as any).ej2_instances[0];
    console.log("delete function ", grid.getSelectedRecords()[0].id);
     grid.getCurrentField

    for(let i of this.column)
    {
      console.log("rowColdata", i);
      this.rowColdata = grid.getSelectedRecords()[0].id;
      console.log("after rowColdata",this.rowColdata);
    }

  }

  contextMenuClick(args: any): void {
    console.log("contextMClick",args);

    if (args.item.id === "editCol") {
      this.checkNewEdit = "edit";
      this.showEditColumn = true;
      this.getCurrentField();
    } 
    if (args.event.target.classList.contains('e-checkboxspan')) {
      var checkbox = args.element.querySelector('.e-checkbox');
      checkbox.checked = !checkbox.checked;
    }
    if(args.item.id === "multiselectrow")
    {
      console.log("contexmenu select")
      this.showChooseRow = true;
    }

    var i = 50001;
    var data = {
      id: i + 1,
      name: this.stuName,
      roll_no: this.stuRoll,
      class: this.stuClass
    };
    var dataC = {
      id: i + 1,
      name: this.stuCName,
      roll_no: this.stuCRoll,
      class: this.stuCClass
    };

    var treegridInst = this.treeGridObj;
    var selectedRecord = this.selectedRecord;
    if (args.item.id === 'addnextrow') {
      this.showAddNext =true;
    } else if (args.item.id === 'addchildrow') {
      this.showAddchild = true;
    } else if (args.item.id === 'deleterow') {
      this.treeGridObj.deleteRecord('id', selectedRecord); // delete the selected row
      this.treeGridObj.endEdit();
    } else if (args.item.id === 'editrow') {
      console.log("edit row");
      this.showEditRow = true;
      this.startTimer();
    } else if (args.item.id === 'multiselectrow') {
      console.log("select mult")
      if(args.field === 'checkbox'){
        args.validation.required = true;
      }
      this.showChooseRow =true;
      this.startTimer(); 
      this.treeGridObj.endEdit();
      // $('.e-grid td.e-active').css('background-color','hsl(192, 91%, 79%)').setTimeout(() => {
      //   this.treeGridObj.selectionSettings.type = 'Multiple'; //enable multiselection
    
      // }, 3000);
    } else if (args.item.id === 'customCopy') {
      this.selectedIndex = this.treeGridObj['getSelectedRowIndexes']()[0]; // select the records on perform Copy action
      this.selectedRecord = this.treeGridObj['getSelectedRecords']()[0];
    } else if (args.item.id === 'pastenextrow') {
      
      var index = this.treeGridObj['getSelectedRowIndexes']()[0]; //delete the copied record
      var record = this.treeGridObj['getSelectedRecords']()[0];
      this.treeGridObj.deleteRecord('id', this.selectedRecord);
      this.treeGridObj.addRecord(this.selectedRecord, index, 'Top'); //Paste as Sibling or another separate row using Below, Above or Top newRowPosition
    } else if (args.item.id === 'pastechildrow') {
      this.treeGridObj.deleteRecord('id', this.selectedRecord); //delete the copied record
      var index = this.treeGridObj['getSelectedRowIndexes']()[0];

      this.treeGridObj.addRecord(this.selectedRecord, index - 1, 'Child'); // paste as Child
    }
   this.treegrid.endEdit;
  
  }

  

  saveColEdit(args:any){
    console.log("saveColEdit:", args);
    if (this.checkNewEdit == 'edit') {
      var catched = false;
 
    console.log("edit:",this.column);
 
      this.treegrid.columns.forEach((r:any) => {
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
          this.treegrid.refreshColumns();
          this.treegrid.refreshColumns(true);
          this.treegrid.endEdit;
        }

        if (r.field == this.columnField) {
          console.log('r.field:', r.field, 'columnField:', this.columnField);
          r.headerText = this.ColName;
          r.type = this.ColType;
          r.textAlign = this.ColAlign;
          r['customAttributes'] = { class: 'cssClassaa' };
          this.treegrid.dataSourceChanged.endEdit;
          this.treegrid.refreshColumns(true);
          this.treegrid.endEdit;
        }
      });

   
      this.treegrid.refreshColumns(true);
      this.textWrap = this.ColChecked;
    }

    this.showEditColumn = false;
    this.treegrid.endEdit();
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

// rowSelected(args: any) {
// //   var grid = (document.getElementsByClassName("e-grid")[0] as any)
// //     .ej2_instances[0];
// //   console.log(grid.getSelectedRecords());
// //   $('.e-grid td.e-active').css('background-color','hsl(192, 91%, 79%)').setTimeout(() => {
    
// //   }, 3000);
// //   console.log("timer");
// // alert
// }
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
doSomething() {
  this.ejDialog.hide();
  // throw new Error("Function not implemented.");
}
// checkB(args:any){
//   if(args.field === 'checkbox')
//   {
//     args.validation.required = true;
//   }
// }

toolbarClick(args: ClickEventArgs) {
  console.log(args, "Add toolbar");
  
  this.imageLoader = true;
  console.log("add")
  if (this.treeGridObj && args.item.text === 'Add') {
    // this.imageLoader =false;
  }
 
}

}

