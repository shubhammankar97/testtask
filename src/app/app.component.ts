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
  ColumnChooserService,
  FreezeService,
  ContextMenuService,
  extendArray,
  CommandColumnService,
  CellSaveEventArgs,
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
  parentsUntil,
} from "@syncfusion/ej2-angular-grids";
import { Dialog } from "@syncfusion/ej2-popups";
import { SocketioService } from "./socketio.service";
import {
  ContextMenuComponent,
  DataBoundEventArgs,
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
import { Student } from "./student";
import { BeforeOpenCloseEventArgs } from "@syncfusion/ej2-angular-inputs";
import { EmitType } from "@syncfusion/ej2-base";
import { Query, DataManager, JsonAdaptor } from "@syncfusion/ej2-data";
import { Internationalization, isNullOrUndefined } from "@syncfusion/ej2-base";
import { TreeClipboard } from "@syncfusion/ej2-angular-treegrid";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import {
  createSpinner,
  showSpinner,
  hideSpinner,
} from "@syncfusion/ej2-angular-popups";
import {
  RowDataBoundEventArgs,
  BeginEditArgs,
  SaveEventArgs,
} from "@syncfusion/ej2-grids";
import { addClass, removeClass, loadCldr } from "@syncfusion/ej2-base";
import { interval } from "rxjs";
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
    RowDDService,
    CommandColumnService,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = "testaskk";
  public imageLoader: boolean = false;
  public data: Object[] = [];
  public sortSettings!: SortSettingsModel;
  public pageSettings!: PageSettingsModel;
  public editSettings!: EditSettingsModel;
  // public selectionSettings!: SelectionSettingsModel;
  public toolbar!: ToolbarItems[];

  public editOptions!: Object;
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
  @ViewChild("dialog")
  public alertDialog!: DialogComponent;
  public edit!: Object;
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
  public showChooseRow: boolean = false;
  public showNewColumn: boolean = false;
  public showAddNext: boolean = false;
  public showDeleteRow: boolean = false;
  public showEditRow: boolean = false;
  public showAddchild: boolean = false;

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

  public column: any = [];
  public rows!: Array<any>;

  // Add Remove
  private columnCount: number = 4;
  private rowCount: number = 3;

  // Editing
  private isEditActive: boolean = false;
  public editCell: any = null;
  private originalText: string = "";
  public editorFocused: boolean = false;

  //dialog
  // The Dialog shows within the target element.
  public targetElement!: HTMLElement;
  public targetElement3!: HTMLElement;

  // Create element reference for dialog target element.
  @ViewChild("container", { read: ElementRef, static: true })
  container!: ElementRef;
  // Dialog animation
  public dialogAnimation: Object = { effect: "Zoom", duration: 400, delay: 0 };
  public animationSettings: Object = {
    effect: "Zoom",
    duration: 400,
    delay: 0,
  };

  count: number = 0;

  public editSetting1!: EditSettingsModel;

  public freezeColId!: any;
  public columnNumber!: number;
  public stuName!: string[];
  public stuRoll!: number[];
  public stuId!: number[];
  public stuClass!: number[];
  public sortSetting1!: string[];
  public allowMultSort: boolean = false;
  public allowFilter: boolean = false;

  public stuCName!: string[];
  public stuCRoll!: number[];
  public stuCId!: number;
  public stuCClass!: number[];

  public stuRCName!: string[];
  public stuRCRoll!: number[];
  public stuRCClass!: number[];
  public stuRCId!: number;

  public stuNamen!: any;
  public stuRolln!: any;
  public stuClassn!: any;

  public rowColdata: any;
  public col2Freeze!: number;
  public lock: boolean = false;

  public timeLeft: number = 30;
  public timeRemain: number = 10;
  public timerId: any;
  public elem: any;
  public interval: any;
  public checRow: boolean = false;
  sourceData: any;
  numberOfClicks = 1;
  number: any;
  store: any;
  getValue: any;
  call: number = 1;
  ssid: any = Math.floor(Math.random() * 10);
  tabID: any = 1;
  start: any;
  isLock: boolean = true;
  public selIndex: number[] = [];
  checkB: boolean = false;
  public flagg: number = 0;
  public change: boolean = false;
  public offCustom: any;
  public previouSelected: any = -1;
  public close: boolean = false;
  // public taskData!: ItaskModel;
  public value: string = "";
  public model!: object;
  public stuCid!: number;
  public intervalID: any;
  public highlightChild: boolean = false;
  public highlightNext: boolean = false;
  public parentId: any;
  public childPid: boolean = false;
  /////////////////////////////////
  abc = null;
  filtersLoaded!: Promise<boolean>;

  constructor(private api: ApiService, private socketService: SocketioService) {
    // console.log = function () {};
    this.offCustom = this.customAttributes;
    this.imageLoader = true;
    showSpinner(document.getElementById("loader-container") as HTMLElement);
    this.api.getAll().subscribe((res: any) => {
      showSpinner(document.getElementById("loader-container") as HTMLElement);
      this.imageLoader = true;
      this.data = res.filter((item: any) => item);

      this.imageLoader = false;

      if (this.data.length) {
        this.imageLoader = false;
        hideSpinner(document.getElementById("loader-container") as HTMLElement);
      }
    });
    //get the Grid model.
    this.value = localStorage.getItem("treegrid")!;
    console.log("locaL::", localStorage.getItem("treegrid"));
    $(".e-treegrid .e-headercell.cssClassaa").css(
      "background-color",
      localStorage.getItem("treegrid")
    );
    $("th.e-headercell.e-leftalign.e-mousepointer").css(
      "background-color",
      localStorage.getItem("treegrid")
    );
    $("th.e-headercell.cssClassaa.e-mousepointer").css(
      "background-color",
      localStorage.getItem("treegrid")
    );
    $(".e-headercell .e-mousepointer").css(
      "background-color",
      localStorage.getItem("treegrid")
    );
    this.contextMenuSettings = {
      showContextMenu: true,
      toolbar: ["Add", "Edit", "Delete", "Update", "Cancel", "ColumnChooser"],
    };
    this.tabID =
      sessionStorage["tabID"] && sessionStorage["closedLastTab"] !== "2"
        ? (sessionStorage["tabID"] = this.call + 1)
        : (sessionStorage["tabID"] = this.call++);
    sessionStorage["closedLastTab"] = "2";
    $(window).on("unload beforeunload", function () {
      sessionStorage["closedLastTab"] = "1";
    });
  }
  ///////////////////////////////////////////
  // public alertDlgButtons: Object[] = [
  //   {
  //     buttonModel: {
  //       content: 'Cancel',
  //       cssClass: 'e-flat',
  //     },
  //     click: (() =>{
  //       // this.countdownClock(0, true); // here we call the timer
  //       // this.hide(); // hide the dialog using dialog's hide method
  //     }),
  //   },
  // ];

  ////////////////////////////////////////////===================

  ngOnInit(): void {
    this.imageLoader = true;
    this.api.getAllCol().subscribe((res: any) => {
      this.column = res;
      this.imageLoader = false;
    });
    console.log("column", this.column);
    this.getFiltersSubscription();
    $("#dim").css("pointer-events", "none");
    this.editSettings = {
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      allowEditOnDblClick: false,
      allowNextRowEdit: true,
      mode: "Dialog",
      showDeleteConfirmDialog: true,
      newRowPosition: "Below",
      showConfirmDialog: true,
    };

    this.editSetting1 = {
      allowAdding: true,
      allowEditing: true,
      mode: "Dialog",
      newRowPosition: "Child",
    };
    /////////
    this.toolbar = ["Add", "Edit", "Delete", "Update", "Cancel", "Search"];
    this.dropEditSettings = { allowEditing: true, allowAdding: true };
    this.selectionOptions = {
      cellSelectionMode: "Box",
      type: "Multiple",
      allowColumnSelection: true,
    };
    this.studentidrules = { required: true, max: 150000 };
    this.studentnamerules = { required: true };
    this.customAttributes = { class: "customcss" };

    this.socketService.setupSocketConnection();

    //contextmenu 2
    this.contextMenuItems = [
      {
        text: "Add Next",
        target: ".e-content",
        id: "addnextrow",
        cssClass: "e-flat",
      },
      {
        text: "Add Child",
        target: ".e-content",
        id: "addchildrow",
        cssClass: "e-flat",
      },
      {
        text: "Edit Row",
        target: ".e-content",
        id: "editrow",
        cssClass: "e-flat",
      },
      {
        text: "Select Row",
        target: ".e-content",
        id: "multiselectrow",
        cssClass: "e-flat",
      },
      {
        text: "Delete Row",
        target: ".e-content",
        id: "deleterow dim",
        cssClass: "e-flat",
      },
      {
        text: "Copy As Next",
        target: ".e-content",
        id: "customCopy dim",
      },
      {
        text: "Copy As Child",
        target: ".e-content",
        id: "customCopy dim",
      },
      {
        text: "Move As Next",
        target: ".e-content",
        id: "pastenextrow dim",
        cssClass: "e-flat",
      },
      {
        text: "Move As Child",
        target: ".e-content",
        id: "pastechildrow dim",
        cssClass: "e-flat",
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
      { id: "left", type: "Left" },
      { id: "center", type: "Center" },
      { id: "right", type: "Right" },
      { id: "justify", type: "Justify" },
    ];

    this.fields = { text: "type", value: "id" };
    this.editparams = { params: { format: "n" } };
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
          "15",
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

    this.d1data = [
      { id: "CellEditing", name: "Cell Editing" },
      { id: "RowEditing", name: "Row Editing" },
    ];
    //close of ngOninit
    this.student = new Student();
    this.nextRow = this.data?.length + 1;
  }

  getFiltersSubscription() {
    this.imageLoader = true;
    this.api.getAllCol().subscribe((res: any) => {
      this.column = res;
      // this.imageLoader = false;
    });
  }

  public async actionComplete(args: any) {
    // this.imageLoader = false
    console.log("action complete 1-------------", args);
    if (args.requestType == "save") {
      console.log("Save Clicked");

      var index: number = args.index.id;
      console.log("indexxxx", index);
      console.log("args.data", args.data.id);
      var new_row = this.treegrid.selectRow(index + 1); // select the newly added row to scroll to it
      console.log("action complete!!!", this.treegrid.selectRow(index + 1));
    }
    hideSpinner(document.getElementById("loader-container") as HTMLElement);
    if (args.requestType === "beginEdit" || args.requestType === "add") {
      const dialog = args.dialog;
      const StudentID = "StudentID";
      dialog.showCloseIcon = false;
      dialog.height = 400;
      // change the header of the dialog
      // dialog.data = this.data.length + 1;
      dialog.header =
        args.requestType === "beginEdit"
          ? "Edit Record of " + args.rowData["StudentID"].id(this.data.length)
          : "Add Customer";
    }

    if (args.requestType == "refreshDataSource") {
      console.log("check--------->", this.treegrid.getCurrentViewRecords);
    }
    if (args.requestType == "save") {
      console.log("action ADDD");
      this.ejDialog.hide();
      var a = this.treeGridObj.selectRow(args.index, true);
      console.log("selectRow", a);

      //////////////////////Next New Row Highlight
      if (this.highlightNext == true) {
        console.log("highlightNextin", this.highlightNext);
        var index = this.treeGridObj["getSelectedRowIndexes"]()[0];
        var x = this.treegrid.getRowByIndex(args.index);

        x.classList.add("newclass_add"); // add the background color
        setInterval(() => {
          if (this.timeRemain > 0) {
            this.timeRemain--;
            $(".newclass_add").css("background-color", "#85dffa");
            console.log("timeRemain");
          } else {
            this.flagg = 1;
            $(".newclass_add").css("background-color", "#fafafa");
          }
        }, 1000);
        if (this.flagg == 1) {
          this.stop();
          $(".newclass_add").css("background-color", "#fafafa");
        }
      }
      //////////////////////Child New Row Highlight
      if (this.highlightChild == true) {
        console.log("highlightChildin", this.highlightChild);
        var index = this.treeGridObj["getSelectedRowIndexes"]()[0];
        var y = this.treegrid.getRowByIndex(index - 1);
        //  console.log("selected_rowInfo",selected_rowInfo);
        console.log("yyyyy", y);
        y.classList.add("newclass_add"); // add the background color
        setInterval(() => {
          if (this.timeRemain > 0) {
            this.timeRemain--;
            $(".newclass_add").css("background-color", "#85dffa");
            console.log("timeRemain");
          } else {
            this.flagg = 1;
            $(".newclass_add").css("background-color", "#fafafa");
          }
        }, 1000);
        if (this.flagg == 1) {
          this.stop();
          $(".newclass_add").css("background-color", "#fafafa");
        }
      }

      console.log("", this.data);
    }
  }

  public selectitem!: string[];

  public editing!: EditSettingsModel;
  getVal(asdasd: any) {
    alert(asdasd);
  }
  ////////////cruds
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
      target: ".e-content",
    },
    {
      text: "Edit Column",
      id: "editCol",
      target: ".e-content",
    },
    {
      text: "View Column",
      id: "viewCol",
      target: ".e-content",
    },
    {
      text: "Delete Column",
      id: "delCol",
      target: ".e-content",
    },
    {
      text: "Choose Column",
      id: "chooseCol",
      target: ".e-content",
      cssClass: "ejs-checkbox",
    },
    {
      text: "Freeze Column",
      id: "freezeCol",
      iconCss: " e-icons",
      cssClass: "ejs-checkbox",
    },
    {
      text: "Filter Column",
      id: "filterCol",
      target: ".e-content",
      cssClass: "ejs-checkbox",
    },
    {
      text: "Multisort Column",
      id: "msortCol",
      target: ".e-content",
      cssClass: "ejs-checkbox",
    },
  ];

  ////////////////////////
  beforeOpen(args: any): void {
    console.log("beforeOpen ", args);
  }
  // Set Dialog position
  public pos: object = { X: 860, Y: 100 };

  select(args: any): void {
    console.log("select method", args.item.text);
    this.selectitem = args.item.text;
    if (args.item.properties.id == "addCol") {
      console.log("under if cond.");
      // this.column[args.column.index].lock = true;
    }

    if (args.item.text == "Add Column") {
      this.isLock = false;
      this.offCustom = "";
      console.log("message", this.lock, args);
      this.lock = true;
      this.start = this.customAttributes;
      setInterval(() => {
        console.log("werwerwrwrwer");
        if (this.close !== true) {
          if (this.timeLeft > 0) {
            this.timeLeft--;
            console.log("timer start");
            console.log("close if out");
          }
        } else {
          this.flagg = 1;
        }
      }, 1000);
      if (this.flagg == 1) {
        this.stop();
        this.ejDialog.hide();
        console.log("{{", this.ejDialog.hide());
        args.disableRow = false;
        // this.column[args.column.index].lock = false;
        this.lock = false;
      }
      alert("Failed to lock Column");

      console.log("error", this.lock);
      console.log("add", this.treegrid.getColumnFieldNames());
      console.log("column Field", this.columnField);

      this.showAddColumn = !this.showAddColumn;
    }
    this.isLock = true;
    if (args.item.text === "Edit Column") {
      console.log("edit");
      this.showEditColumn = !this.showEditColumn;
      this.checkNewEdit = "edit";
      this.getCurrentField();
      this.startTimer();
      this.isLock = false;
      this.offCustom = "";
      this.lock = true;
      this.start = this.customAttributes;
    }
    if (args.item.text === "View Column") {
      console.log("view");
      this.showViewColumn = !this.showViewColumn;
    }
    if (args.item.text === "Delete Column") {
      console.log("delete");
      this.showDelColumn = !this.showDelColumn;
    }
    if (args.item.text === "Choose Column") {
      console.log("Choose");
      // this.toolbar = [ "ColumnChooser"];
      this.treegrid.openColumnChooser();
    }
    if (args.item.text === "Freeze Column") {
      console.log("Freeze", args);
      console.log("ID freeze", this.freezeColId);
      // this.treegrid.enableVirtualization = true;
      this.treegrid.enableInfiniteScrolling = false;
      // this.treegrid.frozenColumns = this.freezeColId.index;
      if (this.column.id == this.freezeColId) {
        console.log("under freeze IF");

        this.column.allowFreezing = true;
        this.column.ColMinWidth = 70;
      }
      this.column.freeze = "Left";
      this.col2Freeze = this.freezeColId;
    }
    if (args.item.text === "Filter Column") {
      console.log("Filter");
      this.allowFilter = !this.allowFilter;
      this.treeGridObj.selectCheckboxes;
    }
    if (args.item.text === "Multisort Column") {
      console.log("Multisort");
      this.allowMultSort = true;
    }
  }
  ////countdown
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.flagg = 1;
      }
    }, 1000);
    if (this.flagg == 1) {
      this.stop();
      this.ejDialog.hide();
    }
  }

  /////////////////
  context(arg: any) {
    console.log("context arg", arg.selectedRecord);
  }
  //dialog///////////////////////////////

  // Hide the Dialog when click the footer button.
  public hideDialog: EmitType<object> = () => {
    this.ejDialog.hide();
  };

  public hideDialog3: EmitType<object> = () => {
    this.ejDialog.hide();
  };
  // Enables the footer buttons
  public buttons: Object = [
    {
      click: this.hideDialog.bind(this),
      // Accessing button component properties by buttonModel property
      buttonModel: {
        content: "OK",
        isPrimary: true,
      },
    },
    {
      click: this.hideDialog.bind(this),
      buttonModel: {
        content: "Cancel",
      },
    },
  ];
  public onOpenDialog = (event: any): void => {
    // Call the show method to open the Dialog
    this.ejDialog.show();
  };

  public itemBeforeEvent(args: MenuEventArgs) {
    if (
      args.item.text !== "Add Column" &&
      args.item.text !== "Edit Column" &&
      args.item.text !== "Delete Column" &&
      args.item.text !== "View Column" &&
      args.item.text !== "Choose Column"
    ) {
      let shortCutSpan: HTMLElement = document.createElement("span");
      let text: string = args.item.text!;
      args.element.textContent = "";

      this.inputEle = document.createElement("input");
      this.inputEle.type = "checkbox";
      this.inputEle.setAttribute("class", "ejs-checkbox");
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
    let columnName = { field: this.ColName, type: this.ColType };
    this.treegrid.columns.splice(this.column.length + 1, 0, columnName); //Add the columns
    this.api.addColumn(columnName).subscribe((res: any) => {
      // console.log("column appended", columnName.field);
    });

    this.treegrid.refreshColumns();
    // this.treegrid.endEdit;
    this.ejDialog.hide();
    // this.column[arg.column.index].lock = false;
  }

  ///////
  removeColumn(args: any) {
    console.log("removecol", args);

    for (let i of this.column) {
      console.log("yess", i);
      if (i.field == args) {
        console.log("ID:", i.id);
        this.api.deleteColumn(i.id).subscribe((res: any) => {
          console.log("delete column", res);
        });
        this.treegrid.refreshColumns();
      }
    }

    // this.treegrid.columns.pop();
    this.treegrid.refreshColumns();
    this.treegrid.endEdit;
    this.ejDialog.hide();
    args.disableRow = false;
  }
  //////////////////

  onSelect(args: any) {
    var selectedRecord = this.selectedRecord;
    if (
      !args.event.target.classList.contains("ejs-checkbox") &&
      args.item.text !== "Edit Row"
    ) {
      var checkbox = args.element.querySelector(".ejs-checkbox");
      checkbox.checked = !checkbox.checked;
    }
    if (args.item.text === "Add Child") {
      this.showAddchild = true;
      this.stuCId = this.data.length + 1;
    }
    if (args.item.text === "Edit Row") {
      console.log("edit row");
      this.showEditRow = true;
      this.stuRCId = this.data.length + 1;
      if (this.grid.getSelectedRecords().length) {
        this.grid.startEdit(); // handle the grid actions as per your requirement here.
        alert("First Select any row");
      } else {
        alert("Select any row");
      }
    }
    if (args.item.text === "Select Row") {
      console.log("choose row");
      this.showChooseRow = true;
    }

    if (args.item.text === "Delete Row") {
      console.log("delete", args);
      if (this.enabe) {
        console.log("enabEEEE");
        args.cancel = false;
        this.showDeleteRow = true;
        this.delete();
      } else {
        args.cancel = true;
        alert("Your current Move/DelRow(s) shall lead to Orphan row(s)");
      }

      // if(args.item.text=== "Delete Row"){
      //   console.log("AgAin Delete row clicked");
      //   alert("Your current Move/DelRow(s) shall lead to Orphan row(s)");
      // }
    }

    if (args.item.text === "Copy As Next") {
      console.log("copy as Next");
      if (this.enabe) {
        console.log("enabEEEECopy");
        args.cancel = true;
      }
      this.treeGridObj.copy();
      console.log(" copy may work check");
      // this.timeLeft = 10

      setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.selectedRecord;
        } else {
          this.flagg = 1;
        }
      }, 1000);
      if (this.flagg == 1) {
        this.stop();
      }
    }

    if (args.item.text === "Copy As Child") {
      console.log("copy as child");
      if (this.enabe) {
        console.log("enabEEEE");
        args.cancel = true;
      }
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
  copy() {
    var grid = (document.getElementsByClassName("e-grid")[0] as any)
      .ej2_instances[0];
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
  public dataStateChange(
    dataSourceChangedEvent: DataSourceChangedEventArgs
  ): void {
    this.api.addRecord(dataSourceChangedEvent).subscribe(() => {
      dataSourceChangedEvent.endEdit;
    });
  }
  ////////Add Next

  addNext(dataSourceChangedEvent: DataSourceChangedEventArgs): void {
    console.log("row Index", this.rowIndex);

    console.log(this.stuRCName, "this.stuCName");
    console.log(this.stuRCRoll, "this.stuCRoll");
    console.log(this.stuRCClass, "his.stuCClass");
    var data = {
      id: this.data.length + 1,
      name: this.stuRCName,
      rollNo: this.stuRCRoll,
      class: this.stuRCClass,
    };
    this.stuRCId = this.data.length + 1;
    console.log("data child", data);
    if (dataSourceChangedEvent.action === "add") {
      this.api.addRecord(dataSourceChangedEvent).subscribe(() => {
        dataSourceChangedEvent.endEdit;
      });
    }
    this.treegrid.addRecord(data, this.rowIndex, "Below"); //aadd record use can add row top orbelow using new row position
    this.data.splice(this.rowIndex, 0, data);
    this.api.addData(data).subscribe(() => {
      console.log("data added");
    });
    this.treeGridObj.refresh();
    this.treeGridObj.refreshHeader();
    this.treeGridObj.endEdit;
    this.ejDialog.hide();
  }
  ///////////////add Child
  addNextt(args: any) {
    console.log("addNexttt");
    this.ejDialog.hide();
    var i;
    var rec: any = [];
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
    var index = this.treeGridObj["getSelectedRowIndexes"]()[0];

    console.log("treegrid befORE addrecord working", index);

    if (this.childPid) {
      var index = this.treeGridObj["getSelectedRowIndexes"]()[0];

      console.log("Yes trueee");
      let data = {
        id: this.data.length + 1,
        name: this.stuRCName,
        rollNo: this.stuRCRoll,
        class: this.stuRCClass,
        nextID: index,
        parentID: this.parentId,
        check: true,
      };
      this.api.addNext(data).subscribe(() => {
        console.log("addNext API working or not check first");
      });
    } else {
      var index = this.treeGridObj["getSelectedRowIndexes"]()[0];

      console.log("yes its Falssse");
      let data = {
        id: this.data.length + 1,
        name: this.stuRCName,
        rollNo: this.stuRCRoll,
        class: this.stuRCClass,
        nextID: index,
        check: false,
      };
      this.api.addNext(data).subscribe(() => {
        console.log("addNext API working or not check first");
      });
    }

    this.stuRCId = this.data.length + 1;
    this.treegrid.refresh();
    // var q = args.splice(index, 0, data);
    // this.treegrid.setRowData(index -1,q); // optional
    // this.api.update({
    //   add: data,
    //   addIndex: index
    // });
    // this.treeGridObj.addRecord(data, index + 1, "Below"); // as Child
    console.log("treegrid addrecord working");

    this.treeGridObj.endEdit;
  }
  ///////////////edit Row
  editRow() {
    let si: HTMLInputElement = document
      .getElementById("dialog")
      ?.querySelector("#sid")!;
    let sn: HTMLInputElement = document
      .getElementById("dialog")
      ?.querySelector("#sname")!;
    let sr: HTMLInputElement = document
      .getElementById("dialog")
      ?.querySelector("#sroll")!;
    let sc: HTMLInputElement = document
      .getElementById("dialog")
      ?.querySelector("#sclass")!;
    console.log("sn val", sn.value);
    var grid = (document.getElementsByClassName("e-grid")[0] as any)
      .ej2_instances[0];
    var data = [
      {
        id: grid.getSelectedRecords()[0].id,
        name: sn.value,
        rollNo: sr.value,
        class: sc.value,
      },
    ];

    var dataa = [
      {
        id: this.data.length + 1,
        name: this.stuName,
        rollNo: this.stuRoll,
        class: this.stuClass,
      },
    ];

    console.log("ID::", si);

    console.log("add next function ", grid.getSelectedRecords()[0].id);
    this.api.updateData(grid.getSelectedRecords()[0].id, data).subscribe(() => {
      console.log("edit Data api");
    });
    this.ejDialog.hide();
  }
  /////////////delete Row
  delete(): void {
    var grid = (document.getElementsByClassName("e-grid")[0] as any)
      .ej2_instances[0];
    console.log("delete function ", grid.getSelectedRecords()[0].id);
    alert("Your current Move/DelRow(s) shall lead to Orphan row(s)");

    this.api.deleteData(grid.getSelectedRecords()[0].id).subscribe(() => {
      console.log("deleteData api");
    });
    this.ejDialog.hide();
  }

  checkNewEdit!: string;

  btnclick(args: any) {
    this.hideDialog.bind(args);
    this.ejDialog.hide();
    args.disableRow = false;
    this.showEditColumn = false;
    this.stop();
  }
  btnclick3(args: any) {
    this.close = true;
    this.stop();
    this.ejDialog.hide();
    this.hideDialog3.bind(args);
  }

  ////////////row drag and drop
  rowDataBound(args: any): void {
    if (args.getSelectedRecords) {
      args.getSelectedRecords.style.background = "#ff0000";
    }
    let key: string = "id";

    addClass([args.row], "disableRow");

    if (args.data.id == 1) {
      args.row.querySelector("td").innerHTML = " "; //hide the DragIcon(td element)
    }
  }
  ////////////
  public beginEdit(e: any): void {
    let key: string = "id";
    e.cancel = true;
  }

  public removed(e: any) {
    this.treegrid.refresh();
  }
  ////////////////////
  onRowClicked(event: any) {
    console.log("onRowClicked+++++++++++");
    event.row.style.background = "#ff0000";
  }
  rowDragStartHelper(args: any) {
    console.log("rowDragStartHelper-----------------");

    if (args.data[0].id == 1) {
      args.cancel = "true"; //prevent Drag operations by setting args.cancel as true
    }
  }
  rowDrop(args: any) {
    console.log("rowDrop-----------------");

    var treeGridobj = (document.getElementById("TreeGrid") as any)
      .ej2_instances[0];
    var data = treeGridobj.getCurrentViewRecords()[args.dropIndex];
    if (data.hasChildRecords) {
      args.cancel = "true";
      alert("dropping disabled for parent row"); //alert message while dropping on parent row
    }
  }
  rowDragStart(args: any) {
    console.log("rowDragStart-----------------");

    args.rows[0].classList.add("e-dragclonerow"); //customize the dragged row here
  }
  rowDrag(args: any) {
    console.log("rowDrag-----------------");

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
  addChild(args: any) {
    console.log("ADDChild", args);
    this.ejDialog.hide();
    var index = this.treeGridObj["getSelectedRowIndexes"]()[0];

    console.log("treegrid befORE addrecord working", index);

    if (this.childPid) {
      var index = this.treeGridObj["getSelectedRowIndexes"]()[0];
      console.log("Yes trueee");
      let dataC = {
        id: this.data.length + 1,
        name: this.stuCName,
        rollNo: this.stuCRoll,
        class: this.stuCClass,
        currentID: index,
        parentID: this.parentId,
        check: true,
      };
      this.api.addChildData(dataC).subscribe(() => {
        console.log("addChild API working or not check first");
      });
    } else {
      var index = this.treeGridObj["getSelectedRowIndexes"]()[0];

      console.log("yes its Falssse");
      let dataC = {
        id: this.data.length + 1,
        name: this.stuCName,
        rollNo: this.stuCRoll,
        class: this.stuCClass,
        currentID: index,
        check: false,
      };
      this.api.addChildData(dataC).subscribe(() => {
        console.log("addNext API working or not check first");
      });
    }
    this.treegrid.refresh();
    // this.treeGridObj.addRecord(dataC, this.rowIndex, "Child"); //add child row
    this.treeGridObj.endEdit;
    this.ejDialog.hide();
    // args.disableRow = false;
  }
  validation(args: any) {
    this.treegrid.endEdit();
  }

  actioncomplete(args: any) {
    console.log("action complete");
    if (args.requestType == "save") {
      var index = args.index;
      console.log("indexxxx", index);

      this.treegrid.selectRow(index); // select the newly added row to scroll to it
      console.log("action complete!!!", this.treegrid.selectRow(index));
    }
  }

  toolabarclickHandler(args: any) {
    if (args.item.id === "savebutton") {
      this.treegrid.endEdit(); //you can save a record by invoking endEdit
    }
  }

  public gridOptions = {
    rowSelection: "multiple",

    treeData: true,
    getDataPath: (params: any) => {
      return params.group;
    },
  };

  appendElement(html: string): void {
    let span: HTMLElement = document.createElement("span");
    span.innerHTML = html;
    let log: HTMLElement = document.getElementById("EventLog")!;
    log?.insertBefore(span, log.firstChild);
  }

  onClick() {
    $(".EventLog").innerHTML = "";
  }
  actionBegin(args: SaveEventArgs): void {
    // if (args.requestType === "beginEdit" || args.requestType == 'add') {
    //   this.taskData = Object.assign({}, args.rowData)
    //   args.cancel = true;
    // }
  }

  //edit col

  contextMenuOpen(arg: any): void {
    console.log("CMO", arg);

    console.log("contextMenuOpen:", arg);
    this.freezeColId = arg.column.index;
    console.log("freezeColId", this.freezeColId);

    this.rowIndex = arg.rowInfo.rowIndex;
    this.cellIndex = arg.rowInfo.cellIndex;

    this.rowIndex = arg.rowInfo.rowIndex;
    let elem: Element = arg.event.target as Element;

    for (let item of this.column) {
      if (arg.column.field === item.field) {
        this.columnValue = item.id;
        this.columnField = item.field;
        this.ColName =
          item.field.substr(0, 1).toUpperCase() + item.field.substr(1);
        this.ColType = item.type;
        this.ColAlign = item.align;
      } else {
      }
    }
  }

  contextMenuClick(args: any): void {
    console.log("contextMClick", args);

    if (args.item.id === "editCol") {
      this.checkNewEdit = "edit";
      this.showEditColumn = !this.showEditColumn;
      this.getCurrentField();
    }
    if (args.event.target.classList.contains("ejs-checkboxspan")) {
      var checkbox = args.element.querySelector(".ejs-checkbox");
      checkbox.checked = !checkbox.checked;
    }
    if (args.item.id === "multiselectrow") {
      console.log("contexmenu select", args);
      this.showChooseRow = true;
    }

    var data = {
      id: this.data.length + 1,
      name: this.stuName,
      rollNo: this.stuRoll,
      class: this.stuClass,
    };
    var dataC = {
      id: this.data.length + 1,
      name: this.stuCName,
      rollNo: this.stuCRoll,
      class: this.stuCClass,
    };

    var selectedRecord = this.selectedRecord;
    if (args.item.id === "addnextrow") {
      this.showAddNext = true;
      this.highlightNext = true;
      args.cancel = true;
      args.disabled = true;
      this.startTimer();
      console.log("data", data.id);
      this.stuRCId = this.data.length + 1;
      args.cancel = true;
      // args.disableRow = true;      // lock the row none event are performed
      addClass([args.row], "nextRow");
      var a = this.treegrid.getBatchChanges();
    } else if (args.item.id === "addchildrow") {
      console.log("adding child");
      this.highlightChild = true;
      args.cancel = true;

      this.startTimer();
      this.showAddchild = true;
      this.stuCId = this.data.length + 1;
    } else if (
      args.item.id === "deleterow" ||
      args.item.text === "Delete Row"
    ) {
      console.log("delete row");
      this.stuRCId = this.data.length + 1;
      if (this.enabe) {
        console.log("enabEEEE");
        args.cancel = false;
        this.treeGridObj.deleteRecord("id", selectedRecord); // delete the selected row
        this.treeGridObj.endEdit();
      } else {
        args.cancel = true;
        alert("Your current Move/DelRow(s) shall lead to Orphan row(s)");
      }
    } else if (args.item.id === "editrow") {
      console.log("edit row");
      this.showEditRow = true;
      args.cancel = true;
      this.selectedRecord = this.treeGridObj["getSelectedRecords"]()[0];
      this.stuCid = Object.values(this.selectedRecord)[3];
      console.log("edit rowwww", this.selectedRecord);
      this.stuNamen = Object.values(this.selectedRecord)[0];
      this.stuClassn = Object.values(this.selectedRecord)[1];
      this.stuRolln = Object.values(this.selectedRecord)[2];
      this.startTimer();
    } else if (args.item.id === "multiselectrow") {
      console.log("select mult");
      this.showChooseRow = true;
      this.treeGridObj.selectionSettings.type = "Multiple"; //enable multiselection

      this.treeGridObj.refreshColumns();
      this.treeGridObj.endEdit();
    } else if (args.item.id === "customCopy") {
      this.selectedIndex = this.treeGridObj["getSelectedRowIndexes"]()[0]; // select the records on perform Copy action
      this.selectedRecord = this.treeGridObj["getSelectedRecords"]()[0];
    } else if (args.item.id === "pastenextrow") {
      console.log("move as next");
      // args.cancel = true;  //lock the current row
      var index = this.treeGridObj["getSelectedRowIndexes"]()[0]; //delete the copied record
      var record = this.treeGridObj["getSelectedRecords"]()[0];
      this.treeGridObj.deleteRecord("id", this.selectedRecord);
      this.treeGridObj.addRecord(this.selectedRecord, index, "Below"); //Paste as Sibling or another separate row using Below, Above or Top newRowPosition
    } else if (args.item.id === "pastechildrow") {
      this.treeGridObj.deleteRecord("id", this.selectedRecord); //delete the copied record
      var index = this.treeGridObj["getSelectedRowIndexes"]()[0];

      this.treeGridObj.addRecord(this.selectedRecord, index - 1, "Child"); // paste as Child
    }
    this.treegrid.endEdit;
  }
  cancel() {
    console.log("cancel");
    this.ejDialog.close();
    this.student = new Student();
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

  createNewColumn() {
    this.columnCount++;
    // this.treegrid.createElement('e-column','e-column',true)

    return { id: this.columnCount, headerText: "Header" + this.columnCount };
  }

  // Add Remove Rows ----------------------------------------------------------------

  createNewRow() {
    this.rowCount++;

    let newRow: any = {
      text: "Row" + this.rowCount,
      cells: [],
    };
    for (let j = 1; j <= this.column.length; j++) {
      let colId: any = this.column[j - 1].id;

      newRow.cells.push({ cid: colId, text: "Item" + this.rowCount + colId });
    }
    return newRow;
  }

  // Editing ---------------------------------------------------------------------------

  showEditor(cell: any) {
    let self = this;

    let editTimeout = setTimeout(function () {
      self.originalText = cell.text;
      self.isEditActive = true;
      self.editCell = cell;
      self.editorFocused = true;

      clearTimeout(editTimeout);
    }, 150);
  }

  ///////////////row select

  rowSelected(args: any) {
    console.log("rowSelected on active setInterval..........", args);
    console.log("BEFFF ParentID", args.data.parentID);
    if (args.data.parentID !== undefined) {
      this.parentId = parseInt(args.data.parentID);
      console.log("PARENT IDDD", this.parentId);
      this.childPid = true;
    } else {
      this.childPid = false;
    }
    // if (this.treegrid.getSelectedRows().length == 1) {
    //   this.countdownClock(30, false); // here we set the timer
    //   this.alertDialog.show(); // show the dialog
    //   if (!isNullOrUndefined(args.row)) {
    //     args.row.classList.add('bgcolor'); // add the background color of the row
    //   }
    // }
  }

  onColumnClicked(args: any) {
    var grid = (document.getElementsByClassName("e-grid")[0] as any)
      .ej2_instances[0];
    console.log("column clicked", grid);
  }
  dataSource(args: any) {
    this.dataSourceChanged1(args);
    this.treegrid.beforeBatchAdd(this.createNewColumn(), this.treegrid.columns);
  }

  ngAfterViewInit() {
    //createSpinner() method is used to create spinner
    createSpinner({
      target: document.getElementById("loader-container") as HTMLElement,
    });
    // showSpinner() will make the spinner visible
    showSpinner(document.getElementById("loader-container") as HTMLElement);
    hideSpinner(document.getElementById("loader-container") as HTMLElement);
  }

  public enabe: boolean = false;
  checkboxChange(args: any) {
    let count = 0;
    console.log(
      "method called................................................................................",
      count
    );
    // alert("changes fetched");
    this.change = true;
    console.log("changes ", this.change);
    this.timeLeft = 30;
    this.selIndex = this.treeGridObj.getCheckedRowIndexes(); //get the checkedRowIndexes
    // if(args.target.classList === "e-frame e-icons e-check"){
    console.log("e-frame e-icons");
    this.checkB = true;
    var intervalfree = setInterval(() => {
      console.log("checkbox change");

      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.enabe = true;
        const checkedRows = this.treegrid.element.querySelectorAll(".e-check");
        Array.from(checkedRows).map((row) => {
          row?.closest("tr")?.classList.add("bgcolor");
        });
        $(".e-menu-item").css("background-color", "red");
      } else {
        console.log("else Interval");
        clearInterval(intervalfree);
        $("tr").removeClass("bgcolor");
        this.checkB = false;
        alert("Failed to Lock : Row");
      }
    }, 1000);

    this.change = false;
  }

  dataBound(args: DataBoundEventArgs) {
    console.log("dataBound check index");

    this.treeGridObj.selectCheckboxes(this.selIndex); //pass the checkedRowIndex on selectCheckbox method on data reload
  }
  click(args: any) {
    this.checkB = false;
    this.stop();
    $(".bgcolor").css("background-color", "#fafafa");
    this.treegrid.refreshColumns();
    // this.can.cancel = false;
  }

  can: any;
  rowSelectingClick(RowSelectingtArgs: any) {
    console.log("row click before event");
    //   if (!isNullOrUndefined(RowSelectingtArgs.row)) {

    //     RowSelectingtArgs.row.classList.add('bgcolor');

    // }
  }
  // rowDeselecting
  rowDeselecting(args: any) {
    // if (!isNullOrUndefined(args.row.classList.contains('bgcolor'))) {
    //   args.row.classList.remove('bgcolor'); // remove the background color
    // }
  }

  changeHandler(args: any) {
    alert("Change event triggered");
  }

  rowSelecting(args: any) {
    console.log("rowSelecting");
  }

  rowBound(args: any) {
    if (args.row.getSelectedRowIndexes > 1) {
      args.row?.querySelector("tr")?.classList.add("bgcolor");
      args.row?.classList.add("turn");
      $(args).row?.css("background-color", "#b0e98f").css("color", "black");
      args.row?.classList.add("retun");
    }
  }
  rowRefresh() {
    var treeObj = $("#TreeGridContainer").data("ejTreeGrid"),
      selectedItem = treeObj.model.selectedItem;
    //to refresh the selected row
    if (selectedItem && selectedItem.index == 6) {
      var item = selectedItem.item,
        modifiedItem = {
          taskName: "Update Task",
        };
      item = modifiedItem;
      selectedItem.taskName = item.taskName;
      treeObj.refreshRow(selectedItem.index);
    }
  }
  // public saveColumn(args:any) {
  //   console.log('saveColumn:');
  //   if (this.checkNewEdit == 'edit') {
  //     var catched = false;

  //     console.log('edit:');
  //     this.column.forEach((r:any) => {
  //       console.log('R:', r);
  //       if (!catched) {
  //         console.log('catched:}}}}}>>>>>>>>>>>', catched);
  //         catched = true;
  //         // var style = document.createElement('style');
  //         // style.type = 'text/css';
  //         // style.innerHTML = `.e-treegrid .e-headercell.cssClassaa { background-color: ${this.ColBColor};
  //         //   color:${this.ColFColor};
  //         // }`;
  //         // console.log("bg",style);
  //         // document.body.append(style);

  //         // $('.e-treegrid .e-headercell.cssClassaa').css('background-color', $(this.ColBColor));
  //         // $('.e-treegrid .e-headercell.cssClassaa').css('color', $(this.ColFColor));
  //         $('span.e-headertext').css('background-color', $(this.ColBColor));
  //         $('span.e-headertext').css('color', $(this.ColFColor));
  //         // $('.e-headertext').css('background-color', this.ColBColor)
  //       }

  //       if (r.field == this.columnField) {
  //         console.log('r.field:', r.field, 'columnField:', this.columnField);
  //         r.headerText = this.ColName;
  //         r.type = this.ColType;
  //         r.textAlign = this.ColAlign;
  //         r.start = { class: 'cssClassaa' };
  //       }
  //     });

  //     this.treegrid.refreshColumns();
  //     this.textWrap = this.ColChecked;
  //   }

  //   this.showEditColumn = false;
  //   this.treegrid.endEdit();
  //   this.ejDialog.hide();
  //   args.disableRow = false;
  // }
  public saveColumn() {
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
        console.log("BGcolor", this.ColBColor);
        console.log("FontColor", this.ColFColor);
        //get the Grid model.
        localStorage.setItem("treegrid", this.ColBColor);
        // this.value = window.localStorage.getItem(this.ColBColor)!; //"gridGrid" is component name + component id.
        // this.model = JSON.parse(this.value);

        $(".e-treegrid .e-headercell.cssClassaa").css(
          "background-color",
          this.ColBColor
        );
        $(".e-treegrid .e-headercell.cssClassaa").css(
          "background-color",
          this.ColFColor
        );
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
  ////////////////////////////////////////////////////////////////////////////
  complete(args: any) {
    if (args.requestType == "save") {
      //Add the background color

      var selectedRowInfo = this.treegrid.getSelectedRows()[0]; // get the moved record row info

      // selectedRowInfo.classList.add('newclass_add'); // add the background color
      // $('newclass_add').css('background-color', '#85dffa');
      setInterval(() => {
        if (this.timeLeft > 0) {
          console.log(this.timeLeft);
          this.timeLeft--;
          var rowrs = this.treeGridObj.getRowByIndex(this.data.length + 1);
          rowrs?.classList.add("resultRow");
        } else {
          this.flagg = 1;
        }
      });
      if (this.flagg == 1) {
        this.stop();
        // this.treeGridObj.getRowByIndex(this.data.length + 1).remove()
      }

      // Remove the background color

      setTimeout(() => {
        if (
          !isNullOrUndefined(selectedRowInfo?.classList.contains("resultRow"))
        ) {
          console.log("Moved under 10sec complete method");

          // selected_rowInfo.classList.remove('newclass_add'); // remove the background color
          // this.treeGridObj.getRowByIndex(this.data.length + 1).remove()
        }
      }, 10000);
    }
  }
  beforeDataBound(args: any) {}
  stop() {
    console.log("Timer stopped");
    clearInterval(this.timeLeft);
    clearInterval(this.interval);
  }

  //here enable and disable the timer
  // countdownClock(time:any, flag:any) {
  //   var new_tiem = time;
  //   if (new_tiem > 0) {
  //     // enable the timer using setInterval method
  //     this.intervalID = setInterval( () => {
  //       //calculate minutes and seconds
  //       let minutes: any = Math.floor(new_tiem / 60);
  //       let seconds: any = new_tiem % 60;

  //       minutes = minutes < 10 ? '0' + minutes : minutes;
  //       seconds = seconds < 10 ? '0' + seconds : seconds;

  //       // insert the minutes and seconds into the dialog content
  //       $(document).getElementById('dialogcontent').innerHTML = `${minutes}:${seconds}`;

  //       //disable the timer while timer has 0 value
  //       if (new_tiem == 0 || new_tiem < 0) {
  //         clearInterval(this.intervalID);

  //         var treegrid:any = (document.getElementsByClassName('e-treegrid')[0] as any).ej2_instances[0];
  //         treegrid.clearSelection();
  //         var dialog:any = (document.getElementsByClassName('e-dialog')[0] as any).ej2_instances[0];
  //         dialog.hide();
  //       }
  //       new_tiem--;
  //     }, 1000);
  //   }

  //   // disable the timer while force stop of dialog
  //   if (flag == true) {
  //     var treegrid = (document.getElementsByClassName('e-treegrid')[0] as any).ej2_instances[0];
  //     treegrid.clearSelection();
  //     setTimeout(() => {
  //       // reset the dialog content
  //       $(document).getElementById('dialogcontent').innerHTML = '00:00';
  //       // clear the timer
  //       clearInterval(this.intervalID);
  //     }, 100);
  //   }
  // }
}

// export interface ItaskModel{
//   id?: Number;
//   name?: String;
//   rollNo?: Number;
//   class?: Number;
//   fontcolor?: String;
//   bgcolor?: String;
//   type?: String;
// }
// let row: Element = elem.closest(".e-row")!;
// let uid: string = row && row.getAttribute("data-uid")!;
