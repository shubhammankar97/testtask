import { HttpClient } from "@angular/common/http";
import {
  Component,
  ViewChild,
  OnInit,
  ViewEncapsulation,
  ViewContainerRef,
  ElementRef,
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
  public toolbar!: ToolbarItems[];

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

    public columns!: Array<any>;
    public rows: Array<any>;

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

  ////
    // Create element reference for dialog target element.
    @ViewChild('container', { read: ElementRef, static: true }) container!: ElementRef;

  /////////////////////////////////

  constructor(
    private api: ApiService,
    private http: HttpClient,
    private socketService: SocketioService
  ) {
    this.contextMenuSettings = {
      showContextMenu: true,
      toolbar: ["Add", "Edit", "Delete"],
    };

    this.rows = [
      { 
          id: 1,
          text: "Item1",
          cells: [{ cid: 1, text: "Item11" }, { cid: 2, text: "Item12" }, { cid: 3, text: "Item13" }],
          rows: [
              { id: 11, pid: 1, text: "Item11", cells: [{ cid: 1, text: "Item111" }, { cid: 2, text: "Item112" }, { cid: 3, text: "Item113" }] }
          ]
      },
      { id: 2, text: "Row2", cells: [{ cid: 1, text: "Item21" }, { cid: 2, text: "Item22" }, { cid: 3, text: "Item23" }] }
  ];
  }
  ngOnInit(): void {
    this.api.getAll().subscribe((res: any) => {
      this.data = res.filter((item: any) => item);
      console.log("data", this.data);
    });
    // this.selectionSettings = { type: 'Multiple', enableToggle:true,  checkboxMode: 'ResetOnRowClick',persistSelection: true};
    this.selectionSettings = { persistSelection: true };
    this.contextMenuItems = [
      { text: "Edit ", target: ".e-headercontent", id: "editCol" },
    ];
    this.sortSettings = {
      columns: [
        { field: "name", direction: "Ascending" },
        { field: "name", direction: "Descending" },
      ],
    };
    this.pageSettings = { pageSize: 6 };
    this.editOptions = { params: { format: "y/M/d" } };
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: "Dialog",
      newRowPosition: "Child",
      showDeleteConfirmDialog: true,
    };
    this.toolbar = ["Add", "Edit", "Delete", "Update", "Cancel", "Search"];
    this.dropEditSettings = { allowEditing: true, allowAdding: true };
    this.selectionOptions = {
      cellSelectionMode: "Box",
      type: "Multiple",
      mode: "dialog",
      rowSelecting: true,
    };
    this.studentidrules = { required: true, max: 150000 };
    this.studentnamerules = { required: true };
    // this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending','Edit', 'Delete', 'Save',
    //  'Cancel', 'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage', 'LastPage', 'NextPage',{ text: "EditCol ", target: ".e-headercontent", id: "editCol" },];
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
    this.startdaterules = { date: true };
    this.durationrules = { number: true, min: 0 };
    this.edit = { params: { format: "n" } };
    this.ddlfields = { text: "name", value: "id" };
    this.d1data = [
      { id: "CellEditing", name: "Cell Editing" },
      { id: "RowEditing", name: "Row Editing" },
    ];
    //close of ngOninit
    this.student = new Student();
    this.nextRow = this.data?.length + 1;
    /////////////////////////////////////////////////////////
    this.contextMenuItems = [
      { text: "Edit ", target: ".e-headercontent", id: "editCol" },
    ];
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
  }

  actionComplete(args: DialogEditEventArgs) {
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
/////////////////////////
rowSelected(args:any){
  let selectedrecords: Object[] = this.treeGridObj.getSelectedRecords(); 
  console.log("row selected working",this.treeGridObj.getSelectedRecords());
 }


////////////////////////
  beforeOpen(args: any): void {
    if (this.grid.getColumnByField("roll_no").visible == true) {
      debugger;
      $("unhide").css.display = "none";
      $("hide").css.display = "";
    } else {
      $("hide").style.display = "none";
      $("unhide").style.display = "";
    }
  }
  // Set Dialog position
  public pos: object={ X: 860, Y: 100 };

  select(args: any): void {
    //debugger
    this.selectitem = args.item.text;
    if (args.item.text === "Hide Column") {
      console.log("select hide", args);
      // this.isShown = false;
    }
    if (args.item.text === "UnHide Column") {
      this.isShown = true;
    }
    if (args.item.text === "Add Column") {
      console.log("add");
      this.showAddColumn = true;

    }
    if (args.item.text === "Edit Column") {
      console.log("edit");
      this.showEditColumn = true;

    }
    if (args.item.text === "View Column") {
      console.log("view");
      this.showViewColumn =true;
    }
    if (args.item.text === "Delete Column") {
      console.log("delete");
      this.showDelColumn = true;
      this.showEditColumn = true;

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
  addColumn(args:any)
  {

let inputEle = document.createElement("e-column");
// inputEle.type = "string";
inputEle.setAttribute("subject", "e-columns");
this.treeColumns.append(inputEle);

  }
  /////////////

  onSelect(args: any) {

    ////////////////////////
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
      this.add();
      this.treegrid.editModule.addRecord(); 

    }
    if (args.item.text === "Add Child") {
      var index = this.treeGridObj['getSelectedRowIndexes']()[0];

      this.treeGridObj.addRecord(this.data, index - 1, 'Above'); // paste as Child
    }
    if (args.item.text === "Edit Row") {
      console.log("edit row")
      this.dataStateChange(args)
      this.grid.startEdit();
    }
    if (args.item.text === "Select Rows") {
      
    }

    if (args.item.text === "Delete Rows") {
      console.log("delete",args?.getSelectedRowIndexes)
      this.delete();
      // this.selectedIndex = this.treeGridObj.getSelectedRowIndexes()[0]; // select the records on perform Copy action
      // this.selectedRecord = this.treeGridObj.getSelectedRecords()[0];
      
      this.treeGridObj.deleteRecord('taskID', this.selectedRecord); //delete the copied record
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
  ////////////Edit
  public dataStateChange(dataSourceChangedEvent: DataSourceChangedEventArgs): void {
    this.api.addRecord(dataSourceChangedEvent).subscribe(() => {
      dataSourceChangedEvent.endEdit;})
    }
  ////////AddNext
  add(){
  const rdata: object = { id: 10, name: 'Alias', roll_no: 40, class: 14 };
    (this.treeGridObj.dataSource as object[]).unshift(rdata);
    this.treeGridObj.refresh();
}
delete(): void {
    const selectedRow: number = this.grid.getSelectedRowIndexes()[0];
    if (this.grid.getSelectedRowIndexes().length) {
        (this.treeGridObj.dataSource as object[]).splice(selectedRow, 1);
    } else {
        alert('No records selected for delete operation');
    }
    this.treeGridObj.refresh();
}

///////////////////

//////////////////
  public DialogObj!: { hide: () => void };

  private okClick(): void {
    alert("you clicked OK button");
  }

  private cancelClick(): void {
    //Hide the dialog
    this.DialogObj.hide();
  }


  public treeColumns: any = [
    {
      field: "orderName",
      headerText: "Order Name",
    },
    {
      field: "category",
      headerText: "Category",
      editType: "stringedit",
      type: "string",
    },
    {
      field: "orderDate",
      headerText: "Order Date",
      textAlign: "Right",
      editType: "stringedit",
      type: "string",
    },
    {
      field: "units",
      headerText: "Units",
      editType: "stringedit",
      type: "string",
    },
  ];
  checkNewEdit!: string;

  btnclick(args: any) {
    this.hideDialog.bind(args)
    this.ejDialog2.hide();
    this.ejDialog3.hide();
    this.ejDialog4.hide();
    this.ejDialog.hide();

  }
  btnclick3(args: any) {
    this.ejDialog.hide();

    this.hideDialog3.bind(args)
  }

  //Delete Column
  public deleteColumn(args: any) {
    args.removeColumn = function () {
      this.grid.removeColumn(args);
    };

    console.log("deleteColumn:");
    if (this.checkNewEdit == "edit") {
      var catched = false;

      console.log("edit:");
      this.treeColumns.forEach((r: any) => {
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
  //show and hide column method
  show() {
    this.treeGridObj.showColumns(["Student Name", "Roll Number"]); //show by HeaderText
  }

  hide(): void {
    this.treeGridObj.hideColumns(["Class", "Roll Number"]); //hide by HeaderText

    //hide column
    let columnName: string = <string>this.dropdown1.value;
    let column = this.treegrid.getColumnByField(columnName);
    let hiddenColumns: HTMLTextAreaElement = document.getElementById(
      "hiddencolumns"
    ) as HTMLTextAreaElement;

    if (
      this.treegrid.getHeaderTable().querySelectorAll("th.e-hide").length === 3
    ) {
      alert("Atleast one Column should be visible");
    } else {
      this.treegrid.grid.hideColumns(column.headerText, "headerText");
      this.button1.disabled = true;
      this.button2.disabled = false;
      hiddenColumns.value = hiddenColumns.value + column.headerText + "\n";
    }
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
    var parentdata = {
      id: String(Math.floor(Math.random() * (100000 + 1 - 50000) + 50000)),
      name: "test",
    };

    this.treegrid.addRecord(parentdata, 8, "Above");
  }
  validation(args: any) {
    this.treegrid.endEdit();
  }

  actioncomplete(args: any) {
    console.log("action complete");
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

  public deleteRow(id: any) {
    this.treeGrid.deleteRow(id);
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

  contextMenuOpen(arg?: any): void {
    console.log("contextMenuOpen:", arg.column.field);
    
    if (arg.column.field == "id") {
      this.ColName = 'Student ID'
    }
    if (arg.column.field == "name") {
      this.ColName = 'Student Name'

    }
    if (arg.column.field == "roll_no") {
      this.ColName = 'Roll Number'

    }
    if (arg.column.field == "class") {
      this.ColName = 'Class'

    }
  }
  hider(arg: any) {
    if (arg.column.field == "id") {
      console.log("in 1 if");
      this.isShown = false;
    }
    if (arg.column.field == "name") {
      console.log("in 2 if");
      this.isShown = false;
    }
    if (arg.column.field == "roll_no") {
      console.log("in 3 if");
      this.isShown = false;
    }
    if (arg.column.field == "class") {
      console.log("in 4 if");
      this.isShown = false;
    }
  }

  shower(arg: any) {
    if (arg.column.field == "id") {
      console.log("in 1 if");
      this.isShown = true;
    }
    if (arg.column.field == "name") {
      console.log("in 2 if");
      this.isShown = true;
    }
    if (arg.column.field == "roll_no") {
      console.log("in 3 if");
      this.isShown = true;
    }
    if (arg.column.field == "class") {
      console.log("in 4 if");
      this.isShown = true;
    }
  }

  contextMenuClick(args: any): void {
    if (args.item.id === "addnext") {
      console.log("addnext");
      this.treegrid.editModule.addRecord();
      // this.checkNewEdit = "edit";
      // this.showEditColumn = true;
      // this.getCurrentField();

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
      this.treeColumns.forEach((r: any) => {
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
      console.log("ColType:", this.ColType);
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

    for (let j = 1; j <= this.columns.length; j++){
        let colId: any = this.columns[j-1].id;

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


  ///////////////////////////////////////////////////////////////////////////////////////
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
